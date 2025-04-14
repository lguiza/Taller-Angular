import { Component, OnInit } from '@angular/core';
import { Serie } from '../serie';
import { SeriesService } from '../series.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-series-list',
  standalone: true,
  imports: [CommonModule],
  providers: [SeriesService],
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.css']
})
export class SeriesListComponent implements OnInit {
  series: Serie[] = [];
  promedioTemporadas: number = 0;

  constructor(private seriesService: SeriesService) { }

  ngOnInit(): void {
    this.seriesService.getSeries().subscribe(data => {
      this.series = data;
      this.calcularPromedioTemporadas();
    });
  }

  calcularPromedioTemporadas(): void {
    const total = this.series.reduce((acc, serie) => acc + serie.seasons, 0);
    this.promedioTemporadas = this.series.length > 0 ? total / this.series.length : 0;
  }
}