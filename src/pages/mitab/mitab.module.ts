import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MitabPage } from './mitab';
 
 @NgModule({
   declarations: [
     MitabPage,
   ],
   imports: [
     IonicPageModule.forChild(MitabPage),
   ],
   exports: [
     MitabPage
   ]
 })
 export class MitabPageModule {}