import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// TODO: Accept template instead of burned in movie-tile.
import type { Item } from '../tile/tile.component';

// TODO: Move this to service level or make it slimmer.
export type Carousel = {
  created_by: string;
  description: string;
  favorite_count: number;
  id: string;
  items: Item[];
  item_count: number;
  iso_639_1: string;
  name: string;
  poster_path: string;
}

@Component({
  selector: 'tile-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  constructor() { }

  @Input()
  carousel?: Carousel;

  @Output()
  tileClick = new EventEmitter();

  tileClickHandler(item: Item) {
    this.tileClick.emit(item);
  }

  ngOnInit(): void {
  }

}
