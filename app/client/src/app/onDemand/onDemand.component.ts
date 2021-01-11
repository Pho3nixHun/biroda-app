import { Component, OnInit, Input } from '@angular/core'
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { NavigationComponent } from '../navigation/navigation.component';
import type { NavigationItem } from '../navigation/navigation.component';
import { ASpotComponent } from '../a-spot/a-spot.component';
import { OnDemandService } from '../onDemand.service';
import { Observable } from 'rxjs';
import type { Item } from '../tile/tile.component';

export type Section = {
  name?: string,
  id: string,
  aspot?: {
    image: string,
    defaultImage?: string,
    id: string | number,
    title: string
  }
}
export type Layout = Section[];
type SearchItem = {
  id: string | number,
  title: string
}
type SearchResult = SearchItem[];

@Component({
  selector: 'on-demand',
  templateUrl: './onDemand.component.html',
  styleUrls: ['./onDemand.component.scss']
})
export class OnDemandComponent implements OnInit {

  id: string = 'default';
  activeSectionIndex: number = 0;
  transparentPixel = '/pixel.png';

  @Input()
  layout: Layout = [];

  section$?: Observable<any>

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private onDemandService: OnDemandService
  ) { }

  tileClicked($item: Item) {
    this.router.navigate(['/details', $item.id]);
  }

  get aspot() {
    return this.layout[this.activeSectionIndex]?.aspot;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id') || this.id;
      this.section$ = this.onDemandService.section(this.id);
    });
    this.onDemandService.layout().subscribe((data: Layout) => {
      this.layout = data;
    });
  }

// TODO: Investigate if moving this to another component make sense?
  keyword = 'title';
  searchResult: SearchResult = [];

  onSearchSelect(item: SearchItem) {
    this.router.navigate(['/details', item.id]);
  }

  async onChangeSearch(val: string) {
    if (val && val.length > 0) {
      this.searchResult = await this.onDemandService.search(val).toPromise();
    }
  }

}
