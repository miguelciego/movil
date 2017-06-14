import { NgModule } from '@angular/core';
 import { IonicPageModule } from 'ionic-angular';
 import { MapasPage } from './mapas';
 
 @NgModule({
   declarations: [
     MapasPage,
   ],
   imports: [
     IonicPageModule.forChild(MapasPage),
   ],
   exports: [
     MapasPage
   ]
 })
 export class MapasPageModule {}