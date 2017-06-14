import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleMedPage } from './detalle-med';
 
 @NgModule({
   declarations: [
     DetalleMedPage,
   ],
   imports: [
     IonicPageModule.forChild(DetalleMedPage),
   ],
   exports: [
     DetalleMedPage
   ]
 })
 export class MitabPageModule {}