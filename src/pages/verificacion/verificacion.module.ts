import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VerificacionPage } from './verificacion';
 
 @NgModule({
   declarations: [
     VerificacionPage,
   ],
   imports: [
     IonicPageModule.forChild(VerificacionPage),
   ],
   exports: [
     VerificacionPage
   ]
 })
 export class VerificacionPageModule {}