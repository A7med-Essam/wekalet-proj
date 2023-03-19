import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { ContactService } from 'src/app/shared/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  insertForm!: FormGroup;
  constructor(private _ContactService:ContactService,
    private _MessageService: MessageService,
      private _TranslateService:TranslateService
    ) { }

  ngOnInit(): void {
    this.setInsertForm();
  }

  insertRow(insertForm: FormGroup) {
    if (insertForm.valid) {
      this._ContactService
        .sendMessage(insertForm.value)
        .subscribe((res: any) => {
          if (res.status == 1) {
            insertForm.reset();
            if (this._TranslateService.currentLang == 'ar') {
              this._MessageService.add({
                severity: 'success',
                summary: 'جهات الاتصال',
                detail:'تم أرسال الرساله بنجاح وسيتم الرد عليك في أقرب وقت',
              });
            } else {
              this._MessageService.add(  {
                severity: 'success',
                summary: 'Contacts',
                detail: 'The message has been sent successfully and we will contact you as soon as possible',
              });
            }
            
          }
        });
    }
  }

  setInsertForm() {
    this.insertForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      mobile: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required,Validators.email]),
      subject: new FormControl("Message"),
      message: new FormControl(null, [Validators.required]),
    });
  }

}
