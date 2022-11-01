import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { OrganizerService } from './../shared/organizer.service';
import { Organizer } from './../shared/organizer';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organizer-edit',
  templateUrl: './organizer-edit.component.html',
  styleUrls: ['./organizer-edit.component.scss']
})
export class OrganizerEditComponent implements OnInit {
  organizer: Organizer = new Organizer();
  activeKey: string;

  constructor(
    private organizerService: OrganizerService,
    private authService: AuthService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRouter.params.subscribe((params) => {
      this.activeKey = params['id'];
      this.organizerService.getOrganizer(this.activeKey).subscribe(organizer => {
        this.organizer = organizer;
      });
    });
  }

  updateOrganizer() {
    let photo: File;
    for (const selectedFile of [(<HTMLInputElement>document.getElementById('photoURL')).files[0]]) {
      photo = selectedFile;
    }
    this.organizerService.updateOrganizer(this.organizer, photo);
    this.organizer = new Organizer();
    this.router.navigate(['/organizers']);
  }

}
