import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { PopoverPage } from '../pages/mitab/popover';
import { popoverUpdatePage } from '../pages/mitab/popoverUpdate';

import { IonicStorageModule } from '@ionic/storage';
import { AfiliadoStorage } from '../providers/afiliado-storage';
import { gFamiliarStorage } from '../providers/grupoFamiliar-storage';
import { permisoStorage } from '../providers/permiso-storage';

import { Network } from '@ionic-native/network';
import { Push } from '@ionic-native/push';
import { Device } from '@ionic-native/device';
import { InAppBrowser } from '@ionic-native/in-app-browser';

const config = {
  tabsHideOnSubPages: true,
  tabsPlacement: 'bottom',
  backButtonText: '',
}


@NgModule({
  declarations: [
    MyApp,
    PopoverPage,
    popoverUpdatePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, config),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PopoverPage,
    popoverUpdatePage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AfiliadoStorage, gFamiliarStorage, permisoStorage, Network, Push, InAppBrowser, Device
  ]
})
export class AppModule { }
