import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {YggQuery} from './model/ygg-query';
import {Observable} from 'rxjs';
import {YggSearchResponseLine} from './model/ygg-search-response';

@Injectable({
  providedIn: 'root'
})
export class YggtorrentService {
  private static API_URL = environment.apiUrl + '/ygg';

  constructor(private http: HttpClient) {
  }

  public getCategories(): Observable<string[]> {
    return this.http.get<string[]>( YggtorrentService.API_URL + '/categories');
  }

  public search(yggQuery: YggQuery): Observable<YggSearchResponseLine[]> {
    return this.http.post<YggSearchResponseLine[]>(YggtorrentService.API_URL + '/search', yggQuery);
  }

  public download(torrent: YggSearchResponseLine): Observable<void> {
    return this.http.post<void>(YggtorrentService.API_URL + '/download', {torrent});
  }
}
