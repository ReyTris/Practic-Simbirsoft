import Container from '@/components/Layout/Container';
import Header from '@/components/Layout/Header';
import OrderBar from '@/components/OrderBar';
import { OrderNavMenu } from '@/components/OrderNavMenu/OrderNavMenu';
import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

export const OrderPage = () => {
	const location = useLocation();
	const [currentPath, setCurrentPath] = useState<string>('');
	const [orderData, setOrderData] = useState({
		city: '',
		street: '',
	});

	useEffect(() => {
		setCurrentPath(location.pathname);
	}, [location.pathname]);

	return (
		<Container>
			<Header />
			<OrderNavMenu currentPath={currentPath} />
			<div className='flex gap-[32px]'>
				<div className='w-[100%]'>
					<Outlet />
				</div>
				<OrderBar className='w-[300px]' />
			</div>
		</Container>
	);
};
