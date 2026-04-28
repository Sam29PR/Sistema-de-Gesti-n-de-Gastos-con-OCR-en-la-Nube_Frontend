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

  constructor(private facturaService: FacturaService) {}

  ngOnInit(): void {
    this.facturaService.getFacturas().subscribe(data => {
      this.facturas = data;
    });
  }
}