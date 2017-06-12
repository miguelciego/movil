import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Hero } from './hero';

@NgModule({
  declarations: [
    Hero,
  ],
  imports: [
    IonicPageModule.forChild(Hero),
  ],
  exports: [
    Hero
  ]
})
export class HeroModule {}
