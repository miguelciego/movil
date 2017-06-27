import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CpsProviders {
    public cpsAPI: string;
    constructor(
        public http: Http
    ) {
        this.cpsAPI = "/cpsAPI/";
    }

    putVerification(dpts, valorm, platform, manufacturer, versionname, versioncode, model, uuid) {
        var creds = "valorm=" + valorm + "&platform=" + platform +
            "&manufacturer=" + manufacturer + "&versionname=" + versionname +
            "&versioncode=" + versioncode + "&model=" + model + "&uuid=" + uuid;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        console.log("API REST", 'http://smovil' + dpts + '.cps.org.bo/consulta/verification')
        return this.http.post('http://smovil' + dpts + '.cps.org.bo/consulta/verification',
            creds, { headers: headers });
    }
    getGFamiliar(dpts, valor) {
        var creds = "valor=" + valor;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.post('http://smovil' + dpts + '.cps.org.bo/consulta/gfamiliar',
            creds, { headers: headers })
            .map(res => res.json())
    }
    getFiliales(dpts, valor) {
        var creds = "valor=" + valor;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.post('http://smovil' + dpts + '.cps.org.bo/consulta/filial', creds,
            { headers: headers });
    }
    getEspecialidades(dpts, valorf, fecha) {
        var creds = "valorf=" + valorf + "&fecha=" + fecha;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.post('http://smovil' + dpts + '.cps.org.bo/consulta/especialidad',
            creds, { headers: headers });
    }
    getMedicos(dpts, valorf, valore, fecha) {
        var creds = "valorf=" + valorf + "&valore=" + valore + "&fecha=" + fecha;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.post('http://smovil' + dpts + '.cps.org.bo/consulta/medico',
            creds, { headers: headers });
    }
    getHorarios(dpts, valorf, valore, valorm, fecha) {
        var creds = "valorf=" + valorf + "&valore=" + valore + "&valorm=" + valorm +
            "&fecha=" + fecha;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.post('http://smovil' + dpts + '.cps.org.bo/consulta/hora',
            creds, { headers: headers });
    }
    putGFicha(dpts, valora, valorf, valore, valorm, valorh, fecha) {
        var creds = "valora=" + valora + "&valorf=" + valorf + "&valore=" + valore + "&valorm=" + valorm +
            "&valorh=" + valorh + "&fecha=" + fecha;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.post('http://smovil' + dpts + '.cps.org.bo/consulta/gficha',
            creds, { headers: headers });
    }
    putBFicha(dpts, valor, tficha) {
        var creds = "valor=" + valor + "&tficha=" + tficha;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        console.log('http://smovil' + dpts + '.cps.org.bo/consulta/bficha');
        console.log("var para borrar ficha", creds)
        return this.http.post('http://smovil' + dpts + '.cps.org.bo/consulta/bficha',
            creds, { headers: headers });

    }
    getMFicha(dpts, valor) {
        var creds = "valor=" + valor;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        //return this.http.post('http://smovil' + dpts + '.cps.org.bo/consulta/mficha',
        return this.http.post( this.cpsAPI + 'consulta/mficha',
            creds, { headers: headers });
    }
    getMedicamentos(dpts, valor, ini, fin) {
        var creds = "valor=" + valor + "&ini=" + ini + "&fin=" + fin;
        console.log("creds", creds)
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        //return this.http.post('http://smovil'+ dpts +'.cps.org.bo/consulta/medicamentos2' ,
        return this.http.post(this.cpsAPI + 'consulta/medicamentos2',
            creds, { headers: headers });
    }
    getHistorial(valor) {
        var creds = "valor=" + valor;
        console.log("creds", creds)
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        //return this.http.post('http://smovilsc.cps.org.bo/consulta/historial' ,
        return this.http.post(this.cpsAPI + 'consulta/historial',
        //return this.http.post('http://192.168.74.143:3000/consulta/historial',
            creds, { headers: headers });
    }

    // Funciones para las pruebas que se deben eliminar al final del proyecto....
    //---------------------------------------------------------------------------
    getDepartamental() {
        var dpts = [
            {
                "Id": 1,
                "abrev": "sc",
                "Nombre": "Santa Cruz"
            },
            {
                "Id": 2,
                "abrev": "co",
                "Nombre": "Cochabamba"
            },
            {
                "Id": 3,
                "abrev": "lp",
                "Nombre": "La Paz"
            }
        ];
        return dpts;
    }

    getFilialessc() {
        var Filiales = [
            {
                "Codigo": 2,
                "Nombre": "Hospital Central",
                "abrev": "sc",
                "Direccion": "Calle España s/n Esquina Rafael Peña, Santa Cruz de la Sierra",
                "Fecha": "2017-02-09",
                "Horario": "06:00 hasta 19:00",
                "geoubicacion": "-17.777511",
                "geoubicacion2": "-63.185563",
                "Telefono": "3181600"
            },
            {
                "Codigo": 3,
                "abrev": "sc",
                "Nombre": "Hospital Guaracachi",
                "Direccion": "Prolongación avenida Brasil esquina cuarto anillo",
                "Horario": "06:00 hasta 19:00",
                "Fecha": "2017-02-09",
                "geoubicacion": "-17.785487",
                "geoubicacion2": "-63.147617"
            },
            {
                "Codigo": 4,
                "Nombre": "Policonsultorio Norte",
                "abrev": "sc",
                "Direccion": "Calle Gustavo Parada N° 124 Barrio Marabol -UV36 - MNZ 54",
                "Horario": "07:00 hasta 19:00",
                "Fecha": "2017-02-09",
                "geoubicacion": "-17.761620",
                "geoubicacion2": "-63.181827"
            },
            {
                "Codigo": 5,
                "Nombre": "Policonsultorio Sur",
                "abrev": "sc",
                "Direccion": "Avenida Juan Pablo II N° 30.UV:ET8 MZN:E05",
                "Horario": "06:00 hasta 19:00",
                "Fecha": "2017-02-09",
                "geoubicacion": "-17.806898",
                "geoubicacion2": "-63.169833"
            }
        ];
        return Filiales;
    }
    getFilialesco() {
        var Filiales = [
            {
                "Codigo": 2,
                "Nombre": "Policonsultorio Cochabamba",
                "abrev": "co",
                "Direccion": "undefined",
                "Fecha": "2017-02-09",
                "Horario": "06:00 hasta 19:00",
                "geoubicacion": "-17.777511",
                "geoubicacion2": "-63.185563",
                "Telefono": "3181600"
            },
            {
                "Codigo": 3,
                "Nombre": "Hospital Seton",
                "abrev": "co",
                "Direccion": "Avenida Blanco Galindo Km. 5 y medio",
                "Horario": "06:00 hasta 19:00",
                "Fecha": "2017-02-09",
                "geoubicacion": "-17.393112",
                "geoubicacion2": "-66.204010"
            },
            {
                "Codigo": 7,
                "Nombre": "Policonsultorio Norte",
                "abrev": "co",
                "Direccion": "Undefined",
                "Horario": "07:00 hasta 19:00",
                "Fecha": "2017-02-09",
                "geoubicacion": "-17.785487",
                "geoubicacion2": "-63.147617"
            },
        ];
        return Filiales;
    }
    getFilialeslp() {
        var Filiales = [
            {
                "Codigo": 3,
                "Nombre": "Policonsultorio 20 de Octubre",
                "abrev": "lp",
                "Direccion": "Avenida 20 de Octubre esquina Rosendo Gutierrez N° 2284",
                "Fecha": "2017-02-09",
                "Horario": "06:00 hasta 19:00",
                "geoubicacion": "-16.508901",
                "geoubicacion2": "-68.127653",
                "Telefono": "3181600"
            },
            {
                "Codigo": 4,
                "Nombre": "Clínica Arce",
                "abrev": "lp",
                "Direccion": "Avenida Arce y Plaza Isabel la Católica N° 2525",
                "Horario": "06:00 hasta 19:00",
                "Fecha": "2017-02-09",
                "geoubicacion": "-16.509765",
                "geoubicacion2": "-68.123698"
            },
            {
                "Codigo": 5,
                "Nombre": "Policonsultorio el Alto",
                "abrev": "lp",
                "Direccion": "Zona el Alto avenida Unión",
                "Horario": "07:00 hasta 19:00",
                "Fecha": "2017-02-09",
                "geoubicacion": "-16.511309",
                "geoubicacion2": "-68.166425"
            },
            {
                "Codigo": 7,
                "Nombre": "Hospital de Obraje",
                "Direccion": "Avenida Costanerita esquina Calle 8 de Obrajes",
                "Horario": "06:00 hasta 19:00",
                "Fecha": "2017-02-09",
                "geoubicacion": "-16.528354",
                "geoubicacion2": "-68.109134"
            }
        ];
        return Filiales;
    }
    getEspecialidades1() {
        var Especialidades = [
            {
                "Valor": 36,
                "Descripcion": "ANEST.Y TERAPIA",
                "Filial": "2",
                "DisponibleApp": 6,
                "Disponible": 10

            },
            {
                "Valor": 8,
                "Descripcion": "CIRUGIA",
                "Filial": "2",
                "DisponibleApp": 8,
                "Disponible": 14
            },
            //test fer
            {
                "Valor": 100,
                "Descripcion": "CARDIOLOGIA",
                "Filial": "2",
                "DisponibleApp": 8,
                "Disponible": 14
            },
            {
                "Valor": 200,
                "Descripcion": "MEDICINA INTERNA",
                "Filial": "2",
                "DisponibleApp": 8,
                "Disponible": 14
            },
            {
                "Valor": 300,
                "Descripcion": "PEDIATRIA",
                "Filial": "2",
                "DisponibleApp": 8,
                "Disponible": 14
            },
            {
                "Valor": 400,
                "Descripcion": "CIRUGIA",
                "Filial": "2",
                "DisponibleApp": 8,
                "Disponible": 14
            },
            {
                "Valor": 500,
                "Descripcion": "CIRUGIA",
                "Filial": "2",
                "DisponibleApp": 8,
                "Disponible": 14
            },
            //
            {
                "Valor": 34,
                "Descripcion": "CIRUGIA  CARA CUELLO",
                "Filial": "2",
                "DisponibleApp": 2,
                "Disponible": 10
            },
            {
                "Valor": 38,
                "Descripcion": "ENDODONCIA",
                "Filial": "2",
                "DisponibleApp": 4,
                "Disponible": 10
            }
        ];

        return Especialidades;
    }
    getMedicos1() {
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
    getHorarios1() {
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
    getGFamiliar1() {
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
                "Nombre": "QUINONES CALLEJAS SEBASTIAN SEBASTIAN",
                "HClinica": "SIN HISTOR",
                "TAsegurado": "BENEFICIARIO",
                "Atendido": "",
                "Ficha": "Sin ficha"
            }
        ];
        return GrupoFamiliar;
    }
    getReceta2() {
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
    getRes() {
        var res = [
            {
                "respuesta": 1,
                "cod_afi": 200132,
                "nom_afi": "CABELLO PENA EDGAR ENRIQUE",
                "nom_emp": 1
            }];
        return res;
    }
}