import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HorariosPage } from './horarios';
 
 @NgModule({
   declarations: [
     HorariosPage,
   ],
   imports: [
     IonicPageModule.forChild(HorariosPage),
   ],
   exports: [
     HorariosPage
   ]
 })
 export class HorariosPageModule {}