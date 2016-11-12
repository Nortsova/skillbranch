import express from 'express';
import cors from 'cors';





const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.json({
    hello: 'JS World',
  });
});

app.get('/task2a/', (req, res) => {
  const sum = (+req.query.a || 0) + (+req.query.b || 0);
 res.send(sum.toString());

});



export default  function generateName(fullNameEnter) {

  const fullName = fullNameEnter.replace(/\s+/g, " ").trim();
  if(!fullName || (/[0-9_\/]/.test(fullName))) {
    return "Invalid fullname";
  }
  const last = fullName.split(" ").length;
  const nameArr = fullName.split(" ");

  let newName = "";
  switch(last){
    case 3: newName = " " + nameArr[last-3][0].toUpperCase() + ".";
    case 2: newName = newName + " " + nameArr[last-2][0].toUpperCase() + ".";
    case 1: newName = nameArr[last-1][0].toUpperCase() + nameArr[last-1].slice(1).toLowerCase() + newName; break;
    default: newName = "Invalid fullname"; break;

  }


  return newName;
};

app.get('/task2b/', (req, res) => {

res.send(generateName(req.query.fullname));

});


app.get('/task2c/', (req, res) => {
  const url = req.query.username;
  const re = new RegExp('@?(https?:)?(\/\/)?((telegram|vk|www.vk|vkontakte|medium|twitter|github|xn--80adtgbbrh1bc.xn--p1ai)[^\/]*\/)?@?([a-zA-Z0-9._]*)', 'i');
  const username = url.match(re);

  let result = '@' + username[5];
  res.send(result);

});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
