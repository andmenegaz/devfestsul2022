import { Level } from './level';
import { firebaseConfig } from './../../../environments/firebase.config';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable()
export class LevelService {
  private basePath: string = firebaseConfig.devfestYear + '/levels';
  levels: AngularFireList<Level> = null;

  constructor(private db: AngularFireDatabase) { }

  getLevelList(): Observable<Level[]> {
    this.levels = this.db.list(this.basePath, ref => ref.orderByChild('rank'));
    return this.levels.valueChanges();
  }

  createLevel(level: Level): void {
    this.db.list(this.basePath).push(level);
  }

  deleteLevel(key: string): void {
    this.db.list(this.basePath).remove(key);
  }

}
