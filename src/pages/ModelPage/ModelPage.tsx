import { useAppDispatch, useAppSelector } from '@/hooks/useDispatch';
import { useCars } from '@/hooks/useCars';
import { clearAdditional, updateModel } from '@/store/OrderSlice';
import { RootState } from '@/store/store';
import { RadioChangeEvent } from 'antd';
import { useState } from 'react';
import { CarCard } from './components/CarCard';
import { CarCategoryFilter } from './components/CarCategoryFilter';
import { radioData } from '@/constants/radioData';
import { CarService, ICar } from '@/services/car.service';

export const ModelPage = () => {
	const { type, id } = useAppSelector(
		(state: RootState) => state.order.data.model.fields.model
	);

	const [radioValue, setRadioValue] = useState<string>(
		type || radioData[0].value
	);
	const [selectedCardId, setSelectedCardId] = useState<number | null>(id);

	const dispatch = useAppDispatch();

	const { cars, loading } = useCars(radioValue);

	const onRadioChange = (e: RadioChangeEvent) => {
		setRadioValue(e.target.value);
	};

	const handlerSelectCar = (
		id: number,
		name: string,
		price: string,
		colors: string[],
		number: string,
		imagePath: string,
		car: ICar
	) => {
		setSelectedCardId(id);
		dispatch(
			updateModel({
				model: name,
				id,
				price,
				type: radioValue,
				status: true,
				colors,
				number,
				imagePath,
				car,
			})
		);

		dispatch(clearAdditional());
	};

	return (
		<div className="">
			<CarCategoryFilter
				onRadioChange={onRadioChange}
				radioValue={radioValue}
			/>

			<div className="flex flex-wrap mt-12">
				{loading
					? 'Загрузка...'
					: cars.map((car) => {
							const {
								id,
								name,
								priceMax,
								priceMin,
								thumbnail,
								colors,
								number,
							} = car;
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
									colors={colors}
									number={number}
									car={car}
								/>
							);
					  })}
			</div>
		</div>
	);
};
