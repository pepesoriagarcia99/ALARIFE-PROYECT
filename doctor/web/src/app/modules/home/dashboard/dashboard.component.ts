import { Component, OnInit, ViewChild } from '@angular/core';
import { SocketService } from '../../../core/services/socket.service';
import { EventType, MonitorEvent } from '../../../core/model/Event';
import { EventService } from '../../../core/services/event.service';
import { CpuChartComponent } from '../components/cpu-chart/cpu-chart.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  @ViewChild('cpuChart') cpuChart!: CpuChartComponent;

  constructor(private _socketService: SocketService, private _eventService: EventService) { }

  ngOnInit(): void {
    this._eventService.getEvents()
      .subscribe((events: MonitorEvent[]) => {
        events.forEach((event) => {
          // console.log("🚀 ~ DashboardComponent ~ events.forEach ~ event:", event)
          this.#newEvent(event);
        });

        this._socketService
          .onEvent('eventMessage')
          .subscribe((event: any) => {
            this.#newEvent(event as MonitorEvent);
          });
      });
  }

  #newEvent(event: MonitorEvent) {

    event.items.forEach((item) => {
      if(item.type === EventType.cpu) {
        this.cpuChart.update(event.snapshot, item);
      }
    });

    // const viewChartData = this.chartsData.find((c) => c.type === event.type);

    // if (viewChartData) {
    //   if (!viewChartData.chartComponent) {
    //     viewChartData.chartComponent = this.charts.find((c) => c.type === event.type);
    //   }

    //   viewChartData.chartComponent?.newEvent(event.snapshot, event.value);
    // } else {
    //   const chartConfiguration = configurationData.find((config) => config.type === event.type);

    //   if (chartConfiguration) {
    //     this.chartsData.push(chartConfiguration);
    //   }
    // }
  }

}
