import { Component, HostBinding } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'footer-cmp',
  templateUrl: 'footer.component.html',
})
export class FooterAdminComponent {
  test: Date = new Date();
}
