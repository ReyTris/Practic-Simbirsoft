import { PathNames } from '@/router/pathNames';
import { INavMenuLink } from './types';

export const dataNavMenu: INavMenuLink[] = [
	{ title: 'Парковка', link: PathNames.PARKING_PAGE },
	{ title: 'Страховка', link: PathNames.INSURANCE_PAGE },
	{ title: 'Бензин', link: PathNames.GASOLINE_PAGE },
	{ title: 'Обслуживание', link: PathNames.SERVICE_PAGE },
];
