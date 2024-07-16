import { useAppDispatch } from '@/hooks/useDispatch';
import { updatePosition } from '@/store/OrderSlice';
import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';
import { AutoComplete, Input } from 'antd';
import { useEffect, useState } from 'react';

import { IStreetEntry, citiesList, streetList } from '@/constants/initialMapPoints';

export const PositionPage = () => {
	const [city, setCity] = useState('');
	const [street, setStreet] = useState('');
	const [coordinate, setCoordinate] = useState([54.313836, 48.353282]);

	const dispatch = useAppDispatch();

	const [optionsCity, setOptionsCity] = useState<string[]>([]);
	const [optionsStreet, setOptionsStreet] = useState<IStreetEntry[]>([]);

	const onSelectCity = (data: string) => {
		setCity(data);
		setStreet('');
		setOptionsStreet([]);
		dispatch(updatePosition({ city: data }));
	};

	const onSelectStreet = (data: string) => {
		const selectedStreet = streetList[city].find(
			(street) => street.street === data
		);
		if (selectedStreet) {
			setStreet(selectedStreet.street);
			setCoordinate(selectedStreet.coordinate);
			dispatch(updatePosition({ street: selectedStreet.street }));
			dispatch(updatePosition({ status: true }));
		}
	};

	const onClearStreet = () => {
		setStreet('');
		dispatch(updatePosition({ street: '' }));
	};

	const getPanelValue = (searchText: string) =>
		!searchText
			? []
			: citiesList.filter((item) =>
					item.toLowerCase().includes(searchText.toLowerCase())
			  );

	const getPanelValueStreet = (searchText: string) =>
		!searchText
			? []
			: streetList[city].filter((item) =>
					item.street.toLowerCase().includes(searchText.toLowerCase())
			  );

	useEffect(() => {
		dispatch(updatePosition({}));
	}, []);

	useEffect(() => {
		setOptionsCity(getPanelValue(city));
	}, [city]);

	return (
		<div>
			<div className="flex flex-col items-end w-[340px]">
				<div className="relative">
					<label htmlFor="city">Город</label>
					<AutoComplete
						id="city"
						options={optionsCity.map((city) => ({ value: city }))}
						style={{ width: 224 }}
						onSelect={onSelectCity}
						onSearch={(text) => setOptionsCity(getPanelValue(text))}
						onChange={() => onClearStreet()}
						className="ml-2 border-b-2 border-[#999999]"
					>
						<Input
							placeholder="Начните вводить город ..."
							className="border-none"
						/>
					</AutoComplete>
				</div>
				<div className="relative">
					<label htmlFor="street">Пункт выдачи</label>
					<AutoComplete
						id="street"
						options={optionsStreet.map((city) => ({ value: city.street }))}
						style={{ width: 224 }}
						onSelect={onSelectStreet}
						onSearch={(text) => setOptionsStreet(getPanelValueStreet(text))}
						value={street}
						onChange={(data) => {
							setStreet(data);
						}}
						disabled={!city}
						className="ml-2 border-b-2 border-[#999999]"
					>
						<Input
							placeholder="Начните вводить пункт ..."
							className="border-none"
						/>
					</AutoComplete>
				</div>
			</div>
			<div className="mt-[45px]">
				<div className="mb-[16px]">Выбрать на карте:</div>
				<YMaps query={{ apikey: 'e0d09efb-487f-4235-8ae5-edaa6356c8a1' }}>
					<Map
						defaultState={{ center: coordinate, zoom: 15 }}
						width="736px"
						height="352px"
						state={{ center: coordinate, zoom: 15 }}
					>
						<Placemark geometry={coordinate} />
					</Map>
				</YMaps>
			</div>
		</div>
	);
};
