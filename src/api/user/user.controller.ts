import { InjectController } from '@/common/decorators';

import userRoutes from './user.routes';
import { UserService } from './user.service';

@InjectController({ name: userRoutes.index })
export class UserController {
  constructor(private readonly userService: UserService) {}
}
