import { Injectable } from '@angular/core';

// Pdf Make
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor() {}

  createDocPDF(
    hasWaterMark = true,
    waterMarkTitle = 'Comprovante Rifa JDF',
    waterMarkTitleColor = 'green',
    content,
    styles
  ) {
    const definitions = this.createDefinitions(
      hasWaterMark,
      waterMarkTitle,
      waterMarkTitleColor,
      content,
      styles
    );
    this.downloadPdf(definitions, 'Comprovante RIFA JDF');
  }

  createDefinitions(
    watermark: boolean,
    waterMarkTtitle,
    waterMarkTitleColor,
    content,
    styles
  ) {
    if (watermark === false) {
      waterMarkTtitle = 'Comprovante Rifa JDF';
      waterMarkTitleColor = 'green';
    }
    const docDefinitions = {
      watermark: {
        text: waterMarkTtitle,
        color: waterMarkTitleColor,
        opacity: 0.1,
        bold: true,
      },
      content: [content],
      styles: [styles],
    };
    return docDefinitions;
  }

  async downloadPdf(doc, title) {
    const pdf = await pdfMake.createPdf(doc);
    pdf.download(title);
  }
}
//
