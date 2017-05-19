import { Injectable } from '@angular/core';

declare var window : any;
@Injectable()
export class AfiliadoService {

  public text : string = "";
  public db = null;
  public arr  : any = [];
  constructor() {}

  /**
  * Abrir la Base de datos
  */
  openDb() {
    this.db = window.sqlitePlugin.openDatabase({name: 'dbafiliado.db', location: 'default'});
    this.db.transaction((tx) => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS afiliado (id integer primary key,matricula text,filial text)');
      }, (error) => {
        console.log('Error :( ', error);
      }, () => {
        console.log('La tabla ya existe');
      })
  }
  /************************************* AGREGAR *************************************************/
  /**FUNCION DE AGREGAR **/
  agregarItem(matricula,filial) {
    return new Promise(resolve => {
      var consulta = "INSERT INTO afiliado (matricula,filial) VALUES (?,?)";
      this.db.executeSql(consulta, [matricula, filial], (r) => {
          console.log('se ha insertado correctamente');
          this.getAll().then(s => {
              resolve(true);
            });
        }, e => {
          console.log('Error al insertar', e);
          resolve(false);
        })
    })
  }
  /*************************************** GETALL ****************************************************/
   getAll() {
    return new Promise(res => {
      this.arr = [];
      let consulta = "SELECT * FROM afiliado";
      console.log("consulta",consulta)
      this.db.executeSql(consulta, [], rs => {
          if (rs.rows.length > 0) {
            for (var i = 0; i < rs.rows.length; i++) {
              var item = rs.rows.item(i);
              this.arr.push(item);
            }
          }
          res(true);
        }, (e) => {
          console.log('Error en la consulta SQL', e);
        });
    })

  }
 /******************************************** ELIMINAR  **************************************************/
  eliminar(id) {
    return new Promise(resolve => {
      var consulta = "DELETE FROM afiliado WHERE id=?";
      this
        .db
        .executeSql(consulta, [id], (s) => {
          console.log('Se ha eliminado Correctamente...', s);
          this.getAll().then(s => {
              resolve(true);
            });
        }, (err) => {
          console.log('Error al eliminar', err);
        });
    })

  }
  /*********************************************** MODIFICAR ************************************************/
  modificar(id, matricula) {
    return new Promise(res => {
      var consulta = "UPDATE afiliado SET matricula=? WHERE id=?";
      this.db.executeSql(consulta, [matricula, id], (s) => {
          console.log('Modificado Correctamente...', s);
          this.getAll().then(s => {
              res(true);
            });
        }, (err) => {
          console.log('Error al modificar', err);
        });
    })

  }
}
