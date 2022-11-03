import firebase from 'firebase/app';

export class Organizer {
  id: string;
  name: string;
  title: string;
  company: string;
  description: string;
  photoURL: string;
  googleLink: string;
  facebookLink: string;
  twitterLink: string;
  linkedinLink: string;
  githubLink: string;
  websiteLink: string;
  featured: boolean = false;
  timeStamp: any = firebase.database.ServerValue.TIMESTAMP;
  active: boolean = true;
}
