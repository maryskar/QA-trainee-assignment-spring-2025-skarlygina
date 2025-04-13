// POST.js
const axios = require('axios');
const { expect } = require('chai');
const { baseUrl } = require('./config');

describe('POST - Сохранить объявление', () => {
    it('TC-POST-001: Success response POST (200)', async () => {
        const data = {
            "sellerId": 345624,
            "name": "Blue Pen",
            "price": 1500,
            "statistics": {
                "likes": 20,
                "viewCount": 300,
                "contacts": 5
            }
        };

        const response = await axios.post(`${baseUrl}/api/1/item`, data, {
            headers: { 'Content-Type': 'application/json' }
        });
        expect(response.status).to.equal(200);
        expect(response.data).to.have.property('status');
    });

    it('TC-POST-002: Bad request for negative price (400)', async () => {
        const data = {
            "sellerId": 567289,
            "name": "Next Pen",
            "price": -1500,
            "statistics": {
                "likes": 20,
                "viewCount": 300,
                "contacts": 5
            }
        };
    
        try {
            await axios.post(`${baseUrl}/api/1/item`, data, {
                headers: { 'Content-Type': 'application/json' }
            });
            throw new Error('The request must be ended by validation error');
        } catch (error) {
            if (error.response) {
                expect(error.response.status).to.equal(400);
            } else {
                throw error;
            }
        }
    });
    
    it('TC-POST-003: Bad request for sellerId out of range (400)', async () => {
        const data = {
            "sellerId": 0,
            "name": "Next Pen",
            "price": 100,
            "statistics": {
                "likes": 20,
                "viewCount": 300,
                "contacts": 5
            }
        };
    
        try {
            await axios.post(`${baseUrl}/api/1/item`, data, {
                headers: { 'Content-Type': 'application/json' }
            });
            throw new Error('The request must be ended by validation error');
        } catch (error) {
            if (error.response) {
                expect(error.response.status).to.equal(400);
            } else {
                throw error;
            }
        }
    });
    it('TC-POST-004: Empty body request (400)', async () => {
        try {
            await axios.post(`${baseUrl}/api/1/item`, {}, {
                headers: { 'Content-Type': 'application/json' }
            });
            throw new Error('Expected 400 error');
        } catch (error) {
            if (error.response) {
                expect(error.response.status).to.equal(400);
            } else {
                throw error;
            }
        }
    });
});