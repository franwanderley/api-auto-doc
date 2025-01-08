import { FastifyInstance } from 'fastify';
import z from 'zod';
import { fastifyTypeInstance } from './types';
import { randomUUID } from 'crypto';

interface User {
   id: string;
   email: string;
   name: string;
};
const users: User[] = []; 

export const routes = async (server: fastifyTypeInstance) => {
   server.get('/users', {
      schema: {
         description: "list all users",
         tags: ['users'],
         response: {
            200: z.array(z.object({
               id: z.string(),
               name: z.string(),
               email: z.string()
            }))
         }
      }
   },(_, reply) => users);

   server.post('/users', {
      schema: {
         description: "create a new user",
         tags: ['users'],
         body: z.object({
            name: z.string(),
            email: z.string().email()
         }),
         response: {
            201: z.null().describe('User created')
         }
      }
   }, async (request, reply) => {
      const { name, email } = request.body;
      users.push({ name, email, id: randomUUID() });
      return reply.status(201).send();
   });
};
