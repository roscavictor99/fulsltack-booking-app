import User from '../models/userModel';
const stripe = require('stripe')(process.env.STRIPE_SECRET);
import queryString from 'query-string';

export const createConnectAccount = async (req, res) => {
  // 1. find user form db
  const user = await User.findById(req.auth._id).exec();
  console.log('USER ==> ', user);

  //   2. if user don't have stripe_account_id yet, create now
  if (!user.stripe_account_id) {
    const account = await stripe.accounts.create({
      type: 'express',
    });
    console.log('ACCOUNT ===> ', account);
    user.stripe_account_id = account.id;
    user.save();
  }

  //   3. create account link based on account id (for frontend to complete onboarding)
  let accountLink = await stripe.accountLinks.create({
    account: user.stripe_account_id,
    refresh_url: process.env.STRIPE_REDIRECT_URL,
    return_url: process.env.STRIPE_REDIRECT_URL,
    type: 'account_onboarding',
  });
  //   prefill any info such as email
  accountLink = Object.assign(accountLink, {
    'stripe_user[email]': user.email || undefined,
  });
  console.log('ACCOUNT LINK', accountLink);
  let link = `${accountLink.url}?${queryString.stringify(accountLink)}`;
  console.log('LOGIN LINK', link);
  res.send(link);

  //   4. update payment schedule (optional. default is 2 days)
};

const updateDelayDays = async accountId => {
  const account = stripe.accounts.update(accountId, {
    settings: {
      payouts: {
        schedule: {
          delay_days: 7,
        },
      },
    },
  });
  return account;
};

export const getAccountStatus = async (req, res) => {
  const user = await User.findById(req.auth._id).exec();
  const account = await stripe.accounts.retrieve(user.stripe_account_id);
  const updatedAccount = await updateDelayDays(account.id);
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { stripe_seller: updatedAccount },
    { new: true }
  )
    .select('-password')
    .exec();
  // console.log(updatedUser);
  res.json(updatedUser);
};

export const getAccountBalance = async (req, res) => {
  const user = await User.findById(req.auth._id);

  try {
    const balance = await stripe.balance.retrieve({
      stripeAccount: user.stripe_account_id,
    });
    // console.log('BALANCE ===>', balance);
    res.status(200).json(balance);
  } catch (error) {
    console.log(error);
  }
};

export const payoutSetting = async (req, res) => {
  try {
    const user = await User.findById(req.auth._id);
    const loginLink = await await stripe.accounts.createLoginLink(
      user.stripe_seller.id
    );
    console.log('LOGIN LINK FOR PAYOUT SETTING', loginLink);
    res.status(200).json(loginLink);
  } catch (error) {
    console.log(error);
  }
};
