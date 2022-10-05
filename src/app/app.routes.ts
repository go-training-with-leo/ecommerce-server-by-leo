import { RequestMethod } from '@nestjs/common';

export default {
  index: 'core',
  health: {
    path: '/health',
    method: RequestMethod.GET,
    jwtSecure: false,
  },
};
