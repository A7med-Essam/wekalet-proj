import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/shared/services/dashboard.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.scss'],
})
export class InsertComponent implements OnInit {
  constructor(
    private _DashboardService: DashboardService,
    private _ProductService: ProductService,
    private _Router: Router
  ) {}
  insertForm!: FormGroup;
  productOptions: any;

  ngOnInit(): void {
    this.setInsertForm();
    this.getProductOptions();
  }

  insertRow(insertForm: FormGroup) {
    this._DashboardService
      .insertProduct(insertForm.value)
      .subscribe((res: any) => {
        if (res.status == 1) {
          this._Router.navigate(['dashboard/products']);
        }
      });
  }

  setInsertForm() {
    this.insertForm = new FormGroup({
      name: new FormControl(null),
      name_ar: new FormControl(null),
      price: new FormControl(null),
      category_id: new FormControl(null),
      gender_id: new FormControl(null),
      images: new FormControl(null),
      title: new FormControl(null),
      title_ar: new FormControl(null),
      description: new FormControl(null),
      description_ar: new FormControl(null),
      color_ids: new FormControl(null),
      size_ids: new FormControl(null),
    });
  }

  getProductOptions() {
    this._ProductService.getFilterOptions().subscribe({
      next: (res) => {
        this.productOptions = res.data;
      },
    });
  }

  toBase64 = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  async getImages(input: HTMLInputElement) {
    let base64: any[] = [];
    if (input.files != null) {
      for (let i = 0; i < input.files.length; i++) {
        base64.push(await this.toBase64(input.files[i]))
      }
      this.insertForm.controls['images'].setValue(base64);
    }
  }

  importImage() {
    let input: HTMLInputElement = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    input.click();
    input.onchange = () => {
      if (input.files && input.files[0]) {
        this.getImages(input);
      }
    };
  }
}