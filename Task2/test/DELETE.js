// DELETE.js
const axios = require('axios');
const { expect } = require('chai');
const { baseUrl } = require('./config');

const createTestItem = async () => {
    const create_data = {
        "sellerId": Math.floor(Math.random() * 100000),
        "name": "DELETE Test Pen " + Date.now(),
        "price": 1000,
        "statistics": {
            "likes": 100,
            "viewCount": 700,
            "contacts": 20
        }
    };
    const response = await axios.post(`${baseUrl}/api/1/item`, create_data);
    return response.data.status.split('- ')[1];
};

describe('DELETE /api/2/item - Удалить объявление по id', () => {
    it('TC-DELETE-001: Success response DELETE id (200)', async () => {
        const itemId = await createTestItem();
        
        const delete_response = await axios.delete(`${baseUrl}/api/2/item/${itemId}`);
        
        expect(delete_response.status).to.equal(200);
        expect(delete_response.data).to.be.empty;

        try {
            await axios.get(`${baseUrl}/api/1/item/${itemId}`);
            throw new Error('Объявление не было удалено');
        } catch (error) {
            expect(error.response.status).to.equal(404);
        }
    });
    
    it('TC-DELETE-002: Bad request DELETE id (400)', async () => {
        try {
            const bad_id = "invalid-id";
            await axios.delete(`${baseUrl}/api/2/item/${bad_id}`);
            throw new Error('The request must be ended by validation error');
        } catch (error) {
            if (error.response) {
                expect(error.response.status).to.equal(400);
            } else {
                throw error;
            }
        }
    });

    it('TC-DELETE-003: Not found DELETE id (404)', async () => {
        try {
            const not_found_id = "dad229af-986a-47bb-9b06-b594e99697a4";
            await axios.delete(`${baseUrl}/api/2/item/${not_found_id}`);
            throw new Error('The request must be ended by not found error');
        } catch (error) {
            if (error.response) {
                expect(error.response.status).to.equal(404);
            } else {
                throw error;
            }
        }
    });

    it('TC-DELETE-004: Method not allowed DELETE id (405)', async () => {
        const itemId = await createTestItem();
        
        try {
            await axios.get(`${baseUrl}/api/2/item/${itemId}`);
            throw new Error('The request must be ended by method not allowed error');
        } catch (error) {
            if (error.response) {
                expect(error.response.status).to.equal(405);
            } else {
                throw error;
            }
        }
    });
});