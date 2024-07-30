import { useAppDispatch, useAppSelector } from '@/hooks/useDispatch';
import { useFetchCars } from '@/hooks/useFetchCars';
import { ICar } from '@/services/car.service';
import { updateModel } from '@/store/OrderSlice';
import { RootState } from '@/store/store';
import { Radio, RadioChangeEvent } from 'antd';
import { useEffect, useState } from 'react';
import { CarCard } from './components/CarCard';
import { CarCategoryFilter } from './components/CarCategoryFilter';
import { radioData } from '@/constants/radioData';

export const ModelPage = () => {
	const { type, id } = useAppSelector(
		(state: RootState) => state.order.data.model.fields.model
	);

	const [radioValue, setRadioValue] = useState<string>(
		type || radioData[0].value
	);
	const [filterCars, setFilterCars] = useState<ICar[]>([]);
	const [loadingCars, setLoadingCars] = useState(false);
	const [selectedCardId, setSelectedCardId] = useState<number | null>(id);

	const dispatch = useAppDispatch();

	const { cars, loading } = useFetchCars();
	const isFilterCars = (type: string) => {
		return cars.data.filter((item) => item.categoryId.name === type);
	};

	const onRadioChange = (e: RadioChangeEvent) => {
		setRadioValue(e.target.value);
	};

	const handlerSelectCar = (
		id: number,
		name: string,
		type: string,
		price: string
	) => {
		setSelectedCardId(id);
		dispatch(
			updateModel({
				model: name,
				type: type,
				id: id,
				price: price,
				status: true,
			})
		);
	};

	useEffect(() => {
		if (radioValue === 'Все') {
			setLoadingCars(loading);
			setFilterCars(cars.data);
		} else {
			setFilterCars(isFilterCars(radioValue));
		}
	}, [cars, radioValue]);

	return (
		<div className="">
			<CarCategoryFilter
				onRadioChange={onRadioChange}
				radioValue={radioValue}
			/>

			<div className="flex flex-wrap mt-12">
				{loadingCars
					? 'Загрузка...'
					: filterCars.map((item) => {
							const { id, name, priceMax, priceMin, thumbnail, categoryId } =
								item;
							return (
								<CarCard
									key={id}
									id={id}
									selectedCardId={selectedCardId}
									name={name}
									onClick={handlerSelectCar}
									priceMax={priceMax}
									priceMin={priceMin}
									imagePath={thumbnail.path}
									type={categoryId.name}
								/>
							);
					  })}
			</div>
		</div>
	);
};
