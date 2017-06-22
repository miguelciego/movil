import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalWifi } from './modal-wifi';

@NgModule({
  declarations: [
    ModalWifi,
  ],
  imports: [
    IonicPageModule.forChild(ModalWifi),
  ],
  exports: [
    ModalWifi
  ]
})
export class ModalWifiModule {}
