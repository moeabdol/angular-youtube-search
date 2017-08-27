import { Injectable, Inject } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

import { SearchResult } from "./search-result.model";

const YOUTUBE_API_KEY = "AIzaSyDhtJsHY3SPMnh0waCsts0pYIuqJPbUSpc";
const YOUTUBE_API_URL = "https://developers.google.com/youtube/v3/docs/search/list";

@Injectable()
export class YoutubeSearchService {
  constructor(private http: Http,
    @Inject(YOUTUBE_API_KEY) private apiKey: string,
    @Inject(YOUTUBE_API_URL) private apiUrl: string) { }

  search(query: string): Observable<SearchResult[]> {
    const params: string = [
      `q=${query}`,
      `key=${this.apiKey}`,
      `part=snippet`,
      `type=video`,
      `maxResults=10`,
    ].join("&");
    const queryUrl = `${this.apiUrl}?${params}`;
    return this.http.get(queryUrl)
      .map((response: Response) => {
        return(<any>response.json()).items.map(item => {
          console.log("raw item ", item);
          return new SearchResult({
            id: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnail: item.snippet.thumbnails.high.url
          });
        });
      });
  }
}
