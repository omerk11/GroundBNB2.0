import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { ReservationsPerDay } from 'src/app/reservations/reservation.model';
import { ReservationsService } from 'src/app/reservations/reservations.service';

@Component({
  selector: 'app-users-statistics',
  templateUrl: './users-statistics.component.html',
  styleUrls: ['./users-statistics.component.scss']
})
export class UsersStatisticsComponent implements OnInit {

  constructor(public reservationsService: ReservationsService ) {}
  private data:ReservationsPerDay[]=[];
  private svg:any;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  ngOnInit(): void {
    this.reservationsService.getreservationsperday().subscribe((data)=>{
      this.data=data;
      // console.log(data);
      this.createSvg();
      this.drawBars(this.data);
    });
  }
  private createSvg(): void {
    this.svg = d3.select("figure#bar")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
}

private drawBars(data: any[]): void {
  // Create the X-axis band scale
  const x = d3.scaleBand()
  .range([0, this.width])
  .domain(data.map( d => d.date))
  .padding(0.2);

  // Draw the X-axis on the DOM
  this.svg.append("g")
  .attr("transform", "translate(0," + this.height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
  .attr("transform", "translate(-10,0)rotate(-45)")
  .style("text-anchor", "end");

  // Create the Y-axis band scale
  const y = d3.scaleLinear()
  .domain([0, 20])
  .range([this.height, 0]);

  // Draw the Y-axis on the DOM
  this.svg.append("g")
  .call(d3.axisLeft(y));

  // Create and fill the bars
  this.svg.selectAll("bars")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", (d:any) => x(d.date))
  .attr("y", (d:any) => y(d.reservationsCount))
  .attr("width", x.bandwidth())
  .attr("height", (d:any) => this.height - y(d.reservationsCount))
  .attr("fill", "#d04a35");
}
}
