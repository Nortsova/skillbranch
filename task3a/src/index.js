import express from 'express';
import cors from 'cors';
// import mongoose from 'mongoose';
import Promise from 'bluebird';
import fetch from 'isomorphic-fetch';
import _ from 'lodash';
// import bodyParser from 'body-parser';
// import saveDataInDb  from './saveDataInDb';
// import Pet from './models/Pet';
// import User from './models/User';

// import isAdmin from './middlewares/isAdmin';

//
const app = express();

app.use(cors());

async function getPC(pcUrl) {
  try {
    const response = await fetch(pcUrl);
    const pc = await response.json();
    return pc;
  } catch (err) {
    console.log('Чтото пошло не так:', err);
    return response.json({ err });
  }
};

const pcUrl =
  'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

//
//
// app.use('/task3a', async (req, res, next) => {
//        let result = await getPC(pcUrl);
//        const path = req.path.match(/[^\/]+/g);
//        if(path !== null) {
//
//          switch (path.length) {
//            case (1):result = result[path[0]];break;
//            case (2):result = result[path[0]][path[1]];break;
//
//            default: result = result;break;
//
//          }
//       console.log(path);
//        }
//
//          return res.json(result);
//
// });

app.use('/task3A', async (req, res, next) => {

  let result = await getPC(pcUrl);

   const path = req.path.match(/[^\/]+/g);

 console.log(path);
   if(path !== null) {
     if(path[0] == 'volumes') {
         let hdd = _.get(result, 'hdd');
         var volume = {};
         _.each(hdd, function(value) {
           volume[value.volume] = value.size + volume[value.volume] || value.size;
         });
         volume = _.mapValues(volume, function(value) {
    			return value.toString() + 'B';
    		});
         result = volume;
     } else {
        switch (path.length) {
          case (1):  (result.hasOwnProperty(path[0])) ? result = result[path[0]] : result = "";break;
          case (2): (result.hasOwnProperty(path[0]) && path[1] !== 'length') ? result = result[path[0]][path[1]]: result="";break;
          case (3): (path[2] !== 'length') ? result = result[path[0]][path[1]][path[2]] : result="";break;
          default: result = result;break;
        }
      }
   }

   (result !== '' && result !== undefined) ?
       res.json(result) :
       res.sendStatus(404);
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
