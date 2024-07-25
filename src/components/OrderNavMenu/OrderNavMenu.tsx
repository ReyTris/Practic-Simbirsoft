import { dataOrderMenu } from '@/constants/nav-menu-data';
import { getLastPathPart } from '@/features/getLastPathPart';
import { useAppSelector } from '@/hooks/useDispatch';
import { RootState } from '@/store/store';
import { IOrderData } from '@/store/types';
import { OrderMenuLink } from './OrderMenuLink';

interface OrderNavMenuProps {
	currentPath?: string;
	className?: string;
}

export const OrderNavMenu = ({ currentPath, className }: OrderNavMenuProps) => {
	const currentIndex = dataOrderMenu.findIndex((item) => {
		return getLastPathPart(item.link) === currentPath;
	});

	const orderStatus = useAppSelector((state: RootState) => state.order.data[currentPath as keyof IOrderData]?.button.status);

	return (
		<div className={className}>
			<ul className="flex flex-wrap">
				{dataOrderMenu.map(({ title, link, icon: IconComponent }, index) => (
					<li key={title} className="flex items-center">
						<OrderMenuLink
							title={title}
							link={link}
							isActived={index <= currentIndex || (orderStatus && index === currentIndex + 1)}
						/>
						{IconComponent && <IconComponent className="mx-3" />}
					</li>
				))}
			</ul>
		</div>
	);
};
