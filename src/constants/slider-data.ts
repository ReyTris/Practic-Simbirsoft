import { ISwiperSlide } from '@/components/types/slider';

import GazolineImage from '@/assets/images/gazoline.png';
import InsuranceImage from '@/assets/images/insurance.png';
import ParkingImage from '@/assets/images/parking.png';
import ServicesImage from '@/assets/images/services.png';

export const dataSlider: ISwiperSlide[] = [
	{
		title: 'Бесплатный парковка',
		preview:
			'Оставляйте машину на платных городских парковках и разрешенных местах, не нарушая ПДД, а также в аэропортах.',
		bgButton: 'bg-gradient-to-r from-[#13493F] to-[#0C7B1B]',
		imagePath: ParkingImage,
	},
	{
		title: 'Страховка',
		preview: 'Полная страховка страховка автомобиля',
		bgButton: 'bg-gradient-to-r from-[#132949] to-[#0C7B67]',
		imagePath: InsuranceImage,
	},
	{
		title: 'Бензин',
		preview: 'Полный бак на любой заправке города за наш счёт',
		bgButton: 'bg-gradient-to-r from-[#493013] to-[#7B0C3B]',
		imagePath: GazolineImage,
	},
	{
		title: 'Обслуживание',
		preview: 'Автомобиль проходит еженедельное ТО',
		bgButton: 'bg-gradient-to-r from-[#281349] to-[#720C7B]',
		imagePath: ServicesImage,
	},
];
