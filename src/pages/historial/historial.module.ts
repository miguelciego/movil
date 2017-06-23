import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Historial } from './historial';

@NgModule({
  declarations: [
    Historial,
  ],
  imports: [
    IonicPageModule.forChild(Historial),
  ],
  exports: [
    Historial
  ]
})
export class HistorialModule {}
