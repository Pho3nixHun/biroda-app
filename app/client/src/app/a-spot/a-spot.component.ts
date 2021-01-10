import type { ElementRef } from '@angular/core';
import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'a-spot',
  templateUrl: './a-spot.component.html',
  styleUrls: ['./a-spot.component.scss']
})
export class ASpotComponent implements OnInit {
  @Input()
  image: string = '';
  @Input()
  defaultImage: string = '';

  @ViewChild("rootElement") rootElement?: ElementRef;

  ngOnInit(): void {
  }

}
