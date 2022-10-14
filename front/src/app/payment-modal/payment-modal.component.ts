import { Component, OnInit } from '@angular/core';
import {PaymentService} from "../services/payment.service";
import {combineLatest, interval, map, skipUntil, skipWhile, takeWhile, tap, timer} from "rxjs";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

enum Status {
  INTIATING,
  PAYMENT,
  CHECK,
  CONFIRMED
}

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss']
})
export class PaymentModalComponent implements OnInit {

  status = Status.INTIATING
  externalPaymentUrl?: SafeUrl;
  private paymentId?: number;
  Status = Status;

  constructor(private paymentService: PaymentService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.initiatePayment()
    window.addEventListener('message', this.handleStancerModalEvents,false);
  }

  initiatePayment(){
    combineLatest([ this.paymentService.initiatePayment(), timer(1500)])
   .pipe(tap(([payment,_])=>{

      this.externalPaymentUrl = this.sanitizer.bypassSecurityTrustResourceUrl(payment.externalPaymentUrl)
      console.log(this.externalPaymentUrl)
      this.paymentId = payment.id
      this.status = Status.PAYMENT
    })).subscribe()
  }

  handleStancerModalEvents(event: any){
    if (event.origin !== 'https://payment.stancer.com') {
      return;
    }

    if(event.status !== "finished"){
      return
    }

    this.status = Status.CHECK

    if(this.paymentId != null){
      this.paymentService.checkPayment(this.paymentId).pipe(tap(
        payment => {this.checkPaymentStatus(payment)}
      )).subscribe()
    }
  }

  checkPaymentStatus(payment: { status:string}){
    if (payment.status == "ACCEPTED"){
      this.status = Status.CONFIRMED
    }
  }
}
