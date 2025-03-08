import { Component, OnInit } from '@angular/core';

var trace1 = {
  x: [1, 2, 3, 4, 5],
  y: [1, 3, 2, 3, 1],
  mode: 'lines',
  name: 'Solid',
  line: {
    dash: 'solid',
    width: 4
  }
};

var trace2 = {
  x: [1, 2, 3, 4, 5],
  y: [6, 8, 7, 8, 6],
  mode: 'lines',
  name: 'dashdot',
  line: {
    dash: 'dashdot',
    width: 4
  }
};

var trace4 = {
  x: [1, 2, 3, 4, 5],
  y: [16, 18, 17, 18, 16],
  mode: 'lines',
  name: 'dot',
  line: {
    dash: 'dot',
    width: 4
  }
};

@Component({
  selector: 'app-memory-chart',
  templateUrl: './memory-chart.component.html',
  styleUrl: './memory-chart.component.scss'
})
export class MemoryChartComponent {

  title = 'Gráfico con Plotly';

  // Datos del gráfico
  graph = {
    data: [trace1, trace2, trace4],
    layout: {
      title: {
        text: 'Line Dash'
      },
      xaxis: {
        range: [0.75, 5.25],
        autorange: false
      },
      yaxis: {
        range: [0, 18.5],
        autorange: false
      },
      legend: {
        y: 0.5,
        traceorder: 'reversed',
        font: {
          size: 16
        }
      }
    }
  };

  updateGraph() {
    // const newX = this.time++;
    // const newY = Math.random() * 10; // Generar valores aleatorios

    // // Agregar nuevos datos
    // (this.graph.data[0].x as number[]).push(newX);
    // (this.graph.data[0].y as number[]).push(newY);

    // // Limitar a los últimos 20 puntos para que no crezca indefinidamente
    // if (this.graph.data[0].x.length > 20) {
    //   (this.graph.data[0].x as number[]).shift();
    //   (this.graph.data[0].y as number[]).shift();
    // }

    // // Forzar actualización
    // this.graph = { ...this.graph };
  }

}
