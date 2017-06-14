import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GrupoFamiliarPage } from './grupofamiliar';
 
 @NgModule({
   declarations: [
     GrupoFamiliarPage,
   ],
   imports: [
     IonicPageModule.forChild(GrupoFamiliarPage),
   ],
   exports: [
     GrupoFamiliarPage
   ]
 })
 export class GrupoFamiliarPageModule {}