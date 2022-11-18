import { InjectController } from '@/decorators';

import detailInvoiceItemRoutes from './detail-invoice-item.routes';

@InjectController({ name: detailInvoiceItemRoutes.index })
export class DetailInvoiceItemController {}
