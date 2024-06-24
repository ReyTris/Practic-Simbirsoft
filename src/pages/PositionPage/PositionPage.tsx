import { Input } from '@/components/ui/Input';
import { useAppDispatch } from '@/hooks/useDispatch';
import { updatePosition } from '@/store/OrderSlice';
import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';
import { ChangeEvent, useEffect, useState } from 'react';

const citiesList = ['Ульяновск', 'Самара', 'Москва', 'Казань'];

const streetList = {
	Ульяновск: [
		{ street: 'Пушкарёва, 11', coordinate: [54.314396, 48.353366] },
		{ street: 'Воробьёва, 84', coordinate: [54.317786, 48.381715] },
		{
			street: 'Комсомольский переулок, 3Б',
			coordinate: [54.314297, 48.387609],
		},
		{
			street: 'Университетская Набережная, 1',
			coordinate: [54.302667, 48.368439],
		},
	],
	Самара: [
		{ street: 'Мичурина, 21Б', coordinate: [53.203668, 50.141375] },
		{ street: 'Арцыбушевская улица, 45', coordinate: [53.192726, 50.116033] },
		{ street: 'Южный проезд, 104', coordinate: [53.178484, 50.198269] },
		{ street: 'Коленчатая улица, 20Б', coordinate: [53.183048, 50.233692] },
	],
	Москва: [
		{
			street: 'Малый Лёвшинский переулок, 7с1',
			coordinate: [55.741996, 37.588932],
		},
		{ street: 'Большая Полянка, 44', coordinate: [55.732405, 37.619412] },
		{
			street: '2-й Верхний Михайловский проезд, 5',
			coordinate: [55.709033, 37.604485],
		},
		{ street: '4-й Рощинский проезд, 19', coordinate: [55.705676, 37.61167] },
	],
	Казань: [
		{ street: 'Хлебозаводская улица, 7', coordinate: [55.843463, 49.050904] },
		{ street: 'Тунакова, 58', coordinate: [55.83266, 49.085094] },
		{ street: 'Мусина, 59', coordinate: [55.833489, 49.122608] },
		{ street: 'Алексея Козина, 9', coordinate: [55.814574, 49.139023] },
	],
};

export const PositionPage = () => {
	const [city, setCity] = useState('');
	const [street, setStreet] = useState('');
	const [cityOptions, setCityOptions] = useState(false);
	const [streetOptions, setStreetOptions] = useState(false);
	const [coordinate, setCoordinate] = useState([54.313836, 48.353282]);

	const dispatch = useAppDispatch();

	// dispatch(clearDataAfterPosition())

	const onChangeCity = (e: ChangeEvent<HTMLInputElement>) => {
		setCity(e.target.value);
		dispatch(updatePosition({ city: e.target.value }));
	};

	const onSetCity = (value: string) => {
		setCity(value);
		dispatch(updatePosition({ city: value }));
		setCityOptions(false);
	};
	const onChangeStreet = (e: ChangeEvent<HTMLInputElement>) => {
		setStreet(e.target.value);
		dispatch(updatePosition({ street: e.target.value }));
	};

	const onSetStreet = (street: any) => {
		setStreet(street.street);
		dispatch(updatePosition({ street: street.street }));
		setCoordinate(street.coordinate);
		setCityOptions(false);
	};

	useEffect(() => {
		if (city !== '') {
			setCityOptions(true);
		} else {
			setCityOptions(false);
		}
		if (street !== '') {
			setStreetOptions(true);
		} else {
			setStreetOptions(false);
		}
		if (city !== '' && street !== '') {
			dispatch(updatePosition({ status: true }));
		}
	}, [city, street, cityOptions, coordinate]);

	return (
		<div>
			<div className="relative">
				<Input
					type="text"
					value={city}
					label="Город"
					name="city"
					placeholder="Начните вводить город ..."
					onChange={onChangeCity}
				/>

				{cityOptions && (
					<div className="absolute z-10 border-black border-2 bg-white min-w-[100px]">
						{citiesList
							.filter((item, index) =>
								item.toLowerCase().includes(city.toLowerCase())
							)
							.map((item, index) => (
								<p
									className="p-2 cursor-pointer"
									key={index}
									onClick={() => onSetCity(item)}
								>
									{item}
								</p>
							))}
					</div>
				)}
			</div>
			<div className="relative">
				<Input
					type="text"
					value={street}
					label="Улица"
					name="street"
					placeholder="Начните вводить улицы ..."
					onChange={onChangeStreet}
				/>

				{streetOptions && (
					<div className="absolute z-10 border-black border-2 bg-white min-w-[100px]">
						{streetList[city]
							?.filter((item, index) =>
								item.street.toLowerCase().includes(street.toLowerCase())
							)
							.map((item, index) => (
								<p
									className="p-2 cursor-pointer"
									key={index}
									onClick={() => onSetStreet(item)}
								>
									{item.street}
								</p>
							))}
					</div>
				)}
			</div>
			<YMaps query={{ apikey: 'e0d09efb-487f-4235-8ae5-edaa6356c8a1' }}>
				<Map
					defaultState={{ center: coordinate, zoom: 15 }}
					width="100%"
					height="300px"
					state={{ center: coordinate, zoom: 15 }}
				>
					<Placemark geometry={coordinate} />
				</Map>
			</YMaps>
		</div>
	);
};
