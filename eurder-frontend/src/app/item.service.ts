import {Injectable} from '@angular/core';
import {Item} from './item';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {CreateItem} from "./createItem";

@Injectable({
  providedIn: 'root'
})

export class ItemService {
  private itemsUrl = 'http://localhost:8090/api/items';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private messageService: MessageService,
              private http: HttpClient) {
  }

  private log(message: string) {
    this.messageService.add(`ItemService: ${message}`);
  }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemsUrl).pipe(
      tap(_ => this.log('fetched items')),
      catchError(this.handleError<Item[]>('getItems', []))
    );
  }

  getItem(id: number): Observable<Item> {
    const url = `${this.itemsUrl}/${id}`;
    return this.http.get<Item>(url).pipe(
      tap(_ => this.log(`fetched item with id ${id}`)),
      catchError(this.handleError<Item>(`getItem with id ${id}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  updateItem(item: Item): Observable<any> {
    return this.http.put(this.itemsUrl, item, this.httpOptions).pipe(
      tap(_ => this.log(`updated item with id ${item.id}`)),
      catchError(this.handleError<any>('updateItem'))
    );
  }

  addItem(createItem: CreateItem): Observable<Item> {
    return this.http.post<Item>(this.itemsUrl, createItem, this.httpOptions).pipe(
      tap((newItem: Item) => this.log(`added item w/ id ${newItem.id}`)),
      catchError(this.handleError<Item>('addItem'))
    );

  }
}
