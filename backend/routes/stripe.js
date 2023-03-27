import express from 'express';

const router = express.Router();

// middleware
import { requireSignIn } from '../middlewares';

// controllers
import {
  createConnectAccount,
  getAccountBalance,
  getAccountStatus,
  payoutSetting,
} from '../controllers/stripeController';

router.post('/create-connect-account', requireSignIn, createConnectAccount);
router.post('/get-account-status', requireSignIn, getAccountStatus);
router.post('/get-account-balance', requireSignIn, getAccountBalance);
router.post('/payout/setting', requireSignIn, payoutSetting);

module.exports = router;
