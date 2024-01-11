require("./config/sqlConnection");
const express = require('express')
const cors = require('cors');
const helmet = require('helmet');
const app = express()
const port = 3000

// PERMITIR EL ACCESO DEL FRONT AL BACK 
app.use(cors({origin:true, credentials:true}))

// PAQUETE PARA IMPLEMENTAR SEGURIDAD EN LA APLICACIÓN
// Set Content Security Policies
const scriptSources = ["'self'", "'unsafe-inline'", "'unsafe-eval'"];

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: scriptSources,
      "img-src": ["'self'", "https:", "data:"],
    },
  })
);

//middlewares
const error404 = require('./middlewares/error404')
const morgan = require('./middlewares/morgan')

// Logger
app.use(morgan(':method :host :status :param[id] - :response-time ms :body'));


/* //swagger- documentation
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
 */
app.use(express.json()); // Habilito recepción de JSON en servidor

//rutas
app.get('/', (req, res) => {
  res.send('Hello World!')
})

const advisorRouter = require('./routes/advisor.route');
const addressRouter = require("./routes/address.route");
const ciaClientRouter = require("./routes/ciaClient.route");
const consumptionRouter = require("./routes/consumption.route");
const priceRouter = require("./routes/price.route");
const totalRouter = require("./routes/total.route");

app.use("/advisor", advisorRouter);
app.use("/address", addressRouter);
app.use("/cia-client", ciaClientRouter);
app.use("/consumption", consumptionRouter);
app.use("/price", priceRouter);
app.use("/total", totalRouter);


//para rutas no existentes
app.use('*',error404)

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})