export class YggQuery {
  query: string;
  cat: string;
  order?: '' | 'desc' | 'asc';
  sort?: string;
  page?: number;

  constructor() {
    this.query = '';
    this.cat = 'All';
    this.sort = 'publish_date';
    this.order = 'desc';
    this.page = 0;
  }
}
