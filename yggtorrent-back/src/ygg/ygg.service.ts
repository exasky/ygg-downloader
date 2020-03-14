import {YggQuery, yggTorrentProviderOverride} from "./utils";
import {getConfiguration} from "../utils/utils";

const TorrentSearchApi = require('torrent-search-api');

export class YggService {
    private yggClient: any;
    private delugeClient: any;

    private configuration: any;

    constructor() {
        this.configuration = getConfiguration();

        const torrentConfig = this.configuration.torrent;
        TorrentSearchApi.enableProvider('Yggtorrent', torrentConfig.username, torrentConfig.password);
        yggTorrentProviderOverride(TorrentSearchApi.getProvider('YggTorrent'));

        const delugeConfig = this.configuration.deluge;
        this.delugeClient = require('deluge')(delugeConfig.url, delugeConfig.password)
    }

    async getCategories(): Promise<string[]> {
        return TorrentSearchApi.getProvider('YggTorrent').getCategories();
    }

    async search(query: YggQuery): Promise<any> {
        return TorrentSearchApi.getProvider('YggTorrent').search(query);
    }

    async download(torrent: any): Promise<any> {
        const torrentPath = this.configuration.torrent.downloadPath + '/' + torrent.title + '.torrent';
        await TorrentSearchApi.getProvider('YggTorrent').downloadTorrent(torrent, torrentPath);
        return new Promise((resolve, reject) => {
            this.delugeClient.add(torrentPath, getConfiguration().deluge.downloadLocation, (error: any, success: any, response: any) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve({success, response});
            });
        });
    }
}
