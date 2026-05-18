import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { AiInsightsComponent } from '../../shared/ai-insights/ai-insights.component';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule,AiInsightsComponent],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {

  selectedFile: File | null = null;

  cargando = false;

  progreso = 0;

  estado = '';

  dragActive = false;

  uploadResponse: any = null;

  constructor(
    private http: HttpClient,
  ) {}

  // =========================
  // SELECCIONAR ARCHIVO
  // =========================

  onFileSelected(event: any) {

    const file = event.target.files[0];

    if (file) {

      this.selectedFile = file;

      this.estado = 'Archivo listo para subir';
    }
  }

  // =========================
  // DRAG OVER
  // =========================

  onDragOver(event: DragEvent) {

    event.preventDefault();

    this.dragActive = true;
  }

  // =========================
  // DRAG LEAVE
  // =========================

  onDragLeave(event: DragEvent) {

    event.preventDefault();

    this.dragActive = false;
  }

  // =========================
  // DROP
  // =========================

  onDrop(event: DragEvent) {

    event.preventDefault();

    this.dragActive = false;

    if (event.dataTransfer?.files.length) {

      this.selectedFile = event.dataTransfer.files[0];

      this.estado = 'Archivo listo para subir';
    }
  }

  // =========================
  // SUBIR ARCHIVO
  // =========================

  uploadFile() {

    if (!this.selectedFile) {

      this.estado = 'Selecciona un archivo';

      return;
    }

    const formData = new FormData();

    formData.append('file', this.selectedFile);

    this.cargando = true;

    this.estado = 'Procesando factura...';

    this.http.post(
      'http://localhost:8000/api/facturas/upload',
      formData,
      {
        reportProgress: true,
        observe: 'events'
      }
    ).subscribe({

      next: (event: any) => {

        // progreso subida
        if (event.type === HttpEventType.UploadProgress) {

          this.progreso = Math.round(
            100 * event.loaded / (event.total || 1)
          );
        }

        // respuesta final
        if (event.type === HttpEventType.Response) {

          
          this.cargando = false;
          
          this.estado = 'Factura procesada correctamente';
          
          console.log(event.body);
          this.uploadResponse = event.body;

        

        }
      },

      error: (error) => {

        console.error(error);

        this.cargando = false;

        this.estado = 'Error al procesar factura';
      }
    });
  }

}