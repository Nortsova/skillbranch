import express from 'express';
import cors from 'cors';
// import mongoose from 'mongoose';
import Promise from 'bluebird';
import fetch from 'isomorphic-fetch';
// import bodyParser from 'body-parser';
// import saveDataInDb  from './saveDataInDb';
// import Pet from './models/Pet';
// import User from './models/User';

// import isAdmin from './middlewares/isAdmin';



// mongoose.Promise = Promise;
// mongoose.connect('mongodb://publicdb.mgbeta.ru/nortsova_skb3');

const app = express();
// app.use(bodyParser.json());
app.use(cors());
//app.use(isAdmin);

// app.get('/clear', isAdmin, async (req, res) => {
//   await User.remove({});
//   await Pet.remove({});
// return res.send('ok');
// });
//
//
// app.get('/users', async (req, res) => {
//   const users = await User.find();
//   return res.json(users);
// });
//
// app.get('/pets', async (req, res) => {
//   const pets = await Pet.find().populate('owner');
// return res.json(pets);
// });
//
// app.post('/data', async (req, res) => {
//   const data = req.body;
//   if(!data.user) return res.status(400).send('user required');
//   if(!data.pets) data.pets = [];
//   const user = await User.findOne({
//   name: data.user.name
// });
// if(user) return res.status(400).send('user.name is exists');
//   try {
//     const result = await saveDataInDb(data);
//     return res.json(result);
//   } catch(err) {
//     return res.status(500).json(err);
//   }
// });

const dataFormFile = {
  board: {
    vendor: "IBM",
    model: "IBM-PC S-100",
    cpu: {
      model: "80286",
      hz: 12000
    },
    image: "http://www.s100computers.com/My%20System%20Pages/80286%20Board/Picture%20of%2080286%20V2%20BoardJPG.jpg",
    video: "http://www.s100computers.com/My%20System%20Pages/80286%20Board/80286-Demo3.mp4"
  },
  ram: {
    vendor: "CTS",
    volume: 1048576,
    pins: 30
  },
  os: "MS-DOS 1.25",
  floppy: 0,
  hdd: [
    {
      vendor: "Samsung",
      size: 33554432,
      volume: "C:"
    },
    {
      vendor: "Maxtor",
      size: 16777216,
      volume: "D:"
    },
    {
      vendor: "Maxtor",
      size: 8388608,
      volume: "C:"
    }
  ],
  monitor: null
};


app.get('/', async (req, res) => {
      return res.json(dataFormFile);
});

app.get('/board', async (req, res) => {
      return res.json(dataFormFile.board);
});


app.get('/ram', async (req, res) => {
      return res.json(dataFormFile.ram);
});

app.get('/os', async (req, res) => {
      return res.json(dataFormFile.os);
});

app.get('/hdd', async (req, res) => {
      return res.json(dataFormFile.hdd);
});

app.get('/board/vendor', async (req, res) => {
      return res.json(dataFormFile.board.vendor);
});

app.get('/board/model', async (req, res) => {
      return res.json(dataFormFile.board.model);
});

app.get('/board/cpu', async (req, res) => {
      return res.json(dataFormFile.board.cpu);
});
app.get('/board/image', async (req, res) => {
      return res.json(dataFormFile.board.image);
});

app.get('/board/video', async (req, res) => {
      return res.json(dataFormFile.board.video);
});

app.get('/ram/vendor', async (req, res) => {
      return res.json(dataFormFile.ram.vendor);
});

app.get('/ram/volume', async (req, res) => {
      return res.json(dataFormFile.ram.volume);
});

app.get('/ram/pins', async (req, res) => {
      return res.json(dataFormFile.ram.pins);
});


app.get('/volumes', async (req, res) => {
      return res.json(dataFormFile.volumes);
});


app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
