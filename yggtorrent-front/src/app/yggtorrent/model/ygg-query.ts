export class YggQuery {
  query: string;
  cat: string;
  subcat?: string;
  order?: '' | 'desc' | 'asc';
  sort?: string;
  page?: number;
  limit?: number;

  constructor() {
    this.query = '';
    this.cat = 'All';
    this.sort = 'publish_date';
    this.order = 'desc';
    this.page = 0;
  }
}
