import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as emailjs from '@emailjs/browser';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  showErrorModal: boolean = false;
  errorMessage: string = '';
  emailRequired: boolean = false;
  emailInvalid: boolean = false;
  subjectRequired: boolean = false;
  messageRequired: boolean = false;
  email: string = '';
  subject: string = '';
  message: string = '';
  num1: number | undefined;
  num2: number | undefined;
  userAnswer: number | undefined;
  correctAnswer: number | undefined;
  showSubmitButton: boolean = false;
  modalTitle: string = 'Erreur';

  constructor() {
    this.generateRandomQuestion();
  }

  generateRandomQuestion() {
    this.num1 = Math.floor(Math.random() * 10); // nombre aléatoire entre 0 et 9
    this.num2 = Math.floor(Math.random() * 10); // nombre aléatoire entre 0 et 9
    this.correctAnswer = this.num1 + this.num2;
    this.showSubmitButton = false;
  }

  checkAnswer() {
    this.showSubmitButton = this.userAnswer === this.correctAnswer;
  }
  validateEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailInvalid = !regex.test(this.email);
  }
  //emailJs
  sendEmail(e: Event) {
    e.preventDefault();

    if (!this.email.trim() || !this.subject.trim() || !this.message.trim()) {
      this.showError('Tous les champs sont requis');
    } else {
      // Logique pour envoyer l'email
      emailjs
        .send(
          'service_c1cmzix',
          'template_o4ir9in',
          { subject: this.subject, email: this.email, message: this.message },
          'Wrt2lfglqAF60zDIF'
        )
        .then(
          (response) => {
            console.log('Email sent successfully:', response);
            this.showSuccess('Message envoyé avec succès');
            this.resetForm();
          },
          (error) => {
            console.log('Error sending email:', error);
            this.showError("Erreur lors de l'envoi du message");
            this.showError(
              "erreur lors de l'envoi du message veuillez reessayer"
            );
          }
        );
    }
  }
  showError(message: string) {
    this.modalTitle = 'Erreur';
    this.errorMessage = message;
    this.showErrorModal = true;
  }

  showSuccess(message: string) {
    this.modalTitle = 'Succès';
    this.errorMessage = message;
    this.showErrorModal = true;
  }

  closeErrorModal() {
    this.showErrorModal = false;
  }
  // Méthode pour réinitialiser le formulaire
  resetForm() {
    this.email = '';
    this.subject = '';
    this.message = '';
    this.userAnswer = undefined;
    this.generateRandomQuestion();
    this.showSubmitButton = false;
  }
}
