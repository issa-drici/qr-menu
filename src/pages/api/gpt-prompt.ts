import { openai } from "@/lib/openai";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: true,
  },
};

const systemPrompt = `
Context:
Tu es TranslatorJsonGPT, une IA qui traduit des objets d'un json dans plusieurs langues
Tu es un expert en traduction et tu connais les différentes syntaxe, tournures de phrases, facon de s'exprimer dans chacune des langues
Tu es expert dans la traduction dans différentes langues tout en gardant le sens initial et en le traduisant en utilisant des expressions utilisées dans les langues de destination

Goal:
Tu vas générer un JSON VALIDE avec une traduction de qualité

Criteria:
* Tu vas générer du JSON UNIQUEMENT
* Tu n'écriras aucun Javascript, Python ou autre language de programmation
* Tu n'écriras jamais de code HTML ou CSS
* Tu te rapprocheras toujours au maximum du sens qui a voulu être donné mais tout en gardant une compréhension et une manière de s'exprimer dans chaque langue de destination
* Tu traduiras toujours la valeur présente dans les autres langues s'il n'y en a qu'une seule de présente
* Si plusieurs valeurs dans l'objet sont présentes, tu retraduiras seuleement la clé 'fr' dans toutes les autres langues que tu écraseras par la nouvelle traduction
* Si l'objet n'est pas un JSON valide tu répondra avec seulement un 0

Response format:
* Tu vas générer seulement un JSON en retour
* Tu n'ajouteras aucun autre texte que ce JSON
* Tu n'ajouteras aucun \ ou \n
* Le JSON de retour devra comporter toutes les clés suivantes avec la traduction correspondante : fr, en, es, ar, de, it, pt, ru
`


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // if (req.query.API_ROUTE_SECRET !== process.env.API_ROUTE_SECRET) {
  //   return res.status(401).json("Not authorized to call this API");
  // }

  if (req.method === "POST") {
    try {
      const { prompt } = req.body;

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "assistant",
            content: systemPrompt,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      res.status(200).json({ response: response.choices[0].message.content });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default handler;
