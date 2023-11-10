import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    this.subscribeForm = this.formBuilder.group({
      inputLastName: ['', Validators.required],
      inputFirstName: ['', Validators.required],
      inputEmail: ['', Validators.required],
      inputPassword: ['', Validators.required],
      inputConfirmPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

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
