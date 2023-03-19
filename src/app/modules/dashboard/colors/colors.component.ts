import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DashboardService } from 'src/app/shared/services/dashboard.service';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.scss']
})
export class ColorsComponent implements OnInit {

  PaginationInfo: any;
  colors: any[] = [];

  constructor(
    private _DashboardService:DashboardService
  ) { }

  ngOnInit(): void {
    this.getColors();
    this.setInsertForm();
  }

  getColors(page: number = 1, paginate?: any) {
      this.currentPage > 1 ? (page = this.currentPage) : (page = 1);
      this._DashboardService.getColors(page, paginate).subscribe((res) => {
        this.PaginationInfo = res.data;
        this.colors = res.data.data;
      });
  }

  currentPage: number = 1;
  paginate(e: any) {
    this.currentPage = e.first / e.rows + 1;
    this.getColors(e.first / e.rows + 1, e.rows);
  }

  insertModal: boolean = false;
  insertForm!: FormGroup;
  setInsertForm() {
    this.insertForm = new FormGroup({
      name: new FormControl(null),
      name_ar: new FormControl(null),
      hexa: new FormControl(null),
    });
  }

  insertRow(insertForm: FormGroup) {
    this._DashboardService
      .insertColors(insertForm.value)
      .subscribe((res: any) => {
        if (res.status == 1) {
          this.insertModal = false;
          this.getColors();
        }
      });
  }

}
