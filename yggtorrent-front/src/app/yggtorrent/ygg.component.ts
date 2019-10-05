import {Component, HostBinding, OnInit} from '@angular/core';
import {YggtorrentService} from './yggtorrent.service';
import {YggSearchResponseLine} from './model/ygg-search-response';
import {YggQuery} from './model/ygg-query';

@Component({
  selector: 'app-ygg',
  templateUrl: './ygg.component.html',
})
export class YggComponent implements OnInit {
  @HostBinding('class') cssClass = 'flex-grow d-flex flex-column';

  categories: string[] = [];

  yggSearchQuery: YggQuery = new YggQuery();
  yggSearchResult: YggSearchResponseLine[];

  displayedColumns: string[] = ['title', 'time', 'size', 'seed', 'leech', 'actions'];

  constructor(private yggTorrentService: YggtorrentService) {
  }

  ngOnInit(): void {
    this.yggTorrentService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  search() {
    this.yggTorrentService.search(this.yggSearchQuery).subscribe(response => {
      this.yggSearchResult = response;
    });
  }

  detail(yggElement: YggSearchResponseLine) {
    console.log(yggElement);
  }

  download(yggElement: YggSearchResponseLine) {
    this.yggTorrentService.download(yggElement).subscribe(() => {

    });
  }
}
