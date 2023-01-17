import { Component, Injectable, Input } from "@angular/core";

@Component({
    selector: 'app-login-error',
    template: `
            <div class="container">
                <span class="message">{{error}}</span>
            </div>
            `,
    styleUrls: ['./login-error.component.scss']
})

export class LoginErrorComponent{
    @Input()
    error: String | null = null;
}