import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PermisoPage } from './permiso';

@NgModule({
  declarations: [
    PermisoPage,
  ],
  imports: [
    IonicPageModule.forChild(PermisoPage),
  ],
  exports: [
    PermisoPage
  ]
})
export class PermisoPageModule {}
