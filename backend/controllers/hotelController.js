import Hotel from '../models/hotelModel';
import fs from 'fs';

export const create = async (req, res) => {
  try {
    const fields = req.fields;
    const files = req.files;

    let hotel = new Hotel(fields);
    //handle image
    if (files.image) {
      hotel.image.data = fs.readFileSync(files.image.path);
      hotel.image.contentType = files.image.type;
    }
    hotel.save((err, result) => {
      if (err) {
        console.log('saving hotel err =>', err);
        res.status(404).send('Error saving');
      }
      res.json(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      err: error.message,
    });
  }
};

export const getHotels = async (req, res) => {
  let all = await Hotel.find({})
    .limit(24)
    .select('-image.data')
    .populate('postedBy', '_id name')
    .exec();
  res.json(all);
};
