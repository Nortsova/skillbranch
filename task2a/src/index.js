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
function hueToRgb(t1, t2, hue) {
    if (hue < 0) hue += 6;
    if (hue >= 6) hue -= 6;
    if (hue < 1) return (t2 - t1) * hue + t1;
    else if(hue < 3) return t2;
    else if(hue < 4) return (t2 - t1) * (4 - hue) + t1;
    else return t1;
}


function hslToRgb(hue, sat, light) {

    var t1, t2, r, g, b;
    hue = hue / 60;
    if ( light <= 0.5 ) {
    t2 = light * (sat + 1);
    } else {
    t2 = light + sat - (light * sat);
    }
    t1 = light * 2 - t2;
    r = (Math.round(hueToRgb(t1, t2, hue + 2) * 255)).toString(16);
    g = (Math.round(hueToRgb(t1, t2, hue) * 255)).toString(16);
    b = (Math.round(hueToRgb(t1, t2, hue - 2) * 255)).toString(16);

    if(r.length < 2)
        r = 0 + r;

    if(g.length < 2)
        g = 0 + g;

    if(b.length < 2)
        g = 0 + g;

    return r + g + b;
}

app.get('/task2d/', (req, res) => {

   console.log(req.query.color);
  if (!req.query.color) {
    res.send('Invalid color');
  }
  const color = req.query.color;


  const re = new RegExp('(#)?[a-f0-9]*', 'i');
  const resultColor = color.replace(/\s+/g, " ").trim().replace('#', "").match(re);

  let lastRes;
  let hexArr;
  if(resultColor[0].split('').length == 3) {

    let colorChar = resultColor[0].split("");
    lastRes = colorChar.map(function(item) {
      return '' + item + item;
    });
    lastRes = '#' + lastRes.join("").toLowerCase();
  } else if (resultColor[0].split('').length == 6) {
    lastRes = '#' + resultColor[0].toLowerCase();
  } else if (/rgb/i.test(color)) {
    let rgbColor = color.replace('rgb', '').replace('(', '').replace(')', '').replace(/\s+/g, " ").trim().split(",");

    if ((rgbColor.length !== 3) || /#/.test(rgbColor)) {res.send('Invalid color');}

    hexArr = rgbColor.map(function(item) {
      if (item > 255) {res.send('Invalid color');}
      let itemNum = +item;
      return (item.replace(/\s+/g, " ").trim().length == 1) ? '0' + itemNum.toString(16) : itemNum.toString(16);
    });
    lastRes = '#' + hexArr.join("").toLowerCase();
  } else if (/hsl/i.test(color)) {
    let hslColor = color.replace('hsl', '').replace('(', '').replace(')', '').replace(/%20/g, '').replace(/\s+/g, " ").trim().split(",");
    console.log(hslColor);
    if((!/%/.test(hslColor[1]))
    || (!/%/.test(hslColor[2])) ){res.send('Invalid color');}
    hslColor[1] = hslColor[1].replace(/%/g, '');
    hslColor[2] = hslColor[2].replace(/%/g, '');
    if((hslColor[0] > 360)
    || (hslColor[1] >100)
    || (hslColor[2] > 100)
    || (hslColor[0] < 0)
    || (hslColor[1] < 0)
    || (hslColor[2] < 0) ) {res.send('Invalid color');}
    lastRes = '#' + hslToRgb(hslColor[0], hslColor[1].replace(/%/g, '')/100, hslColor[2].replace(/%/g, '')/100);
  } else {
    lastRes = 'Invalid color';
  }

  res.send(lastRes);
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
