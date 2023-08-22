import { Component } from "@angular/core";
import { WebSocketService } from "../websocket-service";
import { Component } from '@angular/core';
import { WebSocketService } from '../websocket-service';



@Component({
  selector: "app-tab4",
  templateUrl: "./tab4.page.html",
  styleUrls: ["./tab4.page.scss"],
})

export class Tab4Component {
  constructor(private webSocketService: WebSocketService) {}

  constructor(private webSocketService:WebSocketService){}
  pin: string = "";
  pinDisplayValue: string = "";
  porcone: number = 10;
  area1 = 1;
  ngOnInit() {
    {
      this.webSocketService.getMessages().subscribe((message) => {
        console.log("messaggio ricevuto", message);
      });
    }
  porcone:number =10;
  area1=1;
  generatedPin = '111111';


  ngOnInit(){{
    this.webSocketService.getMessages().subscribe((message) => {
      console.log("messaggio ricevuto",message)
    });
  }
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

  getMessage() {
    this.webSocketService.getMessages().subscribe((message) => {
      console.log("messaggio ricevuto", message);
    });
  }
  sendMessage() {
    this.webSocketService.sendMessage("pin" + this.pin);
  }
  accendiArea1() {
    this.webSocketService.sendMessage(this.area1);
  }
  sendPin() {
    // Qui puoi gestire l'invio del PIN, ad esempio, chiamare un servizio o eseguire una logica specifica
    console.log("PIN inviato:", this.pin);
    // Resetta il PIN dopo l'invio

    this.sendMessage();
    if (this.pin === this.generatedPin) {
      console.log('PIN corretto!');
      this.webSocketService.setAuthenticated(true); // Imposta lo stato di autenticazione a true
    } else {
      console.log('PIN errato!');
    }
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

