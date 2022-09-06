import { InjectController } from '@/common/decorators';

import tokenRoutes from './token.routes';

@InjectController({ name: tokenRoutes.index })
export class TokenController {}
