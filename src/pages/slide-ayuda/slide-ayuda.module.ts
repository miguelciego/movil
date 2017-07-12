import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SlideAyuda } from './slide-ayuda';

@NgModule({
  declarations: [
    SlideAyuda,
  ],
  imports: [
    IonicPageModule.forChild(SlideAyuda),
  ],
  exports: [
    SlideAyuda
  ]
})
export class SlideAyudaModule {}
