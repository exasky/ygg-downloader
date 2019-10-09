import {Component, HostBinding, OnInit, ViewChild} from '@angular/core';
import {YggtorrentService} from './yggtorrent.service';
import {YggSearchResponseLine} from './model/ygg-search-response';
import {YggQuery} from './model/ygg-query';
import {MatSort, MatTableDataSource, PageEvent, Sort} from '@angular/material';

@Component({
  selector: 'app-ygg',
  templateUrl: './ygg.component.html',
  styleUrls: ['./ygg.component.scss']
})
export class YggComponent implements OnInit {
  @HostBinding('class') cssClass = 'flex-grow d-flex flex-column';

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dataSource = new MatTableDataSource();

  categories: string[] = [];

  yggSearchQuery: YggQuery = new YggQuery();

  displayedColumns: string[] = ['title', 'time', 'size', 'seed', 'leech', 'actions'];

  searchLength = Infinity;
  searchPage = 0;

  constructor(private yggTorrentService: YggtorrentService) {
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.yggTorrentService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  search() {
    if (this.yggSearchQuery.query && this.yggSearchQuery.cat) {
      this.searchLength = Infinity;
      this.yggTorrentService.search(this.yggSearchQuery).subscribe(response => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort;
        if (this.dataSource.data.length < 50) {
          this.searchLength = this.yggSearchQuery.page + this.dataSource.data.length;
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

  sortEvent(event: Sort) {
    this.yggSearchQuery.sort = event.active;
    this.yggSearchQuery.order = event.direction;
    this.search();
  }
}
