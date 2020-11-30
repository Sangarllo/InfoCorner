import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoticesRoutingModule } from '@app/notices/notices-routing.module';
import { NoticesComponent } from '@app/notices/notices.component';
import { NoticeViewComponent } from '@app/notices/notice-view/notice-view.component';
import { NoticeEditComponent } from '@app/notices/notice-edit/notice-edit.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    NoticesComponent,
    NoticeViewComponent,
    NoticeEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NoticesRoutingModule
  ]
})
export class NoticesModule { }
