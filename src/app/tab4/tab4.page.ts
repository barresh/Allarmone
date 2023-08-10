import { Component } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss']
})
export class Tab4Component {
  pin: string = "";
  pinDisplayValue: string = "";

  appendToPin(digit: string) {
    if (this.pin.length < 6) {
      this.pin += digit;
      this.updatePinDisplay();
    }
  }

  deleteFromPin() {
    this.pin = this.pin.slice(0, -1);
    this.updatePinDisplay();
  }

  sendPin() {
    // Qui puoi gestire l'invio del PIN, ad esempio, chiamare un servizio o eseguire una logica specifica
    console.log('PIN inviato:', this.pin);
    // Resetta il PIN dopo l'invio
    this.resetPin();
  }

  resetPin() {
    this.pin = "";
    this.updatePinDisplay();
  }

  updatePinDisplay() {
    this.pinDisplayValue = "*".repeat(this.pin.length);
  }
}
