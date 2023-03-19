import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DashboardService } from 'src/app/shared/services/dashboard.service';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.scss']
})
export class GenderComponent implements OnInit {

  PaginationInfo: any;
  genders: any[] = [];

  constructor(
    private _DashboardService:DashboardService
  ) { }

  ngOnInit(): void {
    this.setInsertForm();
    this.getGenders();
  }

  getGenders(page: number = 1, paginate?: any) {
      this.currentPage > 1 ? (page = this.currentPage) : (page = 1);
      this._DashboardService.getGenders(page, paginate).subscribe((res) => {
        this.PaginationInfo = res.data;
        this.genders = res.data.data;
      });
  }

  currentPage: number = 1;
  paginate(e: any) {
    this.currentPage = e.first / e.rows + 1;
    this.getGenders(e.first / e.rows + 1, e.rows);
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
      .insertGenders(insertForm.value)
      .subscribe((res: any) => {
        if (res.status == 1) {
          this.insertModal = false;
          this.getGenders();
        }
      });
  }
}
