import {getLogger} from "../utils/utils";

const format = require('string-format');

export function yggTorrentProviderOverride(yggTorrentProvider: any) {
    yggTorrentProvider.baseUrl = 'https://www2.yggtorrent.se';
    yggTorrentProvider.searchUrl = '/engine/search?name={query}&description=&file=&uploader=&category={cat}&do=search&order={order}&sort={sort}&page={page}';

    yggTorrentProvider.getUrl = (queryString: YggQuery): string => {
        const cat = yggTorrentProvider.getCategoryValue(queryString.cat);
        if (cat === null) return null;

        queryString.cat = cat;

        let url =
            yggTorrentProvider.baseUrl + (cat.startsWith('url:') ? cat.substr(4) : yggTorrentProvider.searchUrl);


        url = format(url, queryString);
        url = url.replace(/ /g, '+');

        return url;
    };
    yggTorrentProvider.search = async (yggQuery: YggQuery) => {
        const pageLimit = 1;
        const url = yggTorrentProvider.getUrl(yggQuery);

        getLogger().log('debug', 'URL: ' + url);

        if (!url) {
            return Promise.resolve();
        }

        await yggTorrentProvider.ensureLogin();
        const result = await yggTorrentProvider.fetchAndParseUrl(url, pageLimit);
        const returnValue = await yggTorrentProvider.postProcess(result);
        return returnValue;
    };
    yggTorrentProvider.downloadTorrentBuffer = async (torrent: any) => {
        await yggTorrentProvider.ensureLogin();
        return yggTorrentProvider.request(torrent.link, {encoding: null});
    }
}

export class YggQuery {
    query: string;
    cat: string = 'all';
    order?: string = 'desc';
    sort?: string = 'publish_date';
    page?: number = 0;
}
