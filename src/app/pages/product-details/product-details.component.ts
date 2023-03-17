import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IProduct } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  display: boolean = false;

  constructor(
    private _SharedService: SharedService,
    private _CartService: CartService,
    private _MessageService: MessageService
  ) {}
  @Input() product!: IProduct;

  ngOnInit(): void {
    this.product ? (this.display = true) : (this.display = false);
  }

  @Output() modalStatus = new EventEmitter<boolean>();

  setModalStatus(value: boolean) {
    this.modalStatus.emit(value);
  }

  toggleImages(
    imgUrl: string,
    selectedImg: HTMLElement,
    mainImage: HTMLImageElement,
    imgParent: HTMLElement
  ) {
    mainImage.src = imgUrl;
    this._SharedService.getAllSiblings(selectedImg, imgParent).forEach((e) => {
      e.classList.contains('slick-current') &&
        e.classList.remove('slick-current');
    });
    selectedImg.classList.contains('slick-current') ||
      selectedImg.classList.add('slick-current');
  }

  toggleColors(
    hexa: string,
    selectedColor: HTMLElement,
    colorContainer: HTMLElement,
    colorParent: HTMLElement
  ) {
    this._SharedService
      .getAllSiblings(colorContainer, colorParent)
      .forEach((e) => {
        e.children[0].classList.contains('active') &&
          e.children[0].classList.remove('active');
        e.children[0].style.borderColor = 'transparent';
      });
    selectedColor.style.borderColor = hexa;
    selectedColor.classList.contains('active') ||
      selectedColor.classList.add('active');
  }

  toggleSize(selectedSize: HTMLElement, sizeParent: HTMLElement) {
    this._SharedService
      .getAllSiblings(selectedSize, sizeParent)
      .forEach((e) => {
        e.classList.contains('active') && e.classList.remove('active');
      });
    selectedSize.classList.contains('active') ||
      selectedSize.classList.add('active');
  }

  // cart methods
  addToCart(product: IProduct) {
    if (this._CartService.addToCart(product)) {
      this._MessageService.add(this._CartService.addMessageService(product));
      this.display = false;
    } else {
      this._MessageService.add(this._CartService.warningMessageService());
    }
  }

  increaseItem(item: IProduct, count: number) {
    this._CartService.increaseItem(item, count);
  }
  
  decreaseItem(item: IProduct, count: number) {
    this._CartService.decreaseItem(item,count)
  }
}
