import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-page-subscribe',
  templateUrl: './page-subscribe.component.html',
  styleUrls: ['./page-subscribe.component.css'],
})
export class PageSubscribeComponent {
  subscribeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.subscribeForm = this.formBuilder.group(
      {
        inputLastName: ['', Validators.required],
        inputFirstName: ['', Validators.required],
        inputEmail: ['', [Validators.required, Validators.email]],
        inputPassword: ['', [Validators.required, this.strongPasswordValidator ]],
        inputConfirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(formGroup: FormGroup): { [key: string]: any } | null {
    const password = formGroup.get('inputPassword')?.value;
    const confirmPassword = formGroup.get('inputConfirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
  strongPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const strongRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
    );
    return strongRegex.test(control.value) ? null : { weakPassword: true };
  }
  onSubmit(): void {
    if (this.subscribeForm.valid) {
      const formData = this.subscribeForm.value;

      //creation un objet User avec les propriétés requises
      const newUser: User = {
        first_name: formData.inputFirstName,
        last_name: formData.inputLastName,
        email: formData.inputEmail,
        password: formData.inputPassword,
      };

      console.log('New User = ', newUser);

      this.userService.subscribe(newUser).subscribe(
        (response) => {
          console.log('Réponse du serveur:', response);
          console.log('Inscription réussie');

          this.subscribeForm.reset();

          //   modal de succès
          const modalElement = document.getElementById('subscribeModal');
          const modalInstance = new Modal(modalElement!);
          modalInstance.show();
        },
        (error) => {
          console.error('Erreur lors de l’inscription:', error);
        }
      );
    } else {
      console.error('Formulaire invalide.');
    }
  }
}
