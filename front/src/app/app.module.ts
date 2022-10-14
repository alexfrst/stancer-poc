import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaymentModalComponent } from './payment-modal/payment-modal.component';
import { ItemComponent } from './item/item.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    PaymentModalComponent,
    ItemComponent,
  ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      NoopAnimationsModule,
      MatProgressSpinnerModule,
      MatDialogModule,
      HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
