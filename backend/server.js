// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());

// const batteryTypes = {
//   type1: { cost: 120000, dimension: { width: 40, height: 10 }, energyDensity: 4000, imageUrl: '/images/battery1.png' },
//   type2: { cost: 150000, dimension: { width: 50, height: 12 }, energyDensity: 4500, imageUrl: '/images/battery2.png' },
//   type3: { cost: 180000, dimension: { width: 60, height: 14 }, energyDensity: 5000, imageUrl: '/images/battery3.png' },
//   type4: { cost: 200000, dimension: { width: 70, height: 16 }, energyDensity: 5500, imageUrl: '/images/battery4.png' },
// };

// app.post('/api/calculate', (req, res) => {
//   const { selections } = req.body; // { type1: 2, type2: 3, ... }
//   let totalCost = 0;
//   let totalLandSize = 0;
//   let totalEnergy = 0;
//   let totalTransformers = 0;

//   for (const [batteryType, quantity] of Object.entries(selections)) {
//     const battery = batteryTypes[batteryType];
//     if (!battery) {
//       return res.status(400).json({ error: 'Invalid battery type' });
//     }

//     totalCost += quantity * battery.cost;
//     totalLandSize += quantity * battery.dimension.width * battery.dimension.height;
//     totalEnergy += quantity * battery.energyDensity;
//     totalTransformers += Math.ceil(quantity / 4);
//   }

//   res.json({ totalCost, totalLandSize, totalEnergy, totalTransformers });
// });

// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
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


// app.put('/api/configure-batteries', (req, res) => {
//   const batteryConfig = req.body;

//   let totalCost = 0;
//   let totalEnergy = 0;
//   let layout = [];
//   let totalWidth = 0;
//   let totalHeight = 0;

//   batteryConfig.forEach(battery => {
//     const count = battery.quantity || 0;
//     if (count < 0) return res.status(400).json({ error: "Quantity must be a positive number" });
//     totalCost += count * battery.cost;
//     totalEnergy += count * battery.energy;
//     const [length, width] = battery.dimension.split('FT x ').map(Number);

//     for (let i = 0; i < count; i++) {
//       layout.push({ name: battery.name, length, width });
//     }
//   });

//   const transformersNeeded = Math.ceil(batteryConfig.reduce((acc, battery) => acc + (battery.quantity || 0), 0) / 4);
//   totalCost += transformersNeeded * 10000; // Transformer cost
//   totalEnergy += transformersNeeded * -0.25;

//   for (let i = 0; i < transformersNeeded; i++) {
//     layout.push({ name: 'Transformer', length: 10, width: 10 });
//   }

//   // Layout arrangement algorithm
//   layout.sort((a, b) => b.length - a.length); // Sort batteries by length
//   let currentRowWidth = 0;
//   let currentRowHeight = 0;
//   let totalArea = 0;

//   layout.forEach(item => {
//     if (currentRowWidth + item.length > 100) {
//       totalHeight += currentRowHeight;
//       currentRowWidth = 0;
//       currentRowHeight = 0;
//     }
//     currentRowWidth += item.length;
//     currentRowHeight = Math.max(currentRowHeight, item.width);
//     totalArea += item.length * item.width;
//   });

//   totalHeight += currentRowHeight;
//   totalWidth = 100; // Assuming the max width is 100ft

//   res.json({
//     totalCost,
//     totalEnergy,
//     totalArea,
//     transformersNeeded,
//     layoutWidth: totalWidth,
//     layoutHeight: totalHeight,
//     layout
//   });
// });



