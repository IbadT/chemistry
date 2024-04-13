const swaggerJsDoc = require('swagger-jsdoc');

const option = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Api for chemistry",
            server: ["http://localhost:3000"],
            version: "1.0.0"
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    name: "Authorization",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }
    },
    apis: ['./routes/*.js']
};

const swaggerDoc = swaggerJsDoc(option);

module.exports = swaggerDoc;