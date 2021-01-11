import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { OnDemandService } from '../onDemand.service';
import type { Item } from '../tile/tile.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  
  id?: string;
  details?: any;
  
  constructor(
    private location: Location,
    private router: Router, 
    private route: ActivatedRoute, 
    private onDemandService: OnDemandService
  ) { }

  tileClicked($item: Item) {
    this.router.navigate(['/details', $item.id]);
  }

  back() {
    this.location.back();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id') || this.id;
      if (this.id) {
        this.onDemandService.details(this.id).subscribe((data: any) => {
          this.details = data;
        });
      }
    });
    
  }
}
