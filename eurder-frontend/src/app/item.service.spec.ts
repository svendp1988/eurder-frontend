import { TestBed } from '@angular/core/testing';

import { ItemService } from './item.service';
import {Observable} from "rxjs";
import {Item} from "./item";
import {inject} from "@angular/core";

describe('ItemService', () => {
  let service: ItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get an array of items from the server', () => {
    service.getItems().subscribe(result => expect(result.length).toBeGreaterThan(0));
  })
});
