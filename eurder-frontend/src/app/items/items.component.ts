import {Component, OnInit} from '@angular/core';
import {Item} from '../item';
import {ItemService} from "../item.service";
import {CreateItem} from "../createItem";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items: Item[];
  createItem: CreateItem;

  constructor(private itemService: ItemService) {
  }

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.itemService.getItems()
      .subscribe(items => this.items = items);
  }


  add(name: string, description: string, price: number, amount: number, imageUrl: string) {
    name = name.trim();
    description = description.trim();
    imageUrl = imageUrl.trim();
    if (!name || !description || !price || !amount || !imageUrl) { return; }
    this.itemService.addItem( { name, description, price, amount, imageUrl } as CreateItem)
      .subscribe(item => {this.items.push(item);
      });
  }
}
