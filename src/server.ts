import { fastify } from 'fastify';
import { fastifyCors } from '@fastify/cors';
import { validatorCompiler, serializerCompiler, ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { routes } from './routes';

const server = fastify().withTypeProvider<ZodTypeProvider>();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.register(fastifyCors, { origin: '*' });
server.register(fastifySwagger, {
   openapi: {
      info: {
         title: 'typed API',
         version: '1.0.0'
      }
   },
   transform: jsonSchemaTransform
});
server.register(fastifySwaggerUi, {
   routePrefix: '/docs',
});
server.register(routes);


server.listen({ port: 3333 }).then(() => console.log('HTTP server Running!'));