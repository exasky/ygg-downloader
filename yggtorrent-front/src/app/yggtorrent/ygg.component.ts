import {Component, HostBinding, OnInit} from '@angular/core';
import {YggtorrentService} from './yggtorrent.service';
import {YggSearchResponseLine} from './model/ygg-search-response';
import {YggQuery} from './model/ygg-query';
import {PageEvent} from '@angular/material';

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

  searchLength = Infinity;
  searchPage = 0;

  constructor(private yggTorrentService: YggtorrentService) {
  }

  ngOnInit(): void {
    this.yggTorrentService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  search() {
    if (this.yggSearchQuery.query && this.yggSearchQuery.cat) {
      this.searchLength = Infinity;
      this.yggTorrentService.search(this.yggSearchQuery).subscribe(response => {
        this.yggSearchResult = response;
        if (this.yggSearchResult.length < 50) {
          this.searchLength = this.yggSearchQuery.page + this.yggSearchResult.length;
        }
      });
    }
  }

  detail(yggElement: YggSearchResponseLine) {
    console.log(yggElement);
  }

  download(yggElement: YggSearchResponseLine) {
    this.yggTorrentService.download(yggElement).subscribe(() => {

    });
  }

  pageEvent(page: PageEvent) {
    this.searchPage = page.pageIndex;
    this.yggSearchQuery.page = page.pageIndex * page.pageSize;
    this.search();
  }
}
