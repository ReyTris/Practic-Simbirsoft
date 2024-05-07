import Container from '@/components/Layout/Container';
import Header from '@/components/Layout/Header';
import Slider from '@/components/Slider';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
export const MainPage = () => {
	return (
		<div className="h-full flex">
			<div className="w-full lg:w-3/5 xl:w-1/2">
				<Container className="flex flex-col">
					<Header />
					<div className="mt-[140px]">
						<Heading level="h1">
							Каршеринг <br /> <span className="text-main">Need for drive</span>
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
					<div className="mt-auto flex justify-between items-center py-[32px]">
						<Heading className="text-gray" level="p">
							© 2016-2019 «Need for drive»
						</Heading>
						<Button to="tel:84952342244" className="text-black">
							8 (495) 234-22-44
						</Button>
					</div>
				</Container>
			</div>
			<Slider className="w-2/5 xl:w-1/2 hidden lg:block relative" />
		</div>
	);
};
