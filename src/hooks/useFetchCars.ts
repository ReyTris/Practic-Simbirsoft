import { CarService, ICarApiResponse } from '@/services/car.service';
import { useEffect, useState } from 'react';

export const useFetchCars = () => {
	const [cars, setCars] = useState<ICarApiResponse>({ data: [] });
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchCars = async () => {
			try {
				const response = await CarService.getAllCars();

				setCars(response.data);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};

		fetchCars();
	}, []);

	return { cars, loading };
};
