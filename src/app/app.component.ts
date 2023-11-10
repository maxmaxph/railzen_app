import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'railzen_app';
constructor(private userService:UserService){}
  ngOnInit(): void {
    initFlowbite();
this.userService.initializeUserState()
  }
}
