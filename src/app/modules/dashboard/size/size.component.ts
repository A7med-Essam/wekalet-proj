import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/shared/services/dashboard.service';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss'],
})
export class SizeComponent implements OnInit {
  PaginationInfo: any;
  sizes: any[] = [];

  constructor(private _DashboardService: DashboardService) {}

  ngOnInit(): void {
    this.getSizes();
    this.setInsertForm();
  }

  getSizes(page: number = 1, paginate?: any) {
    this.currentPage > 1 ? (page = this.currentPage) : (page = 1);
    this._DashboardService.getSizes(page, paginate).subscribe((res) => {
      this.PaginationInfo = res.data;
      this.sizes = res.data.data;
    });
  }

  currentPage: number = 1;
  paginate(e: any) {
    this.currentPage = e.first / e.rows + 1;
    this.getSizes(e.first / e.rows + 1, e.rows);
  }

  insertModal: boolean = false;
  insertForm!: FormGroup;
  setInsertForm() {
    this.insertForm = new FormGroup({
      name: new FormControl(null),
      name_ar: new FormControl(null),
    });
  }

  insertRow(insertForm: FormGroup) {
    this._DashboardService
      .insertSizes(insertForm.value)
      .subscribe((res: any) => {
        if (res.status == 1) {
          this.insertModal = false;
          this.getSizes();
        }
      });
  }
}
