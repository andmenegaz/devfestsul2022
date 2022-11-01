import { Survey } from './survey';
import { Session } from './session';
import { firebaseConfig } from './../../../environments/firebase.config';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable()
export class SessionService {
  private basePath: string = firebaseConfig.devfestYear + '/sessions';
  sessions: AngularFireList<Session> = null;
  session: AngularFireObject<Session> = null;

  constructor(private db: AngularFireDatabase) { }

  getSessionList(): Observable<Session[]> {
    this.sessions = this.db.list(this.basePath, ref => ref);
    return this.sessions.valueChanges();
  }

  getSession(key: string): Observable<Session> {
    this.session = this.db.object(`${this.basePath}/${key}`);
    return this.session.valueChanges();
  }

  createSession(session: Session): void {
    this.sessions.push(session);
  }

  updateSession(key: string, value: any): void {
    this.sessions.update(key, value);
  }

  deleteSession(key: string): void {
    this.sessions.remove(key);
  }

  saveSurvey(key: string, survey: Survey): void {
    const path = `${this.basePath}/${key}/surveys`;
    const surveys = this.db.list(path);
    surveys.push(survey);
  }

}
