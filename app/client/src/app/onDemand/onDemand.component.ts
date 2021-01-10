import { Component, OnInit, Input } from '@angular/core'
import type { SimpleChange } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router'
import { NavigationComponent } from '../navigation/navigation.component';
import type { NavigationItem } from '../navigation/navigation.component';
import { ASpotComponent } from '../a-spot/a-spot.component';
import { OnDemandService } from '../onDemand.service';
import { Observable } from 'rxjs';

export type Section = {
  name?: string,
  id: string,
  aspot?: {
    image: string,
    defaultImage?: string
  }
}
export type Layout = Section[];

@Component({
  selector: 'on-demand',
  templateUrl: './onDemand.component.html',
  styleUrls: ['./onDemand.component.scss']
})
export class OnDemandComponent implements OnInit {

  id: string = 'default';
  activeSectionIndex: number = 0;
  @Input()
  layout: Layout = []

  constructor(private route: ActivatedRoute, private onDemandService: OnDemandService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id') || this.id;
    });
    this.onDemandService.layout().subscribe((data: Layout) => {
      this.layout = data;
    })
  }

}
