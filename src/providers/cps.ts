import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CpsProviders {
	public cpsAPI: string;
	constructor(
		public http: Http
	) {
		this.cpsAPI = "/cpsAPI/";
	}
	putVerification(dpts, valorm, uuid, manufacturer, model, platform, versionname, versioncode ) {
		var creds = "valorm=" + valorm + "&uuid=" + uuid + "&manufacturer=" + manufacturer + "&model=" + model + "&platform=" + platform + 	"&versionname=" + versionname + "&versioncode=" + versioncode;		
		console.log("DATA", creds)
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

		console.log("var para borrar ficha", creds)
		return this.http.post('http://smovil' + dpts + '.cps.org.bo/consulta/bficha',
			creds, { headers: headers });

	}
	/******************************************************** API REST NODE JS********************************************************/
	putVersion(version) {
		var creds = "versionCode=" + version;
		let headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		//return this.http.get('http://smovilsc.cps.org.bo/consulta/medicamentos1?'+ creds,
		return this.http.get(this.cpsAPI + 'consulta/medicamentos1?' + creds,
			{ headers: headers });
	}
	getDepartamental() {
		let headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		//return this.http.post('http://smovilsc.cps.org.bo/consulta/departamental',
		return this.http.post(this.cpsAPI + 'consulta/departamental',
			{ headers: headers });
	}
	getMaps(abrev) {
		var creds = "abrev=" + abrev;
		let headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		//return this.http.post('http://smovilsc.cps.org.bo/consulta/maps',
		return this.http.post(this.cpsAPI + 'consulta/maps',
			creds, { headers: headers })
			.map(this.Edata)
	}
	getMFicha(dpts, valor) {
		var creds = "valor=" + valor;
		let headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');

		//return this.http.post('http://smovil' + dpts + '.cps.org.bo/consulta/mficha',
		return this.http.post(this.cpsAPI + 'consulta/mficha',
			creds, { headers: headers });
	}
	getMedicamentos(dpts, valor, ini, fin) {
		var creds = "valor=" + valor + "&ini=" + ini + "&fin=" + fin;
		console.log("creds", creds)
		let headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		console.log('http://smovil' + dpts + '.cps.org.bo/consulta/medicamentos2')
		//return this.http.post('http://smovil' + dpts + '.cps.org.bo/consulta/medicamentos2',
		return this.http.post(this.cpsAPI + 'consulta/medicamentos2',
			creds, { headers: headers });
	}
	getHistorial(dpts,valor) {
		var creds = "valor=" + valor;
		console.log("creds", creds)
		let headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		console.log('http://smovil' + dpts + '.cps.org.bo/consulta/historial')
		//return this.http.post('http://smovil' + dpts + '.cps.org.bo/consulta/historial',
		return this.http.post(this.cpsAPI + 'consulta/historial',
			creds, { headers: headers });
	}
	getPermiso(dpts) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		console.log('http://smovil' + dpts + '.cps.org.bo/consulta/test')
		//return this.http.post('http://smovil' + dpts + '.cps.org.bo/consulta/test',
		return this.http.post(this.cpsAPI + 'consulta/test',
			{ headers: headers });
	}
	/*getTeste(dpts, valorf) {
		var creds = "valorf=" + valorf;
		console.log("cred", creds)
		let headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		//return this.http.post('http://smovil' + dpts + '.cps.org.bo/consulta/teste',
		return this.http.post(this.cpsAPI + 'consulta/teste',
			creds, { headers: headers });
	}
	getTestm(dpts, valorf, valore) {
		var creds = "valorf=" + valorf + "&valore=" + valore;
		console.log("cred", creds)
		let headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		//return this.http.post('http://smovil' + dpts + '.cps.org.bo/consulta/testm',
		return this.http.post(this.cpsAPI + 'consulta/testm',
			creds, { headers: headers });
	}
	getTesth(dpts, valorf, valore, valorm) {
		var creds = "valorf=" + valorf + "&valore=" + valore + "&valorm=" + valorm;
		console.log("cred", creds)
		let headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		//return this.http.post('http://smovil' + dpts + '.cps.org.bo/consulta/testh',
		return this.http.post(this.cpsAPI + 'consulta/testh',
			creds, { headers: headers });
	}*/
	// Funciones para las pruebas que se deben eliminar al final del proyecto....
	//---------------------------------------------------------------------------
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
	private Edata(res: Response) {
		return res.json()
	}
}