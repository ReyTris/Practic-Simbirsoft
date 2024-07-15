import Container from '@/components/Layout/Container';
import Header from '@/components/Layout/Header';
import OrderBar from '@/components/OrderBar';
import { OrderNavMenu } from '@/components/OrderNavMenu/OrderNavMenu';
import { getLastPathPart } from '@/features/getLastPathPart';
import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';


export const OrderPage = () => {
	const location = useLocation();
	const [currentPath, setCurrentPath] = useState<string>('');

	useEffect(() => {
		setCurrentPath(getLastPathPart(location.pathname));
	}, [location.pathname]);

	return (
		<Container>
			<Header />
			<OrderNavMenu
				currentPath={currentPath}
				className="py-2 border-y border-grayLight"
			/>
			<div className="flex justify-between gap-[32px]">
				<div className="pt-8">
					<Outlet />
				</div>
				<OrderBar className="w-[350px] pl-8 pt-8 border-l border-grayLight" />
			</div>
		</Container>
	);
};
