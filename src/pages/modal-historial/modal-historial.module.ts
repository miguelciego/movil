import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalHistorial } from './modal-historial';

@NgModule({
  declarations: [
    ModalHistorial,
  ],
  imports: [
    IonicPageModule.forChild(ModalHistorial),
  ],
  exports: [
    ModalHistorial
  ]
})
export class ModalHistorialModule {}
