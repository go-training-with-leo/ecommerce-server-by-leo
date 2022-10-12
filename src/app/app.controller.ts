import { InjectController, InjectRoute } from '@/decorators';

import appRoutes from './app.routes';

@InjectController({
  isCore: true,
  name: appRoutes.index,
})
export class AppController {
  @InjectRoute(appRoutes.health)
  getHealth(): string {
    return 'Ok!';
  }
}
