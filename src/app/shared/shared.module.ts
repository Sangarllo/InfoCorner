import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '@app/material/material.module';

import { FooterComponent } from '@shared/layout/footer/footer.component';
import { HeaderComponent } from '@shared/layout/header/header.component';
import { SidenavComponent } from '@shared/layout/sidenav/sidenav.component';
import { SectionHeaderComponent } from '@shared/layout/section-header/section-header.component';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { BaseItemDetailComponent } from '@shared/components/base-item-detail/base-item-detail.component';
import { BaseItemsListComponent } from '@shared/components/base-items-list/base-items-list.component';
import { BaseItemsAdminComponent } from '@shared/components/base-items-admin/base-items-admin.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SidenavComponent,
    SectionHeaderComponent,
    LoadingComponent,
    BaseItemDetailComponent,
    BaseItemsListComponent,
    BaseItemsAdminComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FooterComponent,
    HeaderComponent,
    SidenavComponent,
    SectionHeaderComponent,
    LoadingComponent,
    BaseItemDetailComponent,
    BaseItemsListComponent,
    BaseItemsAdminComponent,
  ]
})
export class SharedModule { }
