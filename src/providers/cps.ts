import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Cps provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CpsProviders {

    constructor(public http: Http) {
      console.log('Hello Cps Provider');
    }

    putVerification(valorm, platform, manufacturer,
                    versionname, versioncode, model, uuid){
        var creds = "valorm=" + valorm + "&platform=" + platform + 
            "&manufacturer=" + manufacturer + "&versionname=" + versionname + 
            "&versioncode=" + versioncode +  "&model=" + model +   "&uuid=" + uuid;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        
        return this.http.post('http://smovilsc.cps.org.bo/consulta/verification' ,
        creds, { headers: headers });
    }
    getGFamiliar(valor){
        var creds = "valor=" + valor ;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        
        return this.http.post('http://smovilsc.cps.org.bo/consulta/gfamiliar' ,
        creds, { headers: headers });
    }
    getFiliales(valor){
        var creds = "valor=" + valor ;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.post('http://smovilsc.cps.org.bo/consulta/filial1' , creds, 
         { headers: headers });
    }
    getEspecialidades(valorf, fecha) {
        var creds = "valorf=" + valorf + "&fecha="+ fecha ;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        
        return this.http.post('http://smovilsc.cps.org.bo/consulta/especialidad' ,
        creds, { headers: headers });
    }
    getMedicos(valorf, valore, fecha){
        var creds = "valorf=" + valorf + "&valore=" + valore + "&fecha="+ fecha ;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.post('http://smovilsc.cps.org.bo/consulta/medico' ,
        creds, { headers: headers });
    }
    getHorarios(valorf, valore, valorm, fecha){
        var creds = "valorf=" + valorf + "&valore=" + valore + "&valorm=" + valorm +
         "&fecha="+ fecha ;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        
        return this.http.post('http://smovilsc.cps.org.bo/consulta/hora' ,
        creds, { headers: headers });
    }
    putGFicha(valora, valorf, valore, valorm, valorh, fecha){
        var creds = "valora=" + valora + "&valorf=" + valorf + "&valore=" + valore + "&valorm=" + valorm +
         "&valorh=" + valorh + "&fecha="+ fecha ;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        
        return this.http.post('http://smovilsc.cps.org.bo/consulta/gficha' ,
        creds, { headers: headers });
    }
    putBFicha(valor, tficha){
        var creds = "valor=" + valor + "&tficha=" + tficha;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        
        return this.http.post('http://smovilsc.cps.org.bo/consulta/bficha' ,
        creds, { headers: headers });
    }
    getMFicha(valor){
        var creds = "valor=" + valor ;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        
        return this.http.post('http://smovilsc.cps.org.bo/consulta/mficha' ,
        creds, { headers: headers });
    }
    getMedicamentos(valor){
        var creds = "valor=" + valor ;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        
        return this.http.post('http://smovilsc.cps.org.bo/consulta/medicamentos' ,
        creds, { headers: headers });
    }

// Funciones para las pruebas que se deben eliminar al final del proyecto....
//---------------------------------------------------------------------------

    getEspecialidades1() {
        var Especialidades = [
                {
                    "Valor": 36,
                    "Descripcion": "ANEST.Y TERAPIA",
                    "Filial": "2"
                },
                {
                    "Valor": 8,
                    "Descripcion": "CIRUGIA",
                    "Filial": "2"
                },
                {
                    "Valor": 34,
                    "Descripcion": "CIRUGIA  CARA CUELLO",
                    "Filial": "2"
                },
                {
                    "Valor": 38,
                    "Descripcion": "ENDODONCIA",
                    "Filial": "2"
                }
            ];

        return Especialidades;
    }  
    getMedicos1(){
        var Medicos = [
            {
                "Valor": 275,
                "Descripcion": "BALLIVIAN CAPRILES SERGIO",
                "Filial": "2",
                "Especialidad": "8"
            },
            {
                "Valor": 119,
                "Descripcion": "ORTIZ EID JESSICA",
                "Filial": "2",
                "Especialidad": "8"
            },
            {
                "Valor": 215,
                "Descripcion": "ROCA CLAROS OSVALDO IVAN",
                "Filial": "2",
                "Especialidad": "8"
            }
        ];
        return Medicos;
    } 
    getHorarios1(){
        var Horarios = [
            {
                "Valor": 1001,
                "Descripcion": "16:15",
                "Filial": "2",
                "Especialidad": "8",
                "Medico": "119"
            },
            {
                "Valor": 1002,
                "Descripcion": "16:30",
                "Filial": "2",
                "Especialidad": "8",
                "Medico": "119"
            }
        ];
        return Horarios;
    } 


}
