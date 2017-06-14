import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EspecialidadesPage } from './especialidades';
 
 @NgModule({
   declarations: [
     EspecialidadesPage,
   ],
   imports: [
     IonicPageModule.forChild(EspecialidadesPage),
   ],
   exports: [
     EspecialidadesPage
   ]
 })
 export class HomePageModule {}