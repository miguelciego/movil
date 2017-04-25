import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CpsProviders } from '../../providers/cps';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
  providers: [CpsProviders]

})
export class DetailsPage {
  public readme = '';
  public repo;

  constructor(public navCtrl: NavController, 
  public navParams: NavParams,
  private cps: CpsProviders) {

    this.repo = navParams.get('repo');

    this.cps.getFiliales(this.repo).subscribe(
      data => this.readme = data.text(),
      err => {
        if (err.status == 404) {
          this.readme = 'Este repo no tiene README. :(';
        } else {
          console.error(err);
        }
      },
      () => console.log('getDetails completed')
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

}
