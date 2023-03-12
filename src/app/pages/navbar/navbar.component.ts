import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
  }

  openSidebar(navbar:HTMLElement){
    navbar.classList.add("open")
    this.document.body.classList.add('open');
  }

  closeSidebar(navbar:HTMLElement){
    navbar.classList.remove("open")
    this.document.body.classList.remove('open');
  }
}
