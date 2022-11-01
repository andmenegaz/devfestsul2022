import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { OrganizerService } from './../shared/organizer.service';
import { Organizer } from './../shared/organizer';
import { AngularFireList} from '@angular/fire/database';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-organizer-list',
  templateUrl: './organizer-list.component.html',
  styleUrls: ['./organizer-list.component.scss']
})
export class OrganizerListComponent implements OnInit {
  @ViewChild('organizerModal') public organizerModal: ModalDirective;

  public organizers: AngularFireList<Organizer>;
  public organizerDetail: any;

  constructor(
    private organizerService: OrganizerService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.organizers = this.organizerService.getOrganizerList();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  deleteOrganizer(organizer) {
    if (window.confirm('Are you sure you want to delete this organizer?')) {
      this.organizerService.deleteOrganizer(organizer.$key);
    }
  }

  showModal(organizer) {
    this.organizerDetail = {
      name: organizer.name,
      title: organizer.title,
      company: organizer.company,
      description: organizer.description,
      googleLink: organizer.googleLink,
      facebookLink: organizer.facebookLink,
      twitterLink: organizer.twitterLink,
      linkedinLink: organizer.linkedinLink,
      githubLink: organizer.githubLink,
      websiteLink: organizer.websiteLink
    };
    this.organizerModal.show();
  }

}
