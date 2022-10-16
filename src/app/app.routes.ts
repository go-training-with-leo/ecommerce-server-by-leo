import { RequestMethod } from '@nestjs/common';

import { IRouteParams } from '@/decorators';

export default {
  index: 'core',
  health: <IRouteParams>{
    path: '/health',
    method: RequestMethod.GET,
    jwtSecure: false,
  },
};
