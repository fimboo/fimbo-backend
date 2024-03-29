import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Fimboo',
      version: '1.0.0',
      description: 'Welcome to fimboo',
      servers: ['https://localhost:'],
    },
  },
  apis: ['docs/*.js','docs/controllers/*.js','docs/models/*.js','docs/models/*.yml','docs/controllers/*.yml'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default swaggerDocs;