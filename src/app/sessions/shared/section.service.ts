import { Section } from './section';
import { Injectable } from '@angular/core';
import { firebaseConfig } from './../../../environments/firebase.config';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable()
export class SectionService {
  sections: AngularFireList<Section> = null;

  constructor(private db: AngularFireDatabase) { }

  getSectionList(query?: object, year?: string|number): AngularFireList<Section> {
    this.listPath().valueChanges().subscribe(resp => this.sections = <AngularFireList<Section>><unknown>resp);
    return this.sections;
  }

  createSection(section: Section): void {
    const list = this.listPath();
    list.push(section);
  }

  deleteSection(key: string): void {
    const list = this.listPath();
    list.remove(key);
  }

  private listPath() {
    return this.db.list(`${firebaseConfig.devfestYear}/sections`, ref => ref);
  }

}
