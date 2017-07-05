import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { PopoverPage } from '../pages/mitab/popover';

import { IonicStorageModule } from '@ionic/storage';
import { AfiliadoStorage } from '../providers/afiliado-storage';
import { gFamiliarStorage } from '../providers/grupoFamiliar-storage';

import { Network } from '@ionic-native/network';

const config = {
  tabsHideOnSubPages: true,
  tabsPlacement: 'bottom'
}

@NgModule({
  declarations: [
    MyApp,
    PopoverPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,config),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PopoverPage,
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AfiliadoStorage, gFamiliarStorage, Network
  ]
})
export class AppModule {}
