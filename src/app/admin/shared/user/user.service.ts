import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  private basePath = '/userProfile';
  users: AngularFireList<any> = null;

  constructor(private db: AngularFireDatabase) { }

  getUserList(): Observable<any[]> {
    this.users = this.db.list(this.basePath);
    return this.users.valueChanges();
  }

  getUserQuery(offset, startKey?): Observable<any[]> {
    this.users = this.db.list(this.basePath, ref => ref.orderByKey().startAt(startKey).limitToFirst(offset +1));
    return this.users.valueChanges();
  }

  isAdmin(key: string) {
    let isAdmin: boolean;
    const user = this.db.object<boolean>(`/admins/${key}`).valueChanges()
    user.subscribe(snapshot => {
      isAdmin = snapshot;
    });
    return isAdmin;
  }

  toggleAdmin(key: string): void {
    const tempAdmin: boolean = this.isAdmin(key) || false;
    if (tempAdmin) {
      this.db.object(`/admins/${key}`).remove();
    } else {
      this.db.object(`/admins/${key}`).set(true);
    }
  }

}
