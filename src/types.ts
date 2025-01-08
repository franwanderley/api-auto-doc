import { FastifyBaseLogger, FastifyInstance, FastifyTypeProvider, RawReplyDefaultExpression, RawRequestDefaultExpression, RawServerBase, RawServerDefault } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

export type fastifyTypeInstance = FastifyInstance<
   RawServerDefault,
   RawRequestDefaultExpression,
   RawReplyDefaultExpression,
   FastifyBaseLogger,
   ZodTypeProvider
>;