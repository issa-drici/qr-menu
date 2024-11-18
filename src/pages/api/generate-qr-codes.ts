import * as pdf from "html-pdf-node";
import QRCode from "qrcode";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée." });
  }

  try {
    // Génération des QR codes simulés
    const data = [
      { id: "ilkj3425kldsfhjb", restaurant_id: "sdfsd5f4sdf54" },
      { id: "fdghzegdf54ze", restaurant_id: "cbv87643" },
      { id: "vbn542zet5", restaurant_id: "ze12rsdf5" },
      { id: "az8e74d5fsg4", restaurant_id: "q8ds7f45g2" },
      { id: "m6frc142c9", restaurant_id: "bbi1aa0ozs" },
      { id: "izbhkuvib8", restaurant_id: "nki53tkv3u" },
      { id: "rxpumub3wj", restaurant_id: "ypit8bltt2" },
      { id: "00ope06tp3", restaurant_id: "d2d0tdhsax" },
      { id: "cy25v89pdm", restaurant_id: "cz9mmc783q" },
      { id: "kuw909705g", restaurant_id: "rrbwy0sodb" },
      { id: "jetk0prpdh", restaurant_id: "wv0vbgyy7b" },
      { id: "vzq1ywevty", restaurant_id: "n8y5l08p3r" },
      { id: "92z02p2xq3", restaurant_id: "jlai3xgb4w" },
      { id: "1lvhtv1ihy", restaurant_id: "v3m8wpr6lk" },
    ];

    const qrCodes = await Promise.all(
      data.map((table) =>
        QRCode.toDataURL(`https://example.com/restaurants/${table.id}`, {
          color: { dark: "#000000", light: "#F7F7F7" },
        })
      )
    );

    // Construction du contenu HTML
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <style>
          @font-face {
      font-family: 'Product Sans';
      src: url('https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap');
    }
    body {
      font-family: 'PT Sans', Arial, sans-serif;
      margin: 0;
      padding: 0;
    }
    .page {
      page-break-after: always;
    }
    .qr-container {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 20px;
      margin: 45px;
    }
    .qr {
      text-align: center;
      padding: 17px 0px 5px 0;
      break-inside: avoid; 
      background-color: #F7F7F7;
      border-radius: 12px;
    }
    .qr h2 {
      font-size: 15px;
      font-weight: 700;
    }
    .qr img {
    margin: -10px 0 -20px 0
     }
    .qr .number {
      font-size: 24px;
      font-weight: 700;
    }
        </style>
      </head>
      <body>
          ${qrCodes
            .map((qr, index) => {
              const formattedNumber = (index + 1).toString().padStart(2, "0");
              // Determine whether a new page should be started every 8 QR codes (2 columns × 4 rows)
              const isNewPage = index % 12 === 0;
              const isEndOfPage =
                index % 12 === 11 || index === qrCodes.length - 1;

              return `
                ${
                  isNewPage
                    ? '<div class="page"><div class="qr-container">'
                    : ""
                }
                  <div class="qr">
                    <h2>Scannez notre menu</h2>
                    <img src="${qr}" width="120" height="120" />
                    <p class="number">${formattedNumber}</p>
                  </div>
                ${isEndOfPage ? "</div></div>" : ""}`;
            })
            .join("")}
      </body>
      </html>
    `;

    // Configuration de `html-pdf-node`
    const file = { content: htmlContent };

    // Génération du PDF
    const pdfBuffer = await pdf.generatePdf(file, { format: "A4" });

    // Envoi du fichier PDF
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="qrcodes.pdf"');
    res.end(pdfBuffer);
  } catch (error) {
    console.error("Erreur lors de la génération du PDF :", error);
    res.status(500).json({ error: "Erreur lors de la génération du PDF." });
  }
}
