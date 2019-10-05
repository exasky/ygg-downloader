import {YggController} from './ygg.controller';
import {YggService} from './ygg.service';

const express = require('express');
const router = express.Router();

const yggController = new YggController(new YggService());

router
    .route('/ygg/categories')
    .get(yggController.getCategories.bind(yggController));

router
    .route('/ygg/search')
    .post(yggController.search.bind(yggController));

router
    .route('/ygg/get-info/:id')
    .get(yggController.getInfo.bind(yggController))

router
    .route('/ygg/download')
    .post(yggController.download.bind(yggController));

export default router;
