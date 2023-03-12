import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  categoryFilterBtn: boolean = false;
  genderFilterBtn: boolean = false;
  colorsFilterBtn: boolean = false;
  sizeFilterBtn: boolean = false;
  priceFilterBtn: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  toggleFilterBtn(type: string, e: any) {
    e.target.parentElement.classList.toggle("active")
    switch (type.toLowerCase()) {
      case 'categories':
        this.categoryFilterBtn = !this.categoryFilterBtn;
        break;
      case 'gender':
        this.genderFilterBtn = !this.genderFilterBtn;
        break;
      case 'colors':
        this.colorsFilterBtn = !this.colorsFilterBtn;
        break;
      case 'size':
        this.sizeFilterBtn = !this.sizeFilterBtn;
        break;
      default:
        this.priceFilterBtn = !this.priceFilterBtn;
        break;
    }
  }

  toggleClass(event: any, className: string) {
    const hasClass = event.currentTarget.classList.contains(className);
    if (hasClass) {
      event.currentTarget.classList.remove(className);
    } else {
      event.currentTarget.classList.add(className);
    }
  }
}
