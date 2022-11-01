import { firebaseConfig } from './../../../environments/firebase.config';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable()
export class ScheduleService {
  schedules: AngularFireList<any> = null;
  sessionSchedule: AngularFireObject<any> = null;

  constructor(private db: AngularFireDatabase) { }

  getScheduleList(uid: string, year?: string|number) {
    if (!year) {
        year = firebaseConfig.devfestYear;
    }
    
    this.schedules = this.db.list(`${year}/schedules/${uid}/`)
    return this.schedules.valueChanges();
  }

  getScheduleSession(uid, session, year?: string|number) {
    if (!year) {
        year = firebaseConfig.devfestYear;
    }
    this.sessionSchedule = this.db.object(`${year}/schedules/${uid}/${session}/`)
    return this.sessionSchedule.valueChanges();
  }

  removeFromSchedule() {
    this.sessionSchedule.remove();
  }
  
  setSchedule(schedule: any) {
    this.sessionSchedule.set(schedule);
  }
}
