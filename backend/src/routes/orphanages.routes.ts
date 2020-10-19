import { Router } from 'express'
import multer from 'multer';

import uploadConfig from '../config/upload'
import OrphanagesController from '../controllers/OrphanagesController';

const routes = Router();
const upload = multer(uploadConfig)

const orphanages = Router();

orphanages.get('/orphanages', OrphanagesController.index);
orphanages.get('/orphanages/:id', OrphanagesController.show);
orphanages.post('/orphanages', upload.array('images'), OrphanagesController.create);

export default orphanages;
