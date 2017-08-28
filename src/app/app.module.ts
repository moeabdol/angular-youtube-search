import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { SearchBoxComponent } from "./youtube-search/search-box/search-box.component";
import { SearchResultComponent } from './youtube-search/search-result.component';

import { YoutubeSearchService } from "./youtube-search/youtube-search.service";

@NgModule({
  declarations: [
    AppComponent,
    SearchBoxComponent,
    SearchResultComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [YoutubeSearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
