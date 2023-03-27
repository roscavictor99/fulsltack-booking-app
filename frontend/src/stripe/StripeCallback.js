import React, { useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getAccountStatus } from '../actions/stripe';
import { updateUserInLocalStorage } from '../actions/auth';

const StripeCallback = ({ history }) => {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const accountStatus = async () => {
      try {
        const res = await getAccountStatus(auth.token);
        // console.log('USER ACCOUNT STATUS ON STRIPE CALLBACK', res);

        updateUserInLocalStorage(res.data, () => {
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: res.data,
          });
        });
        window.location.href = '/dashboard/seller';
      } catch (error) {
        console.log(error);
      }
    };

    if (auth && auth.token) accountStatus();
  }, [auth, dispatch]);

  return (
    <div className="d-flex justify-content-center p-5">
      <LoadingOutlined className="display-1 h1 p-5 text-danger" />
    </div>
  );
};

export default StripeCallback;
