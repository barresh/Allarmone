import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { webSocket, WebSocketSubject } from "rxjs/webSocket";

@Injectable({
  providedIn: "root",
})
export class WebSocketService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    this.socket$ = webSocket("ws://localhost:8080"); // Sostituisci con l'URL del tuo server
  }

  sendMessage(message: any) {
    this.socket$.next(message);
  }

  getMessages(): Observable<any> {
    return this.socket$.asObservable();
  }
}
