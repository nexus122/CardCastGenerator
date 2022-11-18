const PDFDocument = require("pdfkit");
const fs = require("fs");

class createPdf {
  margin = 30;
  cardSize = 624;
  size = 100;

  constructor() {
    this.createPdf(this.cardSize);
  }

  createPdf() {
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream("pdf/output.pdf"));

    const white_length = fs.readdirSync("white_cards").length;
    const black_length = fs.readdirSync("black_cards").length;

    let filePx = 0;
    let fileCounter = 0;
    let pageCounter = 0;

    for (let i = 0; i < white_length; i++) {
      console.log(fileCounter);
      console.log(pageCounter);
      console.log(filePx);

      if (fileCounter >= 6) {
        filePx = filePx + this.size;
        fileCounter = 0;
      }

      if (pageCounter >= 42) {
        doc.addPage();
        filePx = 0;
        pageCounter = 0;
        fileCounter = 0;
      }

      doc.image(`white_cards/card_${i}.jpg`, this.size * fileCounter, filePx, {
        fit: [this.size, this.size],
      });

      fileCounter++;
      pageCounter++;
    }

    // Add another page
    doc.addPage();

    // Reiniciamos los contadores
    filePx = 0;
    fileCounter = 0;
    pageCounter = 0;

    for (let i = 0; i < black_length; i++) {
      if (fileCounter >= 6) {
        filePx = filePx + this.size;
        fileCounter = 0;
      }

      if (pageCounter >= 42) {
        doc.addPage();
        pageCounter = 0;
      }

      doc.image(`black_cards/card_${i}.jpg`, this.size * fileCounter, filePx, {
        fit: [this.size, this.size],
      });

      fileCounter++;
      pageCounter++;
    }

    // Finalize PDF file
    doc.end();
  }
}

let pdf = new createPdf();
