import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  initiatePayment(){
    return this.http.post<{externalPaymentUrl:string, id:number}>("https://localhost:3000/checkout", null)
  }

  checkPayment(id:number){
    return this.http.get<{status:string}>("https://localhost:3000/check-payment/status",{params:{id}})
  }
}
