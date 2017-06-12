import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PopoverPage } from '../pages/mitab/popover';
import { MitabPage } from '../pages/mitab/mitab';
import { MapasPage } from '../pages/mapas/mapas';
import { EspecialidadesPage } from '../pages/especialidades/especialidades';
import { MedicosPage } from '../pages/medicos/medicos';
import { HorariosPage } from '../pages/horarios/horarios';
import { FilialesPage } from '../pages/filiales/filiales';
import { GrupoFamiliarPage } from '../pages/grupofamiliar/grupofamiliar';
import { LoginPage } from '../pages/login/login';
import { VademecunPage } from '../pages/vademecun/vademecun';
import { ModalPage } from '../pages/modal/modal';
import { ResumenPage } from '../pages/resumen/resumen';
import { DetalleMedPage } from '../pages/detalle-med/detalle-med';
import { ConfigPage } from '../pages/config/config';
import { VerificacionPage } from '../pages/verificacion/verificacion';

import { IonicStorageModule } from '@ionic/storage';

import { AfiliadoStorage } from '../providers/afiliado-storage'

const config = {
  tabsHideOnSubPages: true,
  tabsPlacement: 'top',
  platforms: {
    ios: {
      tabsHideOnSubPages: false,
      tabsPlacement:'bottom'
    },
  }
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MitabPage,
    MapasPage,
    EspecialidadesPage,
    MedicosPage,
    HorariosPage,
    FilialesPage,
    GrupoFamiliarPage,
    ModalPage,
    LoginPage,
    PopoverPage,
    VademecunPage,
    ResumenPage,
    DetalleMedPage,
    ConfigPage,
    VerificacionPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,config),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MitabPage,
    MapasPage,
    EspecialidadesPage,
    MedicosPage,
    HorariosPage,
    FilialesPage,
    GrupoFamiliarPage,
    ModalPage,
    LoginPage,
    PopoverPage,
    VademecunPage,
    ResumenPage,
    DetalleMedPage,
    ConfigPage,
    VerificacionPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AfiliadoStorage
  ]
})
export class AppModule {}
