const request = require('supertest');
const app = require('./server'); 

describe('GET /api/batteries', () => {
  it('responds with JSON containing the list of batteries', async () => {
    const response = await request(app).get('/api/batteries');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { type: 'Megapack 2XL', name: 'Megapack 2XL', dimension: '40FT x 10FT', energy: 4, cost: 120000, releaseDate: 2022, quantity: 0 },
      { type: 'Megapack 2', name: 'Megapack 2', dimension: '30FT x 10FT', energy: 3, cost: 80000, releaseDate: 2021, quantity: 0 },
      { type: 'Megapack', name: 'Megapack', dimension: '30FT x 10FT', energy: 2, cost: 50000, releaseDate: 2005, quantity: 0 },
      { type: 'Powerpack', name: 'Powerpack', dimension: '10FT x 10FT', energy: 1, cost: 20000, releaseDate: 2000, quantity: 0 },
      { type: 'Transformer', name: 'Transformer', dimension: '10FT x 10FT', energy: -0.25, cost: 10000, releaseDate: 2022, quantity: 0 }
    ]);
  });
});

describe('PUT /api/configure-batteries', () => {

    it('returns 400 for negative quantity input', async () => {
        const batteryConfig = [
          { type: 'Megapack 2XL', quantity: -1 },
          { type: 'Megapack 2', quantity: 1 },
          { type: 'Transformer', quantity: 0 }
        ];
    
        const response = await request(app)
          .put('/api/configure-batteries')
          .send(batteryConfig)
          .set('Accept', 'application/json');
    
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Invalid input: quantity must be non-negative' });
      });
    it('responds with calculated totals based on battery configuration', async () => {
        const batteryConfig = [
            { type: 'Megapack 2XL', name: 'Megapack 2XL', dimension: '40FT x 10FT', energy: 4, cost: 120000, releaseDate: 2022, quantity: 1 },
            { type: 'Megapack 2', name: 'Megapack 2', dimension: '30FT x 10FT', energy: 3, cost: 80000, releaseDate: 2021, quantity: 0 },
            { type: 'Megapack', name: 'Megapack', dimension: '30FT x 10FT', energy: 2, cost: 50000, releaseDate: 2005, quantity: 2 },
            { type: 'Powerpack', name: 'Powerpack', dimension: '10FT x 10FT', energy: 1, cost: 20000, releaseDate: 2000, quantity: 0 },
            { type: 'Transformer', name: 'Transformer', dimension: '10FT x 10FT', energy: -0.25, cost: 10000, releaseDate: 2022, quantity: 0 }
          ]
      
        const response = await request(app)
          .put('/api/configure-batteries')
          .send(batteryConfig)
          .set('Accept', 'application/json');
      
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          totalCost: 220000, 
          totalEnergy: 8, 
          totalArea: 1000,
          transformersNeeded: 0, 
          carbonFootprint: 0.8 
        });
      });
      

  
});
