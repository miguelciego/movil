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

    putVerification(valorm, platform, manufacturer,versionname, versioncode, model, uuid){
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
                    "Filial": "2",
                    "DisponibleApp":6,
                    "Disponible":10

                },
                {
                    "Valor": 8,
                    "Descripcion": "CIRUGIA",
                    "Filial": "2",
                    "DisponibleApp":8,
                    "Disponible":14
                },
                //test fer
                {
                    "Valor": 100,
                    "Descripcion": "CARDIOLOGIA",
                    "Filial": "2",
                    "DisponibleApp":8,
                    "Disponible":14
                },
                {
                    "Valor": 200,
                    "Descripcion": "MEDICINA INTERNA",
                    "Filial": "2",
                    "DisponibleApp":8,
                    "Disponible":14
                },
                {
                    "Valor": 300,
                    "Descripcion": "PEDIATRIA",
                    "Filial": "2",
                    "DisponibleApp":8,
                    "Disponible":14
                },
                {
                    "Valor": 400,
                    "Descripcion": "CIRUGIA",
                    "Filial": "2",
                    "DisponibleApp":8,
                    "Disponible":14
                },
                {
                    "Valor": 500,
                    "Descripcion": "CIRUGIA",
                    "Filial": "2",
                    "DisponibleApp":8,
                    "Disponible":14
                },
                //
                {
                    "Valor": 34,
                    "Descripcion": "CIRUGIA  CARA CUELLO",
                    "Filial": "2",
                    "DisponibleApp":2,
                    "Disponible":10
                },
                {
                    "Valor": 38,
                    "Descripcion": "ENDODONCIA",
                    "Filial": "2",
                    "DisponibleApp":4,
                    "Disponible":10
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
    getFiliales1(){
        var Filiales = [
            {
                "Codigo": 2,
                "Nombre": "POLICONSULTORIO SANTA CRUZ",
                "Direccion": "Calle España s/n Esquina Rafael Peña, Santa Cruz de la Sierra",
                "Fecha": "2017-02-09",
                "Horario":"06:00 hasta 19:00",
                "geoubicacion":"-17.777511",
                "geoubicacion2":"-63.185563",
                "Telefono":"3181600"

            },
            {
                "Codigo": 3,
                "Nombre": "GUARACACHI",
                "Direccion": null,
                "Fecha": "2017-02-09",
                "geoubicacion":"-17.785487",
                "geoubicacion2":"-63.147617"
            },
            {
                "Codigo": 4,
                "Nombre": "POLICONSULTORIO NORTE",
                "Direccion": null,
                "Fecha": "2017-02-09"
            },
            {
                "Codigo": 5,
                "Nombre": "POLICONSULTORIO SUR",
                "Direccion": null,
                "Fecha": "2017-02-09"
            }
        ];
        return Filiales;
    } 
    getGFamiliar1(){
            var GrupoFamiliar = [
                {
                "Codigo": 35433,
                "Matricula": "19690123SLM",
                "Nombre": "SANCHEZ LOPEZ MIGUEL A.",
                "HClinica": "SIN HISTOR",
                "TAsegurado": "TITULAR",
                "Atendido": "",
                "Ficha": "Sin ficha"
            },
            {
                "Codigo": 37901,
                "Matricula": "19705203CSR",
                "Nombre": "CALLEJAS SALGUERO ROSMERY",
                "HClinica": "SIN HISTOR",
                "TAsegurado": "BENEFICIARIO",
                "Atendido": "",
                "Ficha": "Con ficha"
            },
            {
                "Codigo": 96126,
                "Matricula": "19980801QCS",
                "Nombre": "QUINONES CALLEJAS SEBASTIAN",
                "HClinica": "SIN HISTOR",
                "TAsegurado": "BENEFICIARIO",
                "Atendido": "",
                "Ficha": "Sin ficha"
            }  
        ];
        return GrupoFamiliar;
    } 
    // test fer
    getRecetas1(){
        var Recetas = [
            {
                "Valor": 1,
                "nombre": "Taipire",
                "Descripcion": "capsulas para el resfrio 4/8",
            },
            {
                "Valor": 2,
                "nombre": "Resfrianex",
                "Descripcion": "capsulas para el resfrio 3/8",
            },
            {
                "Valor": 3,
                "nombre": "Tapsin",
                "Descripcion": "capsulas para el resfrio 6/24",
            },{
                "Valor": 4,
                "nombre": "Taipire 1",
                "Descripcion": "capsulas para el resfrio 4/8",
            },
            {
                "Valor": 5,
                "nombre": "Resfrianex 1",
                "Descripcion": "capsulas para el resfrio 3/8",
            },
            {
                "Valor": 6,
                "nombre": "Tapsin 1",
                "Descripcion": "capsulas para el resfrio 6/24",
            },
            {
                "Valor": 7,
                "nombre": "Taipire 2",
                "Descripcion": "capsulas para el resfrio 4/8",
            },
            {
                "Valor": 8,
                "nombre": "Resfrianex 2",
                "Descripcion": "capsulas para el resfrio 3/8",
            },
            {
                "Valor": 9,
                "nombre": "Tapsin 2",
                "Descripcion": "capsulas para el resfrio 6/24",
            },
            {
                "Valor": 10,
                "nombre": "Taipire 3",
                "Descripcion": "capsulas para el resfrio 4/8",
            },
            {
                "Valor": 11,
                "nombre": "Resfrianex 3",
                "Descripcion": "capsulas para el resfrio 3/8",
            },
            {
                "Valor": 12,
                "nombre": "Tapsin 3",
                "Descripcion": "capsulas para el resfrio 6/24",
            },
            {
                "Valor": 13,
                "nombre": "Taipire 4",
                "Descripcion": "capsulas para el resfrio 4/8",
            },
            {
                "Valor": 14,
                "nombre": "Resfrianex 4",
                "Descripcion": "capsulas para el resfrio 3/8",
            },
            {
                "Valor": 15,
                "nombre": "Tapsin 4",
                "Descripcion": "capsulas para el resfrio 6/24",
            },
            {
                "Valor": 16,
                "nombre": "Taipire 5",
                "Descripcion": "capsulas para el resfrio 4/8",
            },
            {
                "Valor": 17,
                "nombre": "Resfrianex 5",
                "Descripcion": "capsulas para el resfrio 3/8",
            },
            {
                "Valor": 18,
                "nombre": "Tapsin 5",
                "Descripcion": "capsulas para el resfrio 6/24",
            },
            {
                "Valor": 16,
                "nombre": "Taipire 5",
                "Descripcion": "capsulas para el resfrio 4/8",
            },
            {
                "Valor": 17,
                "nombre": "Resfrianex 5",
                "Descripcion": "capsulas para el resfrio 3/8",
            },
            {
                "Valor": 18,
                "nombre": "Tapsin 5",
                "Descripcion": "capsulas para el resfrio 6/24",
            },
            {
                "Valor": 16,
                "nombre": "Taipire 5",
                "Descripcion": "capsulas para el resfrio 4/8",
            },
            {
                "Valor": 17,
                "nombre": "Resfrianex 5",
                "Descripcion": "capsulas para el resfrio 3/8",
            },
            {
                "Valor": 18,
                "nombre": "Tapsin 5",
                "Descripcion": "capsulas para el resfrio 6/24",
            },
            {
                "Valor": 16,
                "nombre": "Taipire 5",
                "Descripcion": "capsulas para el resfrio 4/8",
            },
            {
                "Valor": 17,
                "nombre": "Resfrianex 5",
                "Descripcion": "capsulas para el resfrio 3/8",
            },
            {
                "Valor": 18,
                "nombre": "Tapsin 5",
                "Descripcion": "capsulas para el resfrio 6/24",
            },
            {
                "Valor": 16,
                "nombre": "Taipire 5",
                "Descripcion": "capsulas para el resfrio 4/8",
            },
            {
                "Valor": 17,
                "nombre": "Resfrianex 5",
                "Descripcion": "capsulas para el resfrio 3/8",
            },
            {
                "Valor": 18,
                "nombre": "Tapsin 5",
                "Descripcion": "capsulas para el resfrio 6/24",
            },
            {
                "Valor": 16,
                "nombre": "Taipire 5",
                "Descripcion": "capsulas para el resfrio 4/8",
            },
            {
                "Valor": 17,
                "nombre": "Resfrianex 5",
                "Descripcion": "capsulas para el resfrio 3/8",
            },
            {
                "Valor": 18,
                "nombre": "Tapsin 5",
                "Descripcion": "capsulas para el resfrio 6/24",
            },
            {
                "Valor": 16,
                "nombre": "Taipire 5",
                "Descripcion": "capsulas para el resfrio 4/8",
            },
            {
                "Valor": 17,
                "nombre": "Resfrianex 5",
                "Descripcion": "capsulas para el resfrio 3/8",
            },
            {
                "Valor": 18,
                "nombre": "Tapsin 5",
                "Descripcion": "capsulas para el resfrio 6/24",
            },
            {
                "Valor": 16,
                "nombre": "Taipire 5",
                "Descripcion": "capsulas para el resfrio 4/8",
            },
            {
                "Valor": 17,
                "nombre": "Resfrianex 5",
                "Descripcion": "capsulas para el resfrio 3/8",
            },
            {
                "Valor": 18,
                "nombre": "Tapsin 5",
                "Descripcion": "capsulas para el resfrio 6/24",
            },
            {
                "Valor": 16,
                "nombre": "Taipire 5",
                "Descripcion": "capsulas para el resfrio 4/8",
            },
            {
                "Valor": 17,
                "nombre": "Resfrianex 5",
                "Descripcion": "capsulas para el resfrio 3/8",
            },
            {
                "Valor": 18,
                "nombre": "Tapsin 5",
                "Descripcion": "capsulas para el resfrio 6/24",
            },
            {
                "Valor": 16,
                "nombre": "Taipire 5",
                "Descripcion": "capsulas para el resfrio 4/8",
            },
            {
                "Valor": 17,
                "nombre": "Resfrianex 5",
                "Descripcion": "capsulas para el resfrio 3/8",
            },
            {
                "Valor": 18,
                "nombre": "Tapsin 5",
                "Descripcion": "capsulas para el resfrio 6/24",
            },
            {
                "Valor": 18,
                "nombre": "Tapsin 5",
                "Descripcion": "capsulas para el resfrio 6/24",
            },
            {
                "Valor": 16,
                "nombre": "Taipire 5",
                "Descripcion": "capsulas para el resfrio 4/8",
            },
            {
                "Valor": 17,
                "nombre": "Resfrianex 5",
                "Descripcion": "capsulas para el resfrio 3/8",
            },
            {
                "Valor": 18,
                "nombre": "Tapsin 5",
                "Descripcion": "capsulas para el resfrio 6/24",
            },
            {
                "Valor": 16,
                "nombre": "Taipire 5",
                "Descripcion": "capsulas para el resfrio 4/8",
            },
            {
                "Valor": 17,
                "nombre": "Resfrianex 5",
                "Descripcion": "capsulas para el resfrio 3/8",
            },
            {
                "Valor": 18,
                "nombre": "Tapsin 5",
                "Descripcion": "capsulas para el resfrio 6/24",
            },
            {
                "Valor": 16,
                "nombre": "Taipire 5",
                "Descripcion": "capsulas para el resfrio 4/8",
            },
            {
                "Valor": 17,
                "nombre": "Resfrianex 5",
                "Descripcion": "capsulas para el resfrio 3/8",
            },
            {
                "Valor": 18,
                "nombre": "Tapsin 5",
                "Descripcion": "capsulas para el resfrio 6/24",
            },
            {
                "Valor": 16,
                "nombre": "Taipire 5",
                "Descripcion": "capsulas para el resfrio 4/8",
            },
            {
                "Valor": 17,
                "nombre": "Resfrianex 5",
                "Descripcion": "capsulas para el resfrio 3/8",
            },
            {
                "Valor": 18,
                "nombre": "Tapsin 5",
                "Descripcion": "capsulas para el resfrio 6/24",
            },
            {
                "Valor": 16,
                "nombre": "Taipire 5",
                "Descripcion": "capsulas para el resfrio 4/8",
            },
            {
                "Valor": 17,
                "nombre": "Resfrianex 5",
                "Descripcion": "capsulas para el resfrio 3/8",
            },
            {
                "Valor": 18,
                "nombre": "Tapsin 5",
                "Descripcion": "capsulas para el resfrio 6/24",
            }
        ];
        return Recetas;
    } 
    //test fer
    getMFicha1(){
         var Ficha = [
             {
                "Codigo": 37901,
                "MatriculaT": "19705203CSR",
                "Matricula": "19705203CSR",
                "Nombre": "CALLEJAS SALGUERO ROSMERY",
                "Empresa": "Caja petrolera de salud",
                "HClinica": "policonsultorio santa cruz",
                "Especialidad": "CARDIOLOGIA",
                "Medico": "Acosta castillo susan B",
                "Consultorio": "15",
                "hora": "11:30",
                "Fecha": "25/04/2017",
                "Ficha": 999
             }
         ];
         return Ficha;
    }
    getMFicha2(){
         var Ficha = [
             {
                "Codigo": 37901,
                "Matricula": "19705203CSR",
                "Nombre": "CALLEJAS SALGUERO ROSMERY",
                "Centro": "policonsultorio santa cruz",
                "Especialidad": "CARDIOLOGIA",
                "Medico": "Acosta castillo susan B",
                "hora": "11:30",
                "Fecha": "25/04/2017",
                "Atendido": 0
             }
         ];
         return Ficha;
    }
    getReceta2(){
         var Receta = [
             {
                "Codigo": 379,
                "Medico": "Acosta castillo susan B",
                "Centro": "Policonsultorio santa cruz",
                "Matricula": "19705203CSR",
                "Nombre": "CALLEJAS SALGUERO ROSMERY",
                "Especialidad": "CARDIOLOGIA",
                "Fecha": "25/04/2017",
                "Valido": "26/04/2017",
                "Medicamento": "Paracetamol",
                "Unidad": "Tabletas",
                "Concentracion": "50g",
                "Catidad": 10,
                "Dias_Tratamiento": 4,
                "Indicaciones": "medio comp. cada mañana  5dias",

             },
             {
                "Codigo": 359,
                "Medico": "Acosta castillo susan B",
                "Centro": "Policonsultorio santa cruz",
                "Matricula": "19705203CSR",
                "Nombre": "CALLEJAS SALGUERO ROSMERY",
                "Especialidad": "CARDIOLOGIA",
                "Fecha": "25/04/2017",
                "Valido": "27/04/2017",
                "Medicamento": "Paracetamol",
                "Unidad": "Tabletas",
                "Concentracion": "50g",
                "Catidad": 10,
                "Dias_Tratamiento": 4,
                "Indicaciones": "medio comp. cada mañana  5dias",

             }
         ];
         return Receta;
    }
}