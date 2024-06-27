import Container from '@/components/Layout/Container';
import Header from '@/components/Layout/Header';
import OrderBar from '@/components/OrderBar';
import { OrderNavMenu } from '@/components/OrderNavMenu/OrderNavMenu';
import { getLastPathPart } from '@/features/getLastPathPart';
import { useAppDispatch } from '@/hooks/useDispatch';
import { PathNames } from '@/router/pathNames';
import {
	clearDataAfterModel,
	clearDataAfterPosition,
} from '@/store/OrderSlice';
import { UnknownAction } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

// interface IClearData {

// }

const clearDataActions: Record<string, () => UnknownAction> = {
	[PathNames.POSITION_PAGE]: clearDataAfterPosition,
	[PathNames.MODEL_PAGE]: clearDataAfterModel,
};

export const OrderPage = () => {
	const location = useLocation();
	const dispatch = useAppDispatch();
	const [currentPath, setCurrentPath] = useState<string>('');

	useEffect(() => {
		dispatch(clearDataActions[location.pathname.split('/').pop()]());
	}, [currentPath]);

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
