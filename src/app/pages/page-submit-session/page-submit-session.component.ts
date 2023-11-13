import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';
import { MediaService } from 'src/app/services/media.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-page-submit-session',
  templateUrl: './page-submit-session.component.html',
  styleUrls: ['./page-submit-session.component.css'],
})
export class PageSubmitSessionComponent implements OnInit {
  uploadForm: FormGroup;
  audioMediaId!: number;
  currentUser = +localStorage.getItem('user_id')!;
  categories: Category[] = []

  constructor(
    private fb: FormBuilder,
    private sessionService: SessionService,
    private mediaService: MediaService,
    private router: Router,
    private categoryService: CategoryService
  ) {
    this.uploadForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      duration: ['00:00:00', Validators.required],
      category_id: ['', Validators.required],
      media_id: [null, Validators.required],
    });
  }
  ngOnInit(): void {
    this.loadCategories();
    
  }

  loadCategories() {
    this.categoryService.getCategory().subscribe((data) => {
      this.categories = data;
    });
  }
  onSubmit() {
    console.log('FORMULAIRE ENVOYER', this.uploadForm.value);
    if (this.uploadForm.valid) {
      const sessionData = {
        title: this.uploadForm.get('title')?.value,
        description: this.uploadForm.get('description')?.value,
        duration: this.uploadForm.get('duration')?.value,
        category_id: Number(this.uploadForm.get('category_id')?.value), // Convertir en nombre
        user_id: this.currentUser,
        media_id: this.audioMediaId,
      };
      console.log('user_id', this.currentUser);
      console.log('DATA ENVOYER AU BACKEND  : ', sessionData);
      // Envoi des données à l'API
      this.sessionService.addSession(sessionData).subscribe({
        next: (response: any) => {
          // réponse du backend ici (par exemple, une redirection ou un message de succès)
          console.log('Réponse du backend :', response);
          console.log('this.currentUser:', this.currentUser);
          console.log('this.audioMediaId:', this.audioMediaId);
          this.router.navigate(['/admin']);
        },
        error: (error: any) => {
          console.error('Erreur lors de l’ajout de la méditation:', error);
        },
      });
    } else {
      console.error(
        'Formulaire invalide. Assurez-vous de remplir tous les champs requis et d’uploader les médias.'
      );
    }
  }

  onAudioSelected(event: any) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('monFichier', file);

    this.mediaService.postMedia(formData).subscribe({
      next: (response: any) => {
        console.log("Réponse du serveur après l'upload:", response);
        if (response && response.media_id) {
          console.log('Audio enregistré avec succès. ID:', response.media_id);
          this.audioMediaId = response.media_id;
          // alert('Média audio enregistré avec succès');
        }
      },
      error: (error) => {
        console.error('Erreur lors de upload du média audio :', error);
        // alert('Erreur lors de lenregistrement du média audio');
      },
    });
  }
}
