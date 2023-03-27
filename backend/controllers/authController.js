import User from '../models/userModel';
import jwt from 'jsonwebtoken';

export const showMessage = (req, res) => {
  res.status(200).send(`Here is your message: ${req.params.message}`);
};

export const register = async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  if (!name) {
    return res.status(400).send('Name is required.');
  }
  if (!password || password.length < 6) {
    return res
      .status(400)
      .send('Password is required and must be minimum 6 characters long');
  }
  let existEmail = await User.findOne({ email }).exec();
  if (existEmail) {
    return res.status(400).send('Email is taken');
  }
  const user = new User(req.body);
  try {
    await user.save();
    console.log('USER CREATED: ', user);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.log('CREATE USER FAILED', error);
    return res.status(400).send('Error. Try again.');
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email }).exec();

    if (!user) {
      res.status(400).send('User with this email not found');
    } else {
      user.comparePassword(password, (err, match) => {
        if (!match || err) return res.status(400).send('Wrong Password');
        // GENERATE A TOKEN THEN SEND AS RESPONSE TO CLIENT
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: '30d',
        });
        res.json({
          token,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            stripe_account_id: user.stripe_account_id,
            stripe_seller: user.stripe_seller,
            stripeSession: user.stripeSession,
          },
        });
      });
    }
  } catch (error) {
    // console.log('LOGIN ERROR', error);
    res.status(400).send('Signin failed');
  }
};
