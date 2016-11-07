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



export default  function generateName(fullName) {

  const last = fullName.split(" ").length - 1;
  if (last > 2 || !fullName) {
    return "Invalid fullname";
  }
  const names = [];
  const characts = [];
  if (last == 2) {
    names.push(fullName.split(" ")[last]);
    names.push(fullName.split(" ")[last - 2].split("").splice(0, 1).join(""));
    names.push(fullName.split(" ")[last - 1].split("").splice(0, 1).join(""));

    characts.push(" ");
    characts.push(". ");
    characts.push(".");
  } else if (last == 1) {

      names.push(fullName.split(" ")[last]);
    names.push(fullName.split(" ")[last - 1].split("").splice(0, 1).join(""));

    characts.push(" ");
    characts.push(".");
  }
  else  {

    names.push(fullName.split(" ")[last]);
  }



  const shortNameArr = [];
  if (last == 0) {
    shortNameArr.push(names[0]);
  }
  else {
    for (var i = 0; i <= last; i++) {
      shortNameArr.push(names[i]);
      shortNameArr.push(characts[i]);
    }
  }


  return shortNameArr.join("");
}

app.get('/task2b/', (req, res) => {
res.send(generateName(req.query.fullname));

});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
