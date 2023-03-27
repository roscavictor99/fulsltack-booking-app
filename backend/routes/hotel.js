import express from 'express';
import formidable from 'express-formidable';

const router = express.Router();

//middleware
import { requireSignIn } from '../middlewares';
// controllers
import { create, getHotels } from '../controllers/hotelController';

router.post('/create-hotel', requireSignIn, formidable(), create);
router.get('/hotels', getHotels);

module.exports = router;
