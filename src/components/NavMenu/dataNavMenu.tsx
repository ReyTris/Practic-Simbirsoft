import InstagramIcon from '@/assets/icons/Instagram.svg';
import FBIcon from '@/assets/icons/fb.svg';
import TelegramIcon from '@/assets/icons/telega.svg';
import { PathNames } from '@/router/pathNames';
import { INavMenuLink, ISocialLink } from './types';

export const dataNavMenu: INavMenuLink[] = [
	{ title: 'Парковка', link: PathNames.PARKING_PAGE },
	{ title: 'Страховка', link: PathNames.INSURANCE_PAGE },
	{ title: 'Бензин', link: PathNames.GASOLINE_PAGE },
	{ title: 'Обслуживание', link: PathNames.SERVICE_PAGE },
];

export const socialLinks: ISocialLink[] = [
	{ link: '#', icon: TelegramIcon },
	{ link: '#', icon: FBIcon },
	{ link: '#', icon: InstagramIcon },
];
