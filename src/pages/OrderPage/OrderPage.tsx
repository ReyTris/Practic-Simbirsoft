import Container from '@/components/Layout/Container';
import Header from '@/components/Layout/Header';
import { OrderNavMenu } from '@/components/OrderNavMenu/OrderNavMenu';
import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

export const OrderPage = () => {
	const location = useLocation();
	const [currentPath, setCurrentPath] = useState<string>('');

	useEffect(() => {
		setCurrentPath(location.pathname);
	}, [location.pathname]);

	return (
		<Container>
			<Header />
			<OrderNavMenu currentPath={currentPath} />
			<Outlet />
		</Container>
	);
};
