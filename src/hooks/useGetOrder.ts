import { CarService } from '@/services/car.service';
import { useEffect, useState } from 'react';
import { useAppSelector } from './useDispatch';
import { RootState } from '@/store/store';
import { IOrderData } from '@/services/types.order';
import { useLocation } from 'react-router-dom';

export const useGetOrder = (id: number) => {
	const [order, setOrder] = useState<IOrderData>();
	const [loading, setLoading] = useState<boolean>(true);
	const location = useLocation();

	useEffect(() => {
		const fetchOrder = async () => {
			try {
				const response: IOrderData | null = await CarService.getOrderId(id);
				if (response) {
					const { data } = response;
					setOrder(data.data);
				}
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchOrder();
	}, [location.pathname]);
	return { order, loading };
};
