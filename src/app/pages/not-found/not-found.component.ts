import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit, OnDestroy {
  constructor(
    private _Router: Router,
    private _TranslateService: TranslateService
  ) {}
  private unsubscribe$ = new Subject<void>();

  lang: string = '';
  ngOnInit(): void {
    this.lang = this._TranslateService.currentLang
    this._TranslateService.onLangChange
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res: any) => {
          this.lang = this._TranslateService.currentLang;
        },
      });
  }

  getHomePage() {
    this._Router.navigate(['home']);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
