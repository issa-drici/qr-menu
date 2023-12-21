import type { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'

const form = formidable({ multiples: true })


type Data = {
    message?: string
} | any[]

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<Data>
) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }
    let fields;
    let files;
    try {
        [fields, files] = await form.parse(req);
        console.log(fields, files)

        const { error } = await supabase
  .from('countries')
  .update({ name: 'Australia' })
  .eq('id', 1)
       

        // Do whatever you'd like with the file since it's already in text
        // console.log(fileContent)

        res.status(200).send({ message: 'ok' })
    } catch (err) {
        console.log(err)
        res.status(400).send({ message: 'Bad Request' })
    }
}

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
}

export default handler