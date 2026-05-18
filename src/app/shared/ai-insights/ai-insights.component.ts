import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AiInsightsService } from '../../core/services/ai-insights.service';

@Component({
  selector: 'app-ai-insights',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ai-insights.component.html',
  styleUrl: './ai-insights.component.css'
})
export class AiInsightsComponent implements OnChanges {

  @Input() data: any; // 👈 lo que venga (factura o dashboard)
  @Input() mode: 'invoice' | 'dashboard' = 'invoice';

  result: any = null;
  loading = false;

  constructor(private aiService: AiInsightsService) {}

  ngOnChanges() {
    if (this.data) {
      this.runAI();
    }
  }

  runAI() {
    this.loading = true;

    let request$;

    if (this.mode === 'invoice') {

      const payload = {
        tienda: this.data.tienda || 'Desconocida',
        total: this.data.total || 0,
        categories: this.data.categories|| [],
      };

      request$ = this.aiService.analizarFactura(payload);
    } else {
      request$ = this.aiService.getDashboardInsights();
    }

    request$.subscribe({
      next: (res) => {
        console.log('RESPESUTA AI:', res);
        this.result = res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }
}