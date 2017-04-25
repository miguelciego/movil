import { Component } from '@angular/core';

/*
  Generated class for the Datoscps component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'datoscps',
  templateUrl: 'datoscps.html'
})
export class DatoscpsComponent {

  text: string;

  constructor() {
    console.log('Hello Datoscps Component');
    this.text = 'Hello World';
  }

}
