import { Injectable } from '@angular/core';
import { Organizer } from './organizer';
import { firebaseConfig } from './../../../environments/firebase.config';
import firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { DataBaseHelper } from '../../helper/database.helper';

@Injectable()
export class OrganizerService {
  private basePath: string = firebaseConfig.devfestYear + '/organizers';
  private organizers: AngularFireList<Organizer> = null;
  private organizer: AngularFireObject<Organizer> = null;
  private firebaseStorage: any;

  constructor(private db: AngularFireDatabase) {
    this.firebaseStorage = firebase.storage();
  }

  getOrganizerList(): Observable<Organizer[]> {
    this.organizers = this.db.list(this.basePath, ref => ref.orderByChild('name'));
    return DataBaseHelper.getDataBaseList<Organizer>(this.organizers);
  }

  getOrganizer(key: string): Observable<Organizer> {
    const path = `${this.basePath}/${key}`;
    this.organizer = this.db.object(path);
    return DataBaseHelper.getDataBaseObject<Organizer>(this.organizer);
  }

  createOrganizer(organizer: Organizer, file?: File): void {
    const key = this.db.list(this.basePath).push(organizer).key;
    if (file !== undefined && file !== null) {
      this.firebaseStorage.ref(this.basePath + `/${key}`).put(file)
        .then(snapshot => snapshot.ref.getDownloadURL()
          .then(downloadUrl => {
            organizer.photoURL = downloadUrl;
            this.db.object(this.basePath + `/${key}`).set(organizer);
          })
        );
    } else {
      this.db.object(this.basePath + `/${key}`).set(organizer);
    }
  }

  updateOrganizer(organizer: Organizer, file?: File): void {
    if (file !== undefined && file !== null) {
      this.firebaseStorage.ref(this.basePath + `/${organizer.id}`).put(file)
        .then(snapshot => snapshot.ref.getDownloadURL()
          .then(downloadUrl => {
            organizer.photoURL = downloadUrl;
            this.db.object(this.basePath + `/${organizer.id}`).update(organizer);
          })
        );
    } else {
      this.db.object(this.basePath + `/${organizer.id}`).update(organizer);
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
