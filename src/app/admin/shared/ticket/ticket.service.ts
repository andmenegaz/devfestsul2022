import { Ticket } from './ticket';
import { firebaseConfig } from './../../../../environments/firebase.config';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable()
export class TicketService {
  private basePath: string = firebaseConfig.devfestYear + '/tickets';
  private tickets: AngularFireList<Ticket> = null;
  private ticket: AngularFireObject<Ticket> = null;

  constructor(private db: AngularFireDatabase) { }

  getTicketList(): Observable<Ticket[]> {
    this.tickets = this.db.list(this.basePath, ref => ref);
    return this.tickets.valueChanges();
  }

  getTicket(key: string): Observable<Ticket> {
    const path = `${this.basePath}/${key}`;
    this.ticket = this.db.object(path);
    return this.ticket.valueChanges();
  }

  createTicket(ticket: Ticket): void {
    this.tickets.push(ticket);
  }

  updateTicket(key: string, value: any): void {
    this.tickets.update(key, value);
  }

  deleteTicket(key: string): void {
    this.tickets.remove(key);
  }

}
