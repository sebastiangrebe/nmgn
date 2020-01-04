
import { createParamDecorator } from '@nestjs/common';

// TypeScript decorator to retreive user from request object
export const CurrentUser = createParamDecorator(
  (data, [root, args, ctx, info]) => ctx.req.user,
);