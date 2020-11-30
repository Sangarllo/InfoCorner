import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoticesComponent } from '@app/notices/notices.component';
import { NoticeViewComponent } from '@app/notices/notice-view/notice-view.component';
import { NoticeEditComponent } from '@app/notices/notice-edit/notice-edit.component';

const routes: Routes = [
  {
    path: '',
    component: NoticesComponent
  },
  {
    path: ':id',
    component: NoticeViewComponent,
  },
  {
    path: ':id/editar',
    component: NoticeEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoticesRoutingModule { }
