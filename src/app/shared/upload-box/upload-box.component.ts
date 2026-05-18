import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturaService } from '../../core/services/factura.service';
import { Factura } from '../../models/factura.model';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-upload-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-box.component.html',
  styleUrl: './upload-box.component.css'
})
export class UploadBoxComponent implements OnInit {

  facturas: Factura[] = [];

  totalGastado = 0;
  totalIVA = 0;
  cantidadFacturas = 0;
  ultimaCompra = '';

  cargando = false;

  progreso = 0;

  ultimosArchivos: Factura[] = [];

  subiendo = false;

  constructor(private facturaService: FacturaService) {}

  ngOnInit(): void {

    this.cargarFacturas();
  }

  cargarFacturas() {

    this.facturaService.getFacturas().subscribe(data => {

      this.facturas = data;

      this.ultimosArchivos = data.slice(0, 3);

      this.totalGastado = data.reduce((sum, f) => sum + f.total, 0);

      this.totalIVA = data.reduce((sum, f) => sum + f.iva, 0);

      this.cantidadFacturas = data.length;

      if (data.length > 0) {

        this.ultimaCompra = data[0].tienda;
      }
    });
  }

  seleccionarArchivo(event: any) {

  const file = event.target.files[0];

  if (!file) return;

  // =========================
  // ESTADO INICIAL
  // =========================

  this.subiendo = true;

  this.cargando = true;

  this.progreso = 0;

  this.facturaService.subirFactura(file).subscribe({

    next: (event: any) => {

      // =========================
      // PROGRESO REAL
      // =========================

      if (
        event.type === HttpEventType.UploadProgress &&
        event.total
      ) {

        this.progreso = Math.round(
          (event.loaded / event.total) * 100
        );
      }

      // =========================
      // RESPUESTA FINAL
      // =========================

      if (event.type === HttpEventType.Response) {

        this.cargando = false;

        this.subiendo = false;

        this.progreso = 100;

      
        
        // =========================
        // REFRESH GLOBAL
        // =========================

        this.facturaService.refreshFacturas();

        this.cargarFacturas();

        // RESET VISUAL
        setTimeout(() => {

          this.progreso = 0;

        }, 1500);
      }
    },

    error: () => {

      this.cargando = false;

      this.subiendo = false;

      this.progreso = 0;

      alert("Error al subir factura");
    }
  });
}
}