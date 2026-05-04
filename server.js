const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname))); // Serve static files

const PORT = process.env.PORT || 3000;

// ===== ALL ROUTES → index.html =====
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log('');
  console.log('  🚀 iStore Stock Server läuft!');
  console.log(`  📍 http://localhost:${PORT}`);
  console.log('  🏦 Zahlung per Banküberweisung (IBAN)');
  console.log('');
});