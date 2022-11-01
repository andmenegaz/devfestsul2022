import { Router } from '@angular/router';
import { SiteConfigService } from './../shared/site-config/site-config.service';
import { SiteConfig } from './../shared/site-config/site-config';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-site-config',
  templateUrl: './site-config.component.html',
  styleUrls: ['./site-config.component.scss']
})
export class SiteConfigComponent implements OnInit {
  siteConfig: SiteConfig = new SiteConfig();
  addConfig: boolean = true;

  constructor(
    private siteConfigService: SiteConfigService,
    private router: Router
  ) { }

  ngOnInit() {
    this.siteConfigService.getConfig().subscribe(config => {
      this.siteConfig = config;
      if (config.groupName) {
        this.addConfig = false;
      }
    });
  }

  createConfig() {
    let photo: File;
    for (const selectedFile of [(<HTMLInputElement>document.getElementById('venuePhoto')).files[0]]) {
      photo = selectedFile;
    }

    if (
      this.siteConfig.groupName && this.siteConfig.groupWebsite
      && this.siteConfig.eventName && this.siteConfig.eventDate
      && this.siteConfig.eventEmail && this.siteConfig.eventLink
      && this.siteConfig.eventAnonReport && this.siteConfig.eventReportEmail
      && this.siteConfig.ticketURL
    ) {
      this.siteConfigService.createConfig(this.siteConfig, photo);

      this.siteConfig = new SiteConfig();
      this.router.navigate(['/']);
    } else {
      alert('Please fill out the required fields.');
    }
  }

  updateConfig() {
    let photo: File;
    for (const selectedFile of [(<HTMLInputElement>document.getElementById('venuePhoto')).files[0]]) {
      photo = selectedFile;
    }

    if (
      this.siteConfig.groupName && this.siteConfig.groupWebsite
      && this.siteConfig.eventName && this.siteConfig.eventDate
      && this.siteConfig.eventEmail && this.siteConfig.eventLink
      && this.siteConfig.eventAnonReport && this.siteConfig.eventReportEmail
      && this.siteConfig.ticketURL
    ) {
      this.siteConfigService.updateConfig(this.siteConfig, photo);

      this.siteConfig = new SiteConfig();
      this.router.navigate(['/']);
    } else {
      alert('Please fill out all the required fields.');
    }
  }

}
