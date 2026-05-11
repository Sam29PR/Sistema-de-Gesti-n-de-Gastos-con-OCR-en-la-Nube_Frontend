import { Component, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Factura } from '../../models/factura.model';
import { FacturaService } from '../../core/services/factura.service';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.css']
})
export class StatCardComponent implements OnInit {

  facturas: Factura[] = [];

  totalGastado = 0;
  totalIVA = 0;
  cantidadFacturas = 0;
  ultimaCompra = '';
  cargando = false;

  categoriaTop = 'sin datos';
  categoriaCantidad = 0;

  constructor(private facturaService: FacturaService) {}

  ngOnInit(): void {

    this.cargarFacturas();

    // =========================
    // ESCUCHAR REFRESH GLOBAL
    // =========================

    this.facturaService
      .getRefreshListener()
      .subscribe(() => {

        this.cargarFacturas();

      });
  }

  cargarFacturas() {

    this.facturaService.getFacturas().subscribe(data => {

      this.facturas = data;

      this.totalGastado = data.reduce((sum, f) => sum + f.total, 0);

      this.totalIVA = data.reduce((sum, f) => sum + f.iva, 0);

      this.cantidadFacturas = data.length;

      if (data.length > 0) {

        this.ultimaCompra = data[0].tienda;
      }

      const categorias: { [key: string]: number } = {};

      data.forEach(factura => {

        const categoria = factura.categoria || 'Otros';

        categorias[categoria] = (categorias[categoria] || 0) + 1;
      });

      let topCategoria = '';
      let topCantidad = 0;

      Object.entries(categorias).forEach(([categoria, cantidad]) => {

        if (cantidad > topCantidad) {

          topCategoria = categoria;

          topCantidad = cantidad;
        }
      });

      this.categoriaTop = topCategoria;

      this.categoriaCantidad = topCantidad;
    });
  }
}