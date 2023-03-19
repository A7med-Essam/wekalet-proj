import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DashboardService } from 'src/app/shared/services/dashboard.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  PaginationInfo: any;
  categories: any[] = [];

  constructor(
    private _DashboardService:DashboardService
  ) { }

  ngOnInit(): void {
    this.setInsertForm();
    this.getCateogries();
  }

  getCateogries(page: number = 1, paginate?: any) {
      this.currentPage > 1 ? (page = this.currentPage) : (page = 1);
      this._DashboardService.getCateogries(page, paginate).subscribe((res) => {
        this.PaginationInfo = res.data;
        this.categories = res.data.data;
      });
  }

  currentPage: number = 1;
  paginate(e: any) {
    this.currentPage = e.first / e.rows + 1;
    this.getCateogries(e.first / e.rows + 1, e.rows);
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
      .insertCateogries(insertForm.value)
      .subscribe((res: any) => {
        if (res.status == 1) {
          this.insertModal = false;
          this.getCateogries();
        }
      });
  }
}
