import { firebaseConfig } from './../../../environments/firebase.config';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable()
export class ScheduleService {
  schedules: AngularFireList<any> = null;

  constructor(private db: AngularFireDatabase) { }

  getScheduleList(uid: string, year?: string|number) {
    if (!year) {
        year = firebaseConfig.devfestYear;
    }
    const path = `${year}/schedules/${uid}/`;
    return this.db.list(path);
  }

  getScheduleSession(uid, session, year?: string|number) {
    if (!year) {
        year = firebaseConfig.devfestYear;
    }
    const path = `${year}/schedules/${uid}/${session}/`;
    return this.db.object(path);
  }

}
