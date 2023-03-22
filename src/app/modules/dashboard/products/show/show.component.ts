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
    this._DashboardService.ProductId.value == 0
      ? this._Router.navigate(['steet-dashboard/products'])
      : this.getDetails();
  }

  details: any;

  getDetails() {
    this._DashboardService
      .getProductById(this._DashboardService.ProductId.value)
      .subscribe({
        next: (res) => {
          this.details = res.data;
        },
      });
  }

  imgActionsModal: boolean = false;

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
      base64.push(await this.toBase64(input.files[i]));
    }
    this.updateIamge(base64[0])
  }
}

importImage() {
  let input: HTMLInputElement = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.click();
  input.onchange = () => {
    if (input.files && input.files[0]) {
      this.getImages(input);
    }
  };
  }

  updateIamge(uploadedImages:string){
    this._DashboardService.updateImage(this.currentImg.id,uploadedImages).subscribe({
      next:res=>{
        this.getDetails()
      }
    })
  }

  currentImg:any;
  getCurrentImg(img:any){
    this.currentImg = img;
  }

  deleteImage(){
    this._DashboardService.deleteImage(this.currentImg.id).subscribe({
      next:res=>{
        this.getDetails()
      }
    })
  }
}
