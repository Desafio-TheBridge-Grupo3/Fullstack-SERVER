const express = require('express')
const app = express()
const port = 3000


//middelwares
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


//para rutas no existentes
app.use('*',error404)

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})