import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {PaymentModalComponent} from "../payment-modal/payment-modal.component";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  displayPaymentModal(){
    this.dialog.open(PaymentModalComponent)
  }

}
