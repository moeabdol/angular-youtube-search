import { Injectable, Inject } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

import { SearchResult } from "./search-result.model";

export const YOUTUBE_API_KEY = "AIzaSyDhtJsHY3SPMnh0waCsts0pYIuqJPbUSpc";
export const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/search";

@Injectable()
export class YoutubeSearchService {
  private apiKey: string;
  private apiUrl: string;

  constructor(private http: Http) {
    this.apiKey = YOUTUBE_API_KEY;
    this.apiUrl = YOUTUBE_API_URL;
  }

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
        console.log(response);
        return (<any>response.json()).items.map(item => {
          console.log("raw item ", item);
          return new SearchResult({
            id: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnailUrl: item.snippet.thumbnails.high.url
          });
        });
      });
  }
}
