import { DomSanitizer } from '@angular/platform-browser';
import { CaptchaService } from './../../../Services/captcha.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.scss']
})
export class CaptchaComponent implements OnInit {
  @Output() success: EventEmitter<void>;
  private showModal: boolean;
  private key: string;
  private foto: string;
  private error: boolean;

  constructor(private captchaService: CaptchaService, private domSanitizer: DomSanitizer) {
    this.foto = '';
    this.success = new EventEmitter<void>();
  }

  ngOnInit() {
  }

  cargarCaptcha() {
    this.captchaService.GetCaptcha().subscribe( response => {
      this.key = response.key;
      this.foto = response.foto;
      this.showModal = true;
    });
  }

  private submit(color: string) {
    this.captchaService.PostCaptcha(this.key, color).then( response => {
      console.log(response);
      if (response.Estado === 'OK') {
        this.error = false;
        this.success.emit();
        this.cerrar();
      } else {
        this.error = true;
        this.cargarCaptcha();
      }
    },
    error => {
      this.error = true;
      this.cargarCaptcha();
    });
  }

  private cerrar() {
    this.error = false;
    this.showModal = false;
  }
}
