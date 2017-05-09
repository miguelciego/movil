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
import { ResumenPage } from '../pages/resumen/resumen' 

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
    ResumenPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
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
    ResumenPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
