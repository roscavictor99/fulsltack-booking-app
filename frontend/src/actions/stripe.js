import axios from 'axios';

export const createConnectAccount = async token =>
  await axios.post(
    `${process.env.REACT_APP_API}/create-connect-account`,
    {},
    {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const getAccountStatus = async token =>
  axios.post(
    `${process.env.REACT_APP_API}/get-account-status`,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const getAccountBalance = async token =>
  axios.post(
    `${process.env.REACT_APP_API}/get-account-balance`,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const payoutSetting = async token =>
  await axios.post(
    `${process.env.REACT_APP_API}/payout/setting`,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
