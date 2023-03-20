import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    this.insertForm.controls.quantity.setValue(this.insertForm.value.min_quantity)
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
      name: new FormControl(null, [Validators.required]),
      name_ar: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      category_id: new FormControl(null, [Validators.required]),
      gender_id: new FormControl(null, [Validators.required]),
      images: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [Validators.required]),
      title_ar: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      description_ar: new FormControl(null, [Validators.required]),
      color_ids: new FormControl(null, [Validators.required]),
      size_ids: new FormControl(null, [Validators.required]),
      min_quantity: new FormControl(null, [Validators.required]),
      quantity: new FormControl(null),
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

  uploadedImages: string[] = [];
  async getImages(input: HTMLInputElement) {
    let base64: any[] = [];
    if (input.files != null) {
      for (let i = 0; i < input.files.length; i++) {
        base64.push(await this.toBase64(input.files[i]));
      }
      this.insertForm.controls['images'].setValue(base64);
      this.insertForm.controls['images'].setErrors(null);
      this.uploadedImages = base64;
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
