import { useAppDispatch } from '@/hooks/useDispatch';
import { updatePosition } from '@/store/OrderSlice';
import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';
import { AutoComplete } from 'antd';
import { useEffect, useState } from 'react';

import * as styles from './PositionPage.module.scss';

const citiesList = ['Ульяновск', 'Самара', 'Москва', 'Казань'];

interface IStreetEntry {
	street: string;
	coordinate: [number, number];
}

const streetList: Record<string, IStreetEntry[]> = {
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
		}
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
		onSelectCity(city);
		setOptionsCity(getPanelValue(city));
	}, [city]);

	useEffect(() => {
		if (city !== '' && street !== '') {
			dispatch(updatePosition({ status: true }));
		}
	}, [city, street]);

	return (
		<div>
			<div className="relative">
				<AutoComplete
					options={optionsCity.map((city) => ({ value: city }))}
					style={{ width: 200 }}
					onSelect={onSelectCity}
					onSearch={(text) => setOptionsCity(getPanelValue(text))}
					onChange={() => setStreet('')}
					placeholder="input here"
					className={styles.selectSearch}
				/>
			</div>
			<div className="relative">
				<AutoComplete
					options={optionsStreet.map((city) => ({ value: city.street }))}
					style={{ width: 200 }}
					onSelect={onSelectStreet}
					onSearch={(text) => setOptionsStreet(getPanelValueStreet(text))}
					value={street}
					onChange={(data) => {
						setStreet(data);
					}}
					disabled={!city}
					placeholder="input here"
				/>
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
