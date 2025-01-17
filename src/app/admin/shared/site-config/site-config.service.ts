import { AuthService } from './../../../services/auth/auth.service';
import { SiteConfig } from './site-config';
import { AngularFireDatabase } from '@angular/fire/database';
import { firebaseConfig } from './../../../../environments/firebase.config';
import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/storage';
import { Observable } from 'rxjs';

@Injectable()
export class SiteConfigService {
  private basePath: string = firebaseConfig.devfestYear + '/siteConfig';
  private firebaseStorage: any;
  public siteConfig: SiteConfig = null;

  constructor(private db: AngularFireDatabase, private authService: AuthService) {
    this.firebaseStorage = firebase.storage();
  }

  getConfig() {
    this.db.object<SiteConfig>(this.basePath).valueChanges().subscribe(config => this.siteConfig = config);
  }

  createConfig(siteConfig: SiteConfig, file?: File): void {
    if (file !== undefined && file !== null) {
      this.firebaseStorage.ref(this.basePath + '/venuePhoto').put(file)
        .then(snapshot => snapshot.ref.getDownloadURL()
          .then(downloadUrl => {
            siteConfig.venuePhoto = downloadUrl;
            this.db.object(this.basePath).set({
              groupName: siteConfig.groupName,
              groupWebsite: siteConfig.groupWebsite,

              googleLink: siteConfig.googleLink ? siteConfig.googleLink : null,
              facebookLink: siteConfig.facebookLink ? siteConfig.facebookLink : null,
              twitterLink: siteConfig.twitterLink ? siteConfig.twitterLink : null,
              meetupLink: siteConfig.meetupLink ? siteConfig.meetupLink : null,
              githubLink: siteConfig.githubLink ? siteConfig.githubLink : null,

              eventType: siteConfig.eventType ? siteConfig.eventType : 'DevFest',
              eventName: siteConfig.eventName,
              eventDescription: siteConfig.eventDescription ? siteConfig.eventDescription : null,
              eventDate: siteConfig.eventDate,
              eventEmail: siteConfig.eventEmail,
              eventLink: siteConfig.eventLink,
              eventAnonReport: siteConfig.eventAnonReport,
              eventReportEmail: siteConfig.eventReportEmail,
              eventTwitter: siteConfig.eventTwitter ? siteConfig.eventTwitter : null,
              eventHashtag: siteConfig.eventHashtag ? siteConfig.eventHashtag : null,
              speakerURL: siteConfig.speakerURL ? siteConfig.speakerURL : null,
              organizerURL: siteConfig.organizerURL ? siteConfig.organizerURL : null,
              ticketURL: siteConfig.ticketURL ? siteConfig.ticketURL : null,
              sponsorURL: siteConfig.sponsorURL ? siteConfig.sponsorURL : null,

              venueName: siteConfig.venueName ? siteConfig.venueName : null,
              venueAddress: siteConfig.venueAddress ? siteConfig.venueAddress : null,
              venueGeoData: siteConfig.venueGeoData ? siteConfig.venueGeoData : null,
              venueDescription: siteConfig.venueDescription ? siteConfig.venueDescription : null
            });
          })
        );
      } else {
        this.db.object(this.basePath).set({
          groupName: siteConfig.groupName,
          groupWebsite: siteConfig.groupWebsite,

          googleLink: siteConfig.googleLink ? siteConfig.googleLink : null,
          facebookLink: siteConfig.facebookLink ? siteConfig.facebookLink : null,
          twitterLink: siteConfig.twitterLink ? siteConfig.twitterLink : null,
          instagramLink: siteConfig.instagramLink ? siteConfig.instagramLink : null,
          meetupLink: siteConfig.meetupLink ? siteConfig.meetupLink : null,
          githubLink: siteConfig.githubLink ? siteConfig.githubLink : null,

          eventType: siteConfig.eventType ? siteConfig.eventType : 'DevFest',
          eventName: siteConfig.eventName,
          eventDescription: siteConfig.eventDescription ? siteConfig.eventDescription : null,
          eventDate: siteConfig.eventDate,
          eventEmail: siteConfig.eventEmail,
          eventLink: siteConfig.eventLink,
          eventAnonReport: siteConfig.eventAnonReport,
          eventReportEmail: siteConfig.eventReportEmail,
          eventGoogle: siteConfig.eventGoogle ? siteConfig.eventGoogle : null,
          eventFacebook: siteConfig.eventFacebook ? siteConfig.eventFacebook : null,
          eventTwitter: siteConfig.eventTwitter ? siteConfig.eventTwitter : null,
          eventInstagram: siteConfig.eventInstagram ? siteConfig.eventInstagram : null,
          eventHashtag: siteConfig.eventHashtag ? siteConfig.eventHashtag : null,
          speakerURL: siteConfig.speakerURL ? siteConfig.speakerURL : null,
          organizerURL: siteConfig.organizerURL ? siteConfig.organizerURL : null,
          ticketURL: siteConfig.ticketURL ? siteConfig.ticketURL : null,
          sponsorURL: siteConfig.sponsorURL ? siteConfig.sponsorURL : null,

          venueName: siteConfig.venueName ? siteConfig.venueName : null,
          venueAddress: siteConfig.venueAddress ? siteConfig.venueAddress : null,
          venueGeoData: siteConfig.venueGeoData ? siteConfig.venueGeoData : null,
          venueDescription: siteConfig.venueDescription ? siteConfig.venueDescription : null
        });
    }
  }

  updateConfig(siteConfig: SiteConfig, file?: File): void {
    if (file !== undefined && file !== null) {
      this.firebaseStorage.ref(this.basePath + '/venuePhoto').put(file)
        .then(snapshot => snapshot.ref.getDownloadURL()
          .then(downloadUrl => {
            siteConfig.venuePhoto = downloadUrl;
            this.db.object(this.basePath).update(siteConfig);
          })
        );
    } else {
      this.db.object(this.basePath).update(siteConfig);
    }
  }

}
