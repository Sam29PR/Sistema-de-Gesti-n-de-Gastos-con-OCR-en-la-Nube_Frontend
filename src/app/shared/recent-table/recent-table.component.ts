import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturaService } from '../../core/services/factura.service';
import { Factura } from '../../models/factura.model';


@Component({
  selector: 'app-recent-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recent-table.component.html',
  styleUrl: './recent-table.component.css'
})
export class RecentTableComponent implements OnInit {

  facturas: Factura[] = [];

  cargando = false;

  constructor(
    private facturaService: FacturaService
  ) {}

  ngOnInit(): void {

    // =========================
    // CARGA INICIAL
    // =========================

    this.cargarFacturas();

    // =========================
    // REFRESH GLOBAL
    // =========================

    this.facturaService
      .getRefreshListener()
      .subscribe(() => {

        this.cargarFacturas();
      });
  }

  cargarFacturas() {

    this.cargando = true;

    this.facturaService
      .getFacturas()
      .subscribe({

        next: (data) => {

          // =========================
          // ULTIMAS 5 FACTURAS
          // =========================

          this.facturas = data.slice(0, 5);

          this.cargando = false;
        },

        error: () => {

          this.cargando = false;

          console.error('Error cargando facturas');
        }
      });
  }


  obtenerEstado(factura: any): string {
    return factura?.estado || 'Pendiente';
}

  obtenerClaseEstado(factura: any): string {

    switch (factura?.estado) {

      case 'Procesado':
        return 'estado-procesado';

      case 'Revisión':
        return 'estado-revision';

      case 'Pendiente':
        return 'estado-pendiente';

      case 'Error':
        return 'estado-error';

      case 'Duplicado':
        return 'estado-duplicado';

      case 'Rechazado':
        return 'estado-rechazado';

      default:
        return 'estado-pendiente';
    }
  }


}