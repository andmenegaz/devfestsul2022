import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { OrganizerService } from './../shared/organizer.service';
import { Organizer } from './../shared/organizer';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organizer-new',
  templateUrl: './organizer-new.component.html',
  styleUrls: ['./organizer-new.component.scss']
})
export class OrganizerNewComponent implements OnInit {
  organizer: Organizer = new Organizer();

  constructor(
    private organizerService: OrganizerService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() { }

  addOrganizer() {
    let photo: File;
    for (const selectedFile of [(<HTMLInputElement>document.getElementById('photo')).files[0]]) {
      photo = selectedFile;
    }
    this.organizerService.createOrganizer(this.organizer, photo);
    this.organizer = new Organizer();
    this.router.navigate(['/organizers']);
  }

}
