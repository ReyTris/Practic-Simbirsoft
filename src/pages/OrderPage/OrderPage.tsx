import Container from '@/components/Layout/Container';
import Header from '@/components/Layout/Header';
import OrderBar from '@/components/OrderBar';
import { OrderNavMenu } from '@/components/OrderNavMenu/OrderNavMenu';
import { useAppDispatch } from '@/hooks/useDispatch';
import { PathNames } from '@/router/pathNames';
import { clearDataAfterModel, clearDataAfterPosition } from '@/store/OrderSlice';
import { UnknownAction } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

// interface IClearData {

// }

const clearData: Record<string, () => UnknownAction> = {
	[PathNames.POSITION_PAGE]: clearDataAfterPosition,
	[PathNames.MODEL_PAGE]: clearDataAfterModel
}

export const OrderPage = () => {
	const location = useLocation();
	const dispatch = useAppDispatch();
	const [currentPath, setCurrentPath] = useState<string>('');

	useEffect(() => {
		dispatch(clearData[location.pathname.split('/').pop()]());
	}, [currentPath]);

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
