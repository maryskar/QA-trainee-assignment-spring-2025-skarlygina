// POST.js
const axios = require('axios');
const { expect } = require('chai');
const { baseUrl } = require('./config');

describe('POST /api/1/item - Сохранить объявление', () => {
    const baseItem = {
        "sellerId": 345624,
        "name": "Blue Pen",
        "price": 1500,
        "statistics": {
            "likes": 20,
            "viewCount": 300,
            "contacts": 5
        }
    };

    const createItem = async (itemData = baseItem) => {
        return axios.post(`${baseUrl}/api/1/item`, itemData, {
            headers: { 'Content-Type': 'application/json' }
        });
    };

    it('TC-POST-001: Success response POST (200)', async () => {
        const response = await createItem();
        expect(response.status).to.equal(200);
        expect(response.data).to.have.property('status');
    });

    it('TC-POST-002: Bad request for negative price (400)', async () => {
        try {
            await createItem({
                ...baseItem,
                price: -1500
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
        try {
            await createItem({
                ...baseItem,
                sellerId: 0
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

    it('TC-POST-005: Response should contain item ID (200)', async () => {
        const response = await createItem({
            ...baseItem,
            sellerId: 345625,
            name: "Red Pen",
            price: 2000,
            statistics: {
                likes: 30,
                viewCount: 400,
                contacts: 10
            }
        });
        
        expect(response.status).to.equal(200);
        expect(response.data).to.have.property('id');
        expect(response.data.id).to.be.a('string');
        expect(response.data.id).to.match(/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i);
    });
    it('TC-POST-006: Bad request for negative statistics (400)', async () => {
        try {
            await createItem({
                ...baseItem,
                statistics: {
                    likes: -30,
                    viewCount: -400,
                    contacts: -10
                }
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
    it('TC-POST-007: Bad request without name (400)', async () => {
        try {
            const invalidItem = { ...baseItem };
            delete invalidItem.name;
            
            await createItem(invalidItem);
            throw new Error('Expected 400 error for missing name');
        } catch (error) {
            if (error.response) {
                expect(error.response.status).to.equal(400);
                expect(error.response.data).to.have.property('message');
                expect(error.response.data.message.toLowerCase()).to.match(/name|required/);
            } else {
                throw error;
            }
        }
    });
});