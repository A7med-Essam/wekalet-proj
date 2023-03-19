import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from 'src/app/shared/services/dashboard.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  // uploadModal: boolean = false;
  // filterModal: boolean = false;
  // filterColumns: boolean = false;
  // selectedColumns: any[] = [];
  orders: any[] = [];
  // deleteConfirm: boolean = false;
  PaginationInfo: any;

  constructor(
    private _DashboardService:DashboardService,
    // private _EmiratesService: EmiratesService,
    private _Router: Router,
    // private _GuardService: GuardService,
    private _ActivatedRoute: ActivatedRoute,
    // private confirmationService: ConfirmationService
  ) {}


  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(page: number = 1, paginate?: any) {
    // if (this.filter_1 || this.filter_2 || this.filter_3) {
    //   this.filter(this.filter_1, this.filter_2, this.filter_3);
    // } else {
      this.currentPage > 1 ? (page = this.currentPage) : (page = 1);
      this._DashboardService.getOrders(page, paginate).subscribe((res) => {
        this.PaginationInfo = res.data;
        this.orders = res.data.data;
      });
    // }
  }

  loadPatientListing(e: any) {  }

  // onFileSelected(event: any) {
  //   const file: File = event.target.files[0];
  //   if (file) {
  //     let f: File = this._AppService.getFormData({ file: file }) as any;
  //     this._AreaService.uploadFile(f).subscribe({
  //       next:res=>{
  //         this.uploadModal = false;
  //   this.getAreas();
  // }
  //     });
  //     this.uploadModal = false;
  //   }
  // }

  // specificRows: number[] = [];
  // getSpecificRows(input: HTMLInputElement) {
  //   if (input.checked) {
  //     this.specificRows.push(Number(input.value));
  //   } else {
  //     const index = this.specificRows.indexOf(Number(input.value));
  //     if (index > -1) {
  //       this.specificRows.splice(index, 1);
  //     }
  //   }
  // }

  // deleteSpecificRows() {
  //   if (this.specificRows.length > 0) {
  //     this._AreaService
  //       .deleteSpecificRows({ ids: this.specificRows })
  //       .subscribe((res) => {
  //         this.getAreas();
  //       });
  //   }
  // }

  // updateRow(areaId: number) {
  //   this._AreaService.AreaId.next(areaId);
  //   this._Router.navigate(['update'], { relativeTo: this._ActivatedRoute });
  // }

  // deleteRow(areaId: number) {
  //   this._AreaService.deleteRow(areaId).subscribe((res) => {
  //     this.getAreas();
  //   });
  // }

  showRow(e: number) {
    this._DashboardService.OrderId.next(e);
    this._Router.navigate(['details'], { relativeTo: this._ActivatedRoute });
  }

  // confirm(AreaId: any) {
  //   this.confirmationService.confirm({
  //     message: 'Are you sure that you want to perform this action?',
  //     accept: () => {
  //       this.deleteRow(AreaId);
  //     },
  //   });
  // }

  // confirm2() {
  //   this.confirmationService.confirm({
  //     message: 'Are you sure that you want to perform this action?',
  //     accept: () => {
  //       this.deleteSpecificRows();
  //     },
  //   });
  // }

  // getSample() {
  //   this._AreaService.getSample().subscribe((res) => {
  //     const link = document.createElement('a');
  //     link.href = res.data;
  //     link.click();
  //   });
  // }

  currentPage: number = 1;
  paginate(e: any) {
    this.currentPage = e.first / e.rows + 1;
    this.getOrders(e.first / e.rows + 1, e.rows);
  }

  // filter_1: any;
  // filter_2: any;
  // filter_3: any;
  // filter(
  //   filter1?: any,
  //   filter2?: HTMLInputElement,
  //   filter3?: HTMLInputElement
  // ) {
  //   this.filter_1 = filter1;
  //   this.filter_2 = filter2;
  //   this.filter_3 = filter3;
  //   this._AreaService
  //     .getFilter(1, filter1?.value, filter2?.value, filter3?.value)
  //     .subscribe((res) => {
  //       this.PaginationInfo = res.data;
  //       this.Areas = res.data.data;
  //     });
  // }

  // update(e1: HTMLElement, e2: HTMLElement) {
  //   e1.classList.add('d-none');
  //   e2.classList.remove('d-none');
  // }

  // confirmUpdate(row: any, e1: HTMLElement, e2: HTMLInputElement, type: string) {
  //   e1.classList.remove('d-none');
  //   e2.classList.add('d-none');
  //   let updateData: any = {
  //     area_ar: row.area_ar,
  //     area_en: row.area_en,
  //     id: row.id,
  //     emirate_id: row.emirate.id,
  //   };
  //   updateData[type] = e2.value;
  //   this._AreaService.updateRow(updateData).subscribe((res) => {
  //     this.getAreas();
  //   });
  // }

  // columns: any[] = [
  //   { name: 'id', status: false },
  //   { name: 'area_ar', status: false },
  //   { name: 'area_en', status: true },
  //   { name: 'emirate_id', status: false },
  //   { name: 'emirate_name_ar', status: false },
  //   { name: 'emirate_name_en', status: true },
  //   { name: 'emirate_type', status: false },
  //   { name: 'emirate_inbody', status: false },
  //   { name: 'emirate_deleted_at', status: false },
  //   { name: 'deleted_at', status: false },
  // ];

  // getFilterColumns() {
  //   this.columns.forEach((element) => {
  //     element.status = false;
  //   });

  //   this.selectedColumns.forEach((e) => {
  //     for (let i = 0; i < this.columns.length; i++) {
  //       if (this.columns[i].name == e) {
  //         this.columns[i].status = true;
  //       }
  //     }
  //   });
  // }

  // selectAllColumns(checkboxContainer: HTMLElement, currentCheckbox: Checkbox) {
  //   setTimeout(() => {
  //     if (!currentCheckbox.checked()) {
  //       this.selectedColumns = [];
  //     } else {
  //       let checkboxes: HTMLLabelElement[] = [];
  //       this.selectedColumns = [];
  //       for (let i = 0; i < checkboxContainer.children.length; i++) {
  //         checkboxes.push(checkboxContainer.children[i].children[1] as any);
  //       }
  //       this.columns.forEach((e) => {
  //         this.selectedColumns.push(e.name);
  //       });
  //     }
  //   }, 1);
  // }

}
