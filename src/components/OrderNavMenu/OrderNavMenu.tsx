import { dataOrderMenu } from '@/constants/nav-menu-data';
import { getLastPathPart } from '@/features/getLastPathPart';
import { OrderMenuLink } from './OrderMenuLink';

interface OrderNavMenuProps {
	currentPath?: string;
	className?: string;
}

export const OrderNavMenu = ({ currentPath, className }: OrderNavMenuProps) => {
	const currentIndex = dataOrderMenu.findIndex((item) => {
		return getLastPathPart(item.link) === currentPath;
	});

	return (
		<div className={className}>
			<ul className="flex">
				{dataOrderMenu.map(({ title, link, icon: IconComponent }, index) => (
					<li key={title} className="flex items-center">
						<OrderMenuLink
							title={title}
							link={link}
							isActived={index <= currentIndex}
						/>
						{IconComponent && <IconComponent className="mx-3" />}
					</li>
				))}
			</ul>
		</div>
	);
};
