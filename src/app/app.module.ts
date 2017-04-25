import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
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
    VerificacionPage
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
    VerificacionPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
