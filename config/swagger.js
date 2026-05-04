import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Users API",
      version: "1.0.0",
      description: "API de usuarios (Node + Express)"
    },
    servers: [
      {
        url: "/node"
      }
    ],
    components: {
        schemas: {
            User: {
                type: "object",
                properties: {
                    id: { type: "string" },
                    email: { type: "string" },
                    name: { type: "string" },
                    addresses: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                street: { type: "string" },
                                city: { type: "string" },
                                country: { type: "string" }
                            }
                        }
                    }
                }
            }
        }
    }
  },
  apis: ["./routes/*.js"], // aquí va a leer los endpoints
};

const specs = swaggerJsdoc(options);

export const swaggerSpec = specs;
export default specs;