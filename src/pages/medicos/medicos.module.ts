import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicosPage } from './medicos';
 
 @NgModule({
   declarations: [
     MedicosPage,
   ],
   imports: [
     IonicPageModule.forChild(MedicosPage),
   ],
   exports: [
     MedicosPage
   ]
 })
 export class MedicosPageModule {}