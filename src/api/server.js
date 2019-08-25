const express = require('express');

const app = express();

app.get('/api/author', (req, res) => {
  const customers = [
    {id: 1, firstName: 'Ravi', lastName: 'Prajna'},
  ];

  res.json(customers);
});

//const PORT = process.env.PORT || 5000;
const PORT = 5000;

app.listen(PORT, () => `Server running on port ${PORT}`);