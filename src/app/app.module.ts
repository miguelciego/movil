import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PopoverPage } from '../pages/mitab/popover';
import { MitabPage } from '../pages/mitab/mitab';
import { FichasPage } from '../pages/fichas/fichas';
import { CentrosPage } from '../pages/centros/centros';
import { MapasPage } from '../pages/mapas/mapas';
import { DetailsPage } from '../pages/details/details';
import { EspecialidadesPage } from '../pages/especialidades/especialidades';
import { MedicosPage } from '../pages/medicos/medicos';
import { HorariosPage } from '../pages/horarios/horarios';
import { FilialesPage } from '../pages/filiales/filiales';
import { GrupoFamiliarPage } from '../pages/grupofamiliar/grupofamiliar';
import { VerificacionPage } from '../pages/verificacion/verificacion';
import { LoginPage } from '../pages/login/login';
import { VademecunPage } from '../pages/vademecun/vademecun';
import { ModalPage } from '../pages/modal/modal';
import { PerfilPage } from '../pages/perfil/perfil';
import { ResumenPage } from '../pages/resumen/resumen';
import { HistorialPage } from '../pages/historial/historial';
import { DetalleEspPage } from '../pages/detalle-esp/detalle-esp'; 
import { DetalleMedPage } from '../pages/detalle-med/detalle-med';
import { ConfigPage } from '../pages/config/config';

import { AfiliadoService } from '../providers/afiliado-service'



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
    FichasPage,
    CentrosPage,
    MapasPage,
    DetailsPage,
    EspecialidadesPage,
    MedicosPage,
    HorariosPage,
    FilialesPage,
    GrupoFamiliarPage,
    ModalPage,
    VerificacionPage,
    LoginPage,
    PopoverPage,
    VademecunPage,
    PerfilPage,
    ResumenPage,
    HistorialPage,
    DetalleEspPage,
    DetalleMedPage,
    ConfigPage
  ],
  imports: [
    IonicModule.forRoot(MyApp,config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MitabPage,
    FichasPage,
    CentrosPage,
    MapasPage,
    DetailsPage,
    EspecialidadesPage,
    MedicosPage,
    HorariosPage,
    FilialesPage,
    GrupoFamiliarPage,
    ModalPage,
    VerificacionPage,
    LoginPage,
    PopoverPage,
    VademecunPage,
    PerfilPage,
    ResumenPage,
    HistorialPage,
    DetalleEspPage,
    DetalleMedPage,
    ConfigPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AfiliadoService
  ]
})
export class AppModule {}
