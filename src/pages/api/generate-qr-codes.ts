import { createClient } from "@supabase/supabase-js";
import QRCode from "qrcode";
import PDFDocument from "pdfkit";
import { bufferToBlob } from "pdfkit/js/pdfkit";

// const supabase = createClient("SUPABASE_URL", "SUPABASE_ANON_KEY");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { numOfCodes } = req.body;

    try {
      // 1. Créer des entrées dans Supabase pour les tables
      //   const { data, error } = await supabase
      //     .from('tables')
      //     .insert(
      //       Array.from({ length: numOfCodes }, (_, i) => ({
      //         restaurant_id: 'your_restaurant_id',
      //         name: `Table ${i + 1}`,
      //       }))
      //     )
      //     .select('id, restaurant_id');

      //   if (error) throw error;
      const data = [
        { id: "ilkj3425kldsfhjb", restaurant_id: "sdfsd5f4sdf54" },
        { id: "fdghzegdf54ze", restaurant_id: "cbv87643" },
        { id: "vbn542zet5", restaurant_id: "ze12rsdf5" },
        { id: "az8e74d5fsg4", restaurant_id: "q8ds7f45g2" },
      ];
      // 2. Générer les QR codes pour chaque table
      const qrCodes = await Promise.all(
        data.map((table) => {
          const url = `https://eatsup.fr/restaurant/${table.restaurant_id}/table/${table.id}/menu`;
          return QRCode.toDataURL(url);
        })
      );

      // 3. Créer un PDF contenant les QR codes
      const doc = new PDFDocument({ margin: 20 });
      let buffers = [];
      let qrPerRow = 2; // 2 QR codes par ligne
      let qrCodeSize = 200; // Taille de chaque QR code (ajustable)
      let yPosition = 20; // Position Y pour gérer les lignes
      let xPosition = 20; // Position X pour gérer les colonnes

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=qrcodes.pdf');
        res.send(pdfData);
      });

      // 4. Boucle à travers les QR codes et créer la mise en page en 2 colonnes
      qrCodes.forEach((qrCode, index) => {
        if (index % qrPerRow === 0 && index !== 0) {
          // Saut de ligne après 2 QR codes
          yPosition += qrCodeSize + 100; // Ajuster pour l'espacement vertical
          xPosition = 20; // Reset X pour la nouvelle ligne
        }

        // Ajouter le QR code au PDF
        doc.rect(xPosition, yPosition, qrCodeSize, qrCodeSize).stroke();
        doc.image(qrCode, xPosition, yPosition, { fit: [qrCodeSize, qrCodeSize] });

        // Ajouter le texte au-dessus et en dessous du QR code
        const tableName = `Restaurant ${data[index].restaurant_id} Table ${data[index].id}`;
        doc.fontSize(12).text(`Table ${data[index].id}`, xPosition, yPosition - 20, { align: 'center', width: qrCodeSize });
        doc.fontSize(20).text('Scannez notre menu', xPosition, yPosition + qrCodeSize + 10, { align: 'center', width: qrCodeSize });

        // Déplacer X pour le prochain QR code dans la même ligne
        xPosition += qrCodeSize + 50; // Ajuster pour l'espacement horizontal

        // Si la position dépasse la page, ajouter un saut de page
        if (yPosition + qrCodeSize + 100 >= doc.page.height - 100) {
          doc.addPage();
          yPosition = 20; // Reset Y position pour la nouvelle page
          xPosition = 20; // Reset X position pour la nouvelle ligne
        }
      });

      doc.end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to generate QR codes" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
