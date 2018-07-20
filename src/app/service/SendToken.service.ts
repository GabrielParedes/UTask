import { HttpClient, HttpHeaders } from "@angular/common/http";

export class SendToken {
  enviarToke(): HttpHeaders {
    let headers1 = new HttpHeaders({
      Authorization: localStorage.getItem("token")
    });
    return headers1;
  }
}
