import { InjectController } from '@/decorators';

import codeRoutes from './code.routes';

@InjectController({ name: codeRoutes.index })
export class CodeController {}
