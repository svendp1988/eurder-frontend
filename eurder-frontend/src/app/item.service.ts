import {Injectable} from '@angular/core';
import {Item} from './item';
import {ITEMS} from './mock-items';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private itemsUrl = 'http://localhost:8080/api/items';

  constructor(private messageService: MessageService,
              private http: HttpClient) {
  }

  private log(message: string) {
    this.messageService.add(`ItemService: ${message}`);
  }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemsUrl);
  }

  getItem(id: number): Observable<Item> {
    this.messageService.add(`ItemService: fetched item with id ${id}`);
    return this.http.get<Item>(`${this.itemsUrl}/${id}`);
  }
}
