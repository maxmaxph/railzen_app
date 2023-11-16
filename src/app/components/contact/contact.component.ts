import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as emailjs from '@emailjs/browser';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  sendEmail(e: Event) {
    e.preventDefault();

    const templateParams = {
      subject: (document.getElementById('subject') as HTMLInputElement).value,
      email: (document.getElementById('email') as HTMLInputElement).value,
      message: (document.getElementById('message') as HTMLInputElement).value,
    };
    console.log(templateParams);

    emailjs
      .send(
        'service_c1cmzix',
        'template_o4ir9in',
        templateParams,
        'Wrt2lfglqAF60zDIF'
      )
      .then(
        (response) => {
          console.log('Email sent successfully:', response);
        },
        (error) => {
          console.log('Error sending email:', error);
        }
      );
  }
}
