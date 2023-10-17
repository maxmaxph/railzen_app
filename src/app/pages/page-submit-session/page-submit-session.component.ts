import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SessionService } from 'src/app/session.service';
import { Session } from 'src/app/interfaces/session'; // Importez l'interface Session depuis le chemin correct

@Component({
  selector: 'app-page-submit-session',
  templateUrl: './page-submit-session.component.html',
  styleUrls: ['./page-submit-session.component.css'],
})
export class PageSubmitSessionComponent {
  uploadForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private sessionService: SessionService
  ) {
    // Créez un formulaire réactif avec les champs nécessaires
    this.uploadForm = this.formBuilder.group({
      title: '', // Titre de la session
      description: '', // Description de la session
      duration: '', // Durée de la session
      category_id: '', // ID de la catégorie de la session
      sound_file: null, // Fichier sonore de la session (initialement vide)
    });
  }

  // Gérez le changement de fichier lors de la sélection d'un fichier
  onFileChange(event: any) {
    const file = event.target.files[0];
    const soundFileControl = this.uploadForm.get('sound_file');

    if (soundFileControl) {
      soundFileControl.setValue(file);
    }
  }

  // Soumettez le formulaire pour créer une nouvelle session
  onSubmit() {
    const soundFileControl = this.uploadForm.get('sound_file');
    if (soundFileControl) {
      const formData = new FormData();
      formData.append('title', this.uploadForm.get('title')!.value);
      formData.append('description', this.uploadForm.get('description')!.value);
      formData.append('duration', this.uploadForm.get('duration')!.value);
      formData.append('category_id', this.uploadForm.get('category_id')!.value);
      formData.append('sound_file', soundFileControl.value);

      // Utilisez le service SessionService pour envoyer la requête POST
      this.sessionService.createSession(formData).subscribe(
        (response: Session) => {
          console.log('Session uploaded successfully!', response);
          // Réinitialisez le formulaire ou effectuez d'autres actions nécessaires
          this.uploadForm.reset();
        },
        (error) => {
          console.error('Error uploading session', error);
        }
      );
    }
  }
}
