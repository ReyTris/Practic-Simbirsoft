import { dataOrderMenu } from '@/constants/nav-menu-data';
import { OrderMenuLink } from './OrderMenuLink';

interface OrderNavMenuProps {
	currentPath?: string;
}

export const OrderNavMenu = ({ currentPath }: OrderNavMenuProps) => {
	const getLastPathPart = (path: string) => path.split('/').pop();

	const currentIndex = dataOrderMenu.findIndex(item => {
		return getLastPathPart(item.link) === getLastPathPart(currentPath);
	});

	// const handleClick = (path: any) => {
	// 	console.log(path);

	// 	setCurrentPath(path);
	// };
	return (
		<div>
			<ul className='flex'>
				{dataOrderMenu.map(({ title, link, icon: IconComponent }, index) => (
					<li key={title} className='flex items-center'>
						<OrderMenuLink
							title={title}
							link={link}
							isActived={index <= currentIndex}
						/>
						{IconComponent && <IconComponent className='mx-3' />}
					</li>
				))}
			</ul>
		</div>
	);
};
