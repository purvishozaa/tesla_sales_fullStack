
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
const port = 3001;


const batteries = [
  { type: 'Megapack 2XL',name: 'Megapack 2XL', dimension: '40FT x 10FT', energy: 4, cost: 120000,releaseDate: 2022,quantity:0  },
  { type: 'Megapack 2',name: 'Megapack 2', dimension: '30FT x 10FT', energy: 3, cost: 80000, releaseDate: 2021,quantity:0 },
  { type: 'Megapack',name: 'Megapack', dimension: '30FT x 10FT', energy: 2, cost: 50000,releaseDate: 2005,quantity:0 },
  { type: 'Powerpack', name: 'Powerpack',dimension: '10FT x 10FT', energy: 1, cost: 20000,releaseDate: 2000,quantity:0  },
  { type: 'Transformer',name: 'Transformer', dimension: '10FT x 10FT', energy: -0.25, cost: 10000,releaseDate: 2022,quantity:0  },
];

app.get('/api/batteries', (req, res) => {
  res.json(batteries);
});





// Battery details (as per previous setup)


// Endpoint to configure batteries
app.put('/api/configure-batteries', (req, res) => {
  const batteryConfig = req.body;

  let totalCost = 0;
  let totalEnergy = 0;
  let totalArea = 0;
  let totalBatteryCount = 0;
  let carbonFootprint = 0;

 
  batteryConfig.forEach(battery => {
    const count = battery.quantity || 0;

    
    if (count < 0) return res.status(400).json({ error: 'Invalid input: quantity must be non-negative' });
    totalCost += count * battery.cost;
    totalEnergy += count * battery.energy;
    carbonFootprint += (battery.energy * battery.quantity) * 0.1;

    const dimensionMatch = battery.dimension.match(/(\d+)FT x (\d+)FT/);
    if (dimensionMatch) {
      const length = parseInt(dimensionMatch[1], 10);
      const width = parseInt(dimensionMatch[2], 10);
      totalArea += count * length * width;
    }

    totalBatteryCount += count;
  });

  const transformersNeeded = Math.floor(totalBatteryCount / 4);
  totalCost += transformersNeeded * 10000; // Transformer cost
  totalEnergy += transformersNeeded * -0.25;
  totalArea += transformersNeeded * 10 * 10; // Transformer area

  res.json({
    totalCost,
    totalEnergy,
    totalArea,
    transformersNeeded,
    carbonFootprint
  });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

module.exports = app;




