import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {

  mostraContenutoIcon1: boolean = false;
  mostraContenutoIcon2: boolean = false;

  mostraContenuto(icon: string) {
    if (icon === 'icon1') {
      this.mostraContenutoIcon1 = true;
      this.mostraContenutoIcon2 = false;
    } else if (icon === 'icon2') {
      this.mostraContenutoIcon1 = false;
      this.mostraContenutoIcon2 = true;
    }
  }
}
