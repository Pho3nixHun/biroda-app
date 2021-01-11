import {
  Component, 
  OnInit, 
  ViewEncapsulation, 
  ContentChild, 
  ViewChild, 
  ViewChildren, 
  ElementRef, 
  Input, 
  Output, 
  QueryList, 
  EventEmitter
} from '@angular/core';

export type NavigationItem = {
  text: string,
  routerLink: string[],
  href?: string,
  id: string
}

@Component({
  selector: 'navigation-bar',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @ViewChild("navElement") navElement?: ElementRef;
  @ViewChildren("anchors") anchors?: QueryList<ElementRef>;

  @Input()
  items: NavigationItem[] = [];

  @Input()
  active: number = 0;
  @Output() activeChange = new EventEmitter();

  get activeItem(): NavigationItem { return this.items[this.active] };
  
  constructor() { }
  ngOnInit(): void { };

  anchorClickHandler(event: MouseEvent, item: NavigationItem, i: number) {
    const { target } = event;
    const { width, x } = (target as Element).getBoundingClientRect();
    if (this.anchors) {
      this.active = [...this.anchors].findIndex((el:ElementRef) => el.nativeElement === target);
      this.activeChange.emit(this.active);
      this.updateHoverRect(width, x);
    }
  }

  onResize() {
    const activeAnchor = this?.anchors
      ?.find((el: ElementRef, i: number) => this.active === i);
    if (activeAnchor) {
      const { width, x } = (activeAnchor.nativeElement as Element).getBoundingClientRect();
      this.updateHoverRect(width, x);
    }
  }

  ngAfterViewChecked() {
    this.onResize();
  }

  updateHoverRect(width: number, x: number) {
    const el = this.navElement?.nativeElement;
    if (el) {
      el.style = `
        --lineX: ${x}px;
        --lineWidth: ${width}px;
      `
    }
  }

}
