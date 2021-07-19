import { SiteClient } from 'datocms-client';

export default async function createCommunity(req, res) {
    if (req.method === 'POST') {
        const TOKEN = '467800d611a310062de2bbd7070cde'
        const client = new SiteClient(TOKEN);
        console.log(TOKEN);

        const record = await client.items.create(
        {
            itemType: "970997", // model IDg
            ...req.body
        });

        res.json({
            dados: 'Dados da Comunidades',
            newRecord: record,
        })

        return;
    }
    res.status(404).json({
        message: 'Ainda não temos nada aqui!!!!'
    })
}