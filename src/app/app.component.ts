import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Comanda';
  showSpinner: boolean;
  /**
   *
   */
  constructor(private spinner: NgxSpinnerService) {
    this.showSpinner = false;
    this.spinner.spinnerObservable.subscribe( x => {
        this.showSpinner = x;
    });
  }
}
