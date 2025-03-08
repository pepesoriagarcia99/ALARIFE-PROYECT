import { Component } from '@angular/core';
import { MonitorEventItem } from '../../../../core/model/Event';

@Component({
  selector: 'app-cpu-chart',
  templateUrl: './cpu-chart.component.html',
  styleUrl: './cpu-chart.component.scss'
})
export class CpuChartComponent {

  title = 'Gráfico con Plotly';

  graph = {
    data: [{
      x: [] as string[],
      y: [] as number[],
      mode: 'lines',
      name: 'Solid',
      line: {
        dash: 'solid',
        width: 4
      }
    }],
    layout: { title: 'Ejemplo de Gráfico' }
  };

  update(snapshot: string, event: MonitorEventItem) {
    this.graph.data[0].x.push(snapshot);
    this.graph.data[0].y.push(event.value as number);

    this.graph = { ...this.graph };
  }
}
