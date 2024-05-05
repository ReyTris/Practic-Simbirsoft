import Slider from '@/components/Slider';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
export const MainPage = () => {
	return (
		<div className="h-full flex">
			<div className="w-full md:w-1/2 h-full px-[32px] lg:px-[64px]">
				<Heading level="h1">
					Каршеринг <span className="text-main">Need for drive</span>
				</Heading>
				<Heading
					level="p"
					className="mt-[16px] md:mt-[34px] text-[18px] md:text-[26px]"
				>
					Поминутная аренда авто твоего города
				</Heading>
				<Button
					className="mt-[32px] md:mt-[60px] px-14"
					variant="bg-gradient-to-r from-[#0EC261] to-[#039F67]"
				>
					Забронировать
				</Button>
			</div>
			<Slider className="w-1/2 hidden md:block relative" />
		</div>
	);
};
