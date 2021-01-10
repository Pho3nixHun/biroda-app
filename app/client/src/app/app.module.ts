import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarouselComponent } from './carousel/carousel.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ASpotComponent } from './a-spot/a-spot.component';
import { TileComponent } from './tile/tile.component';
import { OnDemandComponent } from './onDemand/onDemand.component';
import { DetailsComponent } from './details/details.component';
import { LazyLoadImageModule } from 'ng-lazyload-image'; // <-- import it

import { LayoutToNavigationItemsPipe } from './onDemand/LayoutToNavigationItems.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    NavigationComponent,
    ASpotComponent,
    TileComponent,
    OnDemandComponent,
    LayoutToNavigationItemsPipe,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LazyLoadImageModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
