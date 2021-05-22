import { Injectable } from '@angular/core';
import { Organizer } from './organizer';
import { firebaseConfig } from './../../../environments/firebase.config';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import 'firebase/storage';

@Injectable()
export class OrganizerService {
  private basePath: string = firebaseConfig.devfestYear + '/organizers';
  private organizers: FirebaseListObservable<Organizer[]> = null;
  private speaker: FirebaseObjectObservable<Organizer> = null;
  private firebaseStorage: any;

  constructor(private db: AngularFireDatabase) {
    this.firebaseStorage = firebase.storage();
  }

  getOrganizerList(query?: object): FirebaseListObservable<Organizer[]> {
    this.organizers = this.db.list(this.basePath, {
      query: query
    });
    return this.organizers;
  }

  getOrganizer(key: string): FirebaseObjectObservable<Organizer> {
    const path = `${this.basePath}/${key}`;
    this.speaker = this.db.object(path);
    return this.speaker;
  }

  getOrganizerName(key: string): any {
    const path = `${this.basePath}/${key}/name`;
    let speakerName: string;
    this.db.object(path).subscribe(snapshot => {
      speakerName = snapshot.$value;
    });
    return speakerName;
  }

  createOrganizer(speaker: Organizer, file?: File): void {
    const key = this.db.list(this.basePath).push(speaker).key;
    if (file !== undefined && file !== null) {
      this.firebaseStorage.ref(this.basePath + `/${key}`).put(file)
        .then(snapshot => {
          speaker.photoURL = snapshot.downloadURL;
          this.db.object(this.basePath + `/${key}`).set(speaker);
        });
    } else {
      this.db.object(this.basePath + `/${key}`).set(speaker);
    }
  }

  updateOrganizer(speaker: Organizer, file?: File): void {
    if (file !== undefined && file !== null) {
      this.firebaseStorage.ref(this.basePath + `/${speaker.$key}`).put(file)
        .then(snapshot => {
          speaker.photoURL = snapshot.downloadURL;
          this.db.object(this.basePath + `/${speaker.$key}`).update(speaker);
        });
    } else {
      this.db.object(this.basePath + `/${speaker.$key}`).update(speaker);
    }
  }

  deleteOrganizer(key: string): void {
    this.organizers.remove(key)
      .then(onResolve => {
        this.firebaseStorage.ref(this.basePath + `/${key}`).delete();
      })
      .catch(error => this.handleError(error));
  }

  private handleError(error) {
    console.error(error);
  }

}
