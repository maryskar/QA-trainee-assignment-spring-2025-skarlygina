// GET.js
const axios = require('axios');
const { expect } = require('chai');
const { baseUrl } = require('./config');

describe('GET - Получить объявление по id', () => {
    it('TC-GET-001: Success response GET id (200)', async () => {
        const create_data = {
            "sellerId": 783925,
            "name": "GET New Pen",
            "price": 1000,
            "statistics": {
                "likes": 100,
                "viewCount": 700,
                "contacts": 20
            }
        };
    
        const create_response = await axios.post(`${baseUrl}/api/1/item`, create_data);
        const created_id = create_response.data.status.split('- ')[1];
        const get_response = await axios.get(`${baseUrl}/api/1/item/${created_id}`);
        
        expect(get_response.status).to.equal(200);
        expect(Array.isArray(get_response.data)).to.be.true;
        expect(get_response.data[0].id).to.equal(created_id);
    });
    
    it('TC-GET-002: Bad request GET id (200)', async () => {
        try {
            const bad_id = "ddh389";
            const response = await axios.get(`${baseUrl}/api/1/item/${bad_id}`);
            throw new Error('The request must be ended by validation error');
        } catch (error) {
            if (error.response) {
                expect(error.response.status).to.equal(400);
            } else {
                throw error;
            }
        }
    });

    it('TC-GET-003: Not found GET id (200)', async () => {
        try {
            const not_found_id = "dad229af-986a-47bb-9b06-b594e99697a4";
            const response = await axios.get(`${baseUrl}/api/1/item/${not_found_id}`);
            throw new Error('The request must be ended by validation error');
        } catch (error) {
            if (error.response) {
                expect(error.response.status).to.equal(404);
            } else {
                throw error;
            }
        }
    });

});


describe('GET - Получить статистику по id', () => {
    it('TC-GET-004: Success response GET statistics by id (200)', async () => {
        // 1. Создаем тестовое объявление
        const create_data = {
            "sellerId": 783125,
            "name": "Amazing Pen",
            "price": 10000,
            "statistics": {
                "likes": 5421,
                "viewCount": 56723,
                "contacts": 90
            }
        };
        
        const create_response = await axios.post(`${baseUrl}/api/1/item`, create_data);
        const created_id = create_response.data.status.split('- ')[1];
        const get_response = await axios.get(`${baseUrl}/api/1/statistic/${created_id}`);
        
        expect(get_response.status).to.equal(200);
        expect(Array.isArray(get_response.data)).to.be.true;
        expect(get_response.data).to.have.lengthOf(1);

        const expectedStats = {
            likes: 5421,
            viewCount: 56723,
            contacts: 90
        };
        expect(get_response.data[0]).to.deep.include(expectedStats);
        expect(get_response.data[0]).to.have.all.keys(
            'likes',
            'viewCount',
            'contacts'
        );

    });
});

describe('GET - Получить объявления по sellerID', () => {
    const testSellerId = 783925;
    const nonExistentSellerId = 567898;
    const testItemIds = [ "cb43dc61-82cd-42d8-b372-0ed13f391723", "d8afb350-63da-48bc-a475-84829739fd6d", "c219bfa6-6c0a-4d73-923f-4bbd7d7d7487"];

    it('TC-GET-005: ok GET all by sellerID', async () => {
        
        for (const itemId of testItemIds) {
            try {
                const response = await axios.get(`${baseUrl}/api/1/item/${itemId}`);
                expect(response.data[0].sellerId).to.equal(testSellerId);
            } catch (error) {
                console.error(`Error with data request ${itemId}:`, error.message);
                throw error;
            }
        }
    });


    it('TC-GET-006: GET for empty sellerId expected []', async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/1/items?sellerId=${nonExistentSellerId}`);          
            expect(response.status).to.equal(200);
            expect(response.data).to.be.an('array').that.is.empty;
        } catch (error) {
            expect(error.response?.status).to.equal(404);
            expect(error.response?.data).to.deep.equal({
                message: 'route /api/1/items not found',
                code: 400
            });
        }
    });
});


describe('GET - Получить статистику по объявлению id', () => {
    
    it('TC-GET-007: Success response GET statistics by id (200)', async () => {
        const create_data = {
            "sellerId": 783125,
            "name": "Amazing Pen",
            "price": 10000,
            "statistics": {
                "likes": 5421,
                "viewCount": 56723,
                "contacts": 90
            }
        };
        const create_response = await axios.post(`${baseUrl}/api/1/item`, create_data);
        const created_id = create_response.data.status.split('- ')[1];
        const get_response = await axios.get(`${baseUrl}/api/2/statistic/${created_id}`);
        
        expect(get_response.status).to.equal(200);
        expect(Array.isArray(get_response.data)).to.be.true;
        expect(get_response.data).to.have.lengthOf(1);

        const expectedStats = {
            likes: 5421,
            viewCount: 56723,
            contacts: 90
        };
        expect(get_response.data[0]).to.deep.include(expectedStats);
        expect(get_response.data[0]).to.have.all.keys(
            'likes',
            'viewCount',
            'contacts'
        );
    });
});