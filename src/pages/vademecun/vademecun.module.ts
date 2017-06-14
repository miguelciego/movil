import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VademecunPage } from './vademecun';
 
 @NgModule({
   declarations: [
     VademecunPage,
   ],
   imports: [
     IonicPageModule.forChild(VademecunPage),
   ],
   exports: [
     VademecunPage
   ]
 })
 export class VademecunPageModule {}