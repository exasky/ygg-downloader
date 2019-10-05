export class YggSearchResponse {
  results: YggSearchResponseLine[];
}

export class YggSearchResponseLine {
  title: string;
  time: string;
  seeds: number;
  peers: number;
  size: string;
  desc: string;
  id: string;
  provider: string;
  link: string;
}
