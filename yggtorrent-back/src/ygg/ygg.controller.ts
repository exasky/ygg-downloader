import {YggService} from "./ygg.service";
import {Request, Response} from "express";

export class YggController {
    private yggService: YggService;

    constructor(yggService: YggService) {
        this.yggService = yggService;
    }

    getCategories(req: Request, res: Response) {
        this.yggService.getCategories().then(categories => {
            res.send(categories);
        });
    }

    search(req: Request, res: Response) {
        this.yggService.search(req.body).then(result => {
            res.send(result);
        })
    }

    getInfo(req: Request, res: Response) {
        const yggId = req.params.id;
    }

    download(req: Request, res: Response) {
        this.yggService.download(req.body.torrent).then(() => {
            res.end();
        }).catch(err => {
            console.log(err);
            res.end();
        });
    }
}
