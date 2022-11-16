const Jimp = require("jimp");
const fs = require("fs");

let white_cards = ["Ona", "El arbol de los deseos nos hara madrugar demasiado"];

const margin = 30;
const cardSize = 624;
function copyImage(text, number) {
  fs.readFile("assets/white.jpg", function (err, data) {
    if (err) throw err;
    fs.writeFile(`white_cards/card_${number}.jpg`, data, function (err) {
      if (err) throw err;
      console.log("It's saved!");
      writeInImage(`white_cards/card_${number}.jpg`, text);
    });
  });
}

function writeInImage(fileName, imageCaption) {
  let loadedImage;

  Jimp.read(fileName)
    .then(function (image) {
      loadedImage = image;
      let font = Jimp.loadFont(Jimp.FONT_SANS_128_BLACK);
      if (sizeContoller(imageCaption))
        font = Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
      return font;
    })
    .then(function (font) {
      Jimp.read("assets/logo.png", (err, sec_img) => {
        if (err) {
          console.log(err);
        } else {
          sec_img.resize(60, 45);
          loadedImage.blit(
            sec_img,
            cardSize - margin * 2,
            cardSize - margin * 2
          );
          loadedImage.write(fileName);
        }
      });

      loadedImage
        .print(font, margin, margin, imageCaption, cardSize - margin)
        .write(fileName);
    })
    .catch(function (err) {
      console.error(err);
    });
}

function sizeContoller(text) {
  let resp = false;
  if (text.length > 20) resp = true;
  let words = text.split(" ");
  words.forEach((word) => {
    if (word.length >= 9) resp = true;
  });

  return resp;
}

// Bucle de copia de imagenes
white_cards.forEach((newCard, index) => {
  copyImage(newCard, index);
});
