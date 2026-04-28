import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturaService } from '../../core/services/factura.service';
import { Factura } from '../../models/factura.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

facturas: Factura[] = [];

  totalGastado = 0;
  totalIVA = 0;
  cantidadFacturas = 0;
  ultimaCompra = '';
  cargando = false;

  constructor(private facturaService: FacturaService) {}

  ngOnInit(): void {
    this.cargarFacturas();
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
    });
  }



  seleccionarArchivo(event: any) {
    const file = event.target.files[0];

    if (!file) return;

    this.cargando = true;

    this.facturaService.subirFactura(file).subscribe({
      next: () => {
        this.cargando = false;
        this.cargarFacturas();
      },
      error: () => {
        this.cargando = false;
        alert("Error al subir factura");
      }
    });
  }



}