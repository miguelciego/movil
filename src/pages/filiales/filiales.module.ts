import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilialesPage } from './filiales';
 
 @NgModule({
   declarations: [
     FilialesPage,
   ],
   imports: [
     IonicPageModule.forChild(FilialesPage),
   ],
   exports: [
       FilialesPage     
   ]
 })
 export class FilialesPageModule {}