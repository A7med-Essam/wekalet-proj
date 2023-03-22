import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/shared/services/dashboard.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
})
export class ShowComponent implements OnInit {
  constructor(
    private _DashboardService: DashboardService,
    private _Router: Router
  ) {}

  ngOnInit(): void {
    this._DashboardService.OrderId.value == 0
      ? this._Router.navigate(['steet-dashboard/orders'])
      : this.getDetails();
  }

  details: any;

  getDetails() {
    this._DashboardService
      .getOrderById(this._DashboardService.OrderId.value)
      .subscribe({
        next: (res) => {
          this.details = res.data;
        },
      });
  }
}
