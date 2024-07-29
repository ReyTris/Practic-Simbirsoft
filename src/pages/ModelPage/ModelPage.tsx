import { Heading } from '@/components/ui/Heading';
import { useAppDispatch, useAppSelector } from '@/hooks/useDispatch';
import { useFetchCars } from '@/hooks/useFetchCars';
import { ICar } from '@/services/car.service';
import { updateModel } from '@/store/OrderSlice';
import { RootState } from '@/store/store';
import { Radio, RadioChangeEvent } from 'antd';
import { useEffect, useState } from 'react';

export const ModelPage = () => {
	const { type, name } = useAppSelector(
		(state: RootState) => state.order.data.model.fields.model
	);

	console.log(type || 'Все');

	const [radioValue, setRadioValue] = useState<string>(type || 'Все');
	const [filterCars, setFilterCars] = useState<ICar[]>([]);
	const [nameCar, setNameCar] = useState<string>(name || '');
	const [loadingCars, setLoadingCars] = useState(false);

	const dispatch = useAppDispatch();

	const { cars, loading } = useFetchCars();
	const isFilterCars = (type: string) => {
		return cars.data.filter((item) => item.categoryId.name === type);
	};

	console.log(filterCars, loading);

	const onRadioChange = (e: RadioChangeEvent) => {
		setRadioValue(e.target.value);
	};

	const handlerSelectCar = (item: ICar) => {
		dispatch(
			updateModel({
				model: item.name,
				type: item.categoryId.name,
				status: true,
			})
		);
	};

	// useEffect(() => {
	// 	if (type && name) {
	// 		setRadioValue(type);
	// 		setNameCar(name);
	// 	}
	// }, []);

	useEffect(() => {
		if (radioValue === 'Все') {
			setLoadingCars(loading);
			setFilterCars(cars.data);
		} else {
			setFilterCars(isFilterCars(radioValue));
		}
	}, [cars, radioValue]);

	// useEffect(() => {
	// 	dispatch(updateModel({}));
	// }, [nameCar]);
	return (
		<div className="">
			<Radio.Group
				className="radio-custom"
				onChange={onRadioChange}
				value={radioValue}
			>
				<Radio value={'Все'}>Все модели</Radio>
				<Radio value={'Эконом'}>Эконом</Radio>
				<Radio value={'Бизнес'}>Премиум</Radio>
			</Radio.Group>

			<div className="flex flex-wrap mt-12">
				{loadingCars
					? 'Загрузка...'
					: filterCars.map((item) => {
							return (
								<div
									key={item.id}
									className="relative w-1/2 max-md:w-full h-[224px] p-4 border border-[#EEEEEE] hover:border-gray cursor-pointer overflow-hidden"
									onClick={() => handlerSelectCar(item)}
								>
									<div className="">
										<Heading level="h4" className="uppercase text-[18px]">
											{item.name}
										</Heading>
										<span className="text-[14px] text-gray">
											{item.priceMin} - {item.priceMax}
										</span>
										<img
											src={item.thumbnail.path}
											alt={item.name}
											className="absolute w-[256px] bottom-0-0 right-0 -z-10"
										/>
									</div>
								</div>
							);
					  })}
			</div>
		</div>
	);
};
