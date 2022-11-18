const Jimp = require("jimp");
const PDFDocument = require("pdfkit");
const fs = require("fs");

// Clase con todo lo relaciónado a la creación de las cartas
class createCards {
  margin = 30;
  cardSize = 624;

  constructor(white_cards, black_cards) {
    white_cards = white_cards;
    black_cards = black_cards;
    this.createCards(white_cards, black_cards);
  }

  async createCards(white_cards, black_cards) {
    await white_cards.forEach((cardText, index) => {
      this.copyImage(cardText, index, "white");
    });

    await black_cards.forEach((cardText, index) => {
      this.copyImage(cardText, index, "black");
    });
  }

  copyImage(cardText, number, color) {
    fs.readFile(`assets/${color}.jpg`, function (err, data) {
      if (err) throw err;
      fs.writeFile(`${color}_cards/card_${number}.jpg`, data, function (err) {
        if (err) throw err;
        CNC.writeInImage(`${color}_cards/card_${number}.jpg`, cardText, color);
      });
    });
  }

  writeInImage(fileName, cardText, color) {
    let loadedImage;

    Jimp.read(fileName)
      .then(function (image) {
        loadedImage = image;
        let font;
        if (color == "white") font = Jimp.loadFont(Jimp.FONT_SANS_128_BLACK);
        else if (color == "black")
          font = Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
        if (CNC.sizeContoller(cardText))
          if (color == "white") font = Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
          else if (color == "black")
            font = Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
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
              CNC.cardSize - CNC.margin * 2,
              CNC.cardSize - CNC.margin * 2
            );
            loadedImage.write(fileName);
          }
        });

        loadedImage
          .print(
            font,
            CNC.margin,
            CNC.margin,
            cardText,
            CNC.cardSize - CNC.margin
          )
          .write(fileName);
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  sizeContoller(text) {
    let resp = false;
    if (text.length > 20) resp = true;
    let words = text.split(" ");
    words.forEach((word) => {
      if (word.length >= 9) resp = true;
    });

    return resp;
  }
}
// Clase con todo lo relaciónado a los pdf

// Iniciar el programa
let CNC = new createCards(
  [
    "Eleon Musk",
    "1.000.000 de euros",
    "El 5G",
    "El coronavirus",
    "La extinción de los humanos",
    "El calentamiento global",
    "Lamer un codo",
    "El Crotolamo",
    "Eleon Musk",
    "1.000.000 de euros",
    "El 5G",
    "El coronavirus",
    "La extinción de los humanos",
    "El calentamiento global",
    "Lamer un codo",
    "Crotolamo",
  ],
  [
    "____ Mato a los patitos",
    "____ Fue a comprar tabaco y no volvio",
    "cada mañana hago ____, y me siento como nuevo",
  ]
);

// generate random number
