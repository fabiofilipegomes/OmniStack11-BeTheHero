const connection = require('../database/connection');

const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {

    async Get(request, response) {
        const { id } = request.params;
        const ong = await connection('ongs')
            .where('id', id)
            .select('*')
            .first();
    
        return response.json(ong);
    },

    async GetAll(request, response) {
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    async Create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;
        const id = generateUniqueId();
        await connection('ongs').insert({
            id,
            name, 
            email, 
            whatsapp,
            city,
            uf,
        });
    
        return response.json({ id });
    }
};