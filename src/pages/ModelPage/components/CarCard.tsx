import { Heading } from '@/components/ui/Heading';
import cn from 'classnames';

interface CarCardProps {
	name: string;
	id: number | null;
	priceMax: number;
	priceMin: number;
	imagePath: string;
	onClick: (id: number, name: string, type: string) => void;
	selectedCardId: number;
	type: string;
}

export const CarCard = ({
	name,
	id,
	priceMax,
	priceMin,
	imagePath,
	selectedCardId,
	type,
	onClick,
}: CarCardProps) => {
	return (
		<div
			key={id}
			className={cn(
				'relative w-1/2 max-md:w-full h-[224px] p-4 border border-[#EEEEEE] hover:border-gray cursor-pointer overflow-hidden',
				{ 'border-main': selectedCardId == id }
			)}
			onClick={() => onClick(id, name, type)}
		>
			<div className="">
				<Heading level="h4" className="uppercase text-[18px]">
					{name}
				</Heading>
				<span className="text-[14px] text-gray">
					{priceMin} - {priceMax}
				</span>
				<img
					src={imagePath}
					alt={name}
					className="absolute w-[256px] bottom-0-0 right-0 -z-10"
				/>
			</div>
		</div>
	);
};
