import { ReCaptcha2Component } from 'ngx-captcha';
import { Output, ViewChild, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
export abstract class Registro {
    @Output() registradoCorrectamente: EventEmitter<any>;
    @ViewChild('captchaElem') captcha: ReCaptcha2Component;
    public form: FormGroup;
    public key: string;
    public errorMessage: string;
    public error: boolean;
    public success: boolean;

    /**
     *
     */
    constructor() {
        this.registradoCorrectamente = new EventEmitter<any>();
        this.key = '6LfzTncUAAAAAP99rAI6EFfbz4caukxBFAzPUAB_';
    }

    public abstract Submit();
}
