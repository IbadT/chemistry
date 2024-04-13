require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors())

app.use(express.json());

const swaggerDoc = require('./generate-docs.js');
const swaggerUi = require('swagger-ui-express');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

const routes = require('./routes/index.js');
app.use('/api', routes);

app.listen(process.env.PORT, () => console.log("Server is started..."));