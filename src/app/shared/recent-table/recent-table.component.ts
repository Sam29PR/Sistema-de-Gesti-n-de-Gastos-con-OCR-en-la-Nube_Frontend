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

  // =========================
  // ESTADO DINÁMICO
  // =========================

  obtenerEstado(factura: Factura): string {

    if (factura.categoria) {

      return 'PROCESADO';
    }

    return 'REVISIÓN';
  }

  // =========================
  // CLASES ESTADO
  // =========================

  obtenerClaseEstado(factura: Factura): string {

    if (factura.categoria) {

      return 'estado-procesado';
    }

    return 'estado-revision';
  }

  // =========================
  // CLASES CATEGORÍA
  // =========================

  obtenerClaseCategoria(categoria: string): string {

  const clases: any = {

    'Tecnología': 'categoria-tech',

    'Hogar': 'categoria-hogar',

    'Restaurantes': 'categoria-food',

    'Supermercado': 'categoria-market',

    'Transporte': 'categoria-transporte',

    'Salud': 'categoria-salud',

    'Educación': 'categoria-education',

    'Entretenimiento': 'categoria-entertainment',

    'Ropa y Moda': 'categoria-fashion',

    'Finanzas': 'categoria-finance',

    'Servicios': 'categoria-services',

    'Viajes': 'categoria-travel',

    'Mascotas': 'categoria-pets',

    'Deportes': 'categoria-sports',

    'Belleza': 'categoria-beauty',

    'Construcción': 'categoria-construction',

    'Impuestos': 'categoria-tax',

    'Otros': 'categoria-default'
  };

  return clases[categoria] || 'categoria-default';
}
}