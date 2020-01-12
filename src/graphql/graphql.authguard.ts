import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

// Special GraphQL middleware which extends the standard NestJS Passport Authguard
// Retrieves original request object from context as specified in application.module.ts
@Injectable()
export class GqlAuthGuard extends AuthGuard() {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}