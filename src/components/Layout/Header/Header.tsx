import MainLogo from '@/assets/icons/Logo.svg';
import PointIcon from '@/assets/icons/point.svg';
import { Heading } from '@/components/ui/Heading';
import cn from 'classnames';

interface HeaderProps {
	className?: string;
}

export const Header = ({ className }: HeaderProps) => {
	return (
		<div className={cn(className, 'flex justify-between py-[32px]')}>
			<MainLogo />
			<div className="flex items-center">
				<PointIcon className="mr-2" />
				<Heading level="p"> Ульяновск </Heading>
			</div>
		</div>
	);
};
