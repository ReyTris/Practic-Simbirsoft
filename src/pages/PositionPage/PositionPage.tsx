import { Input } from '@/components/ui/Input';
import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';
import { ChangeEvent, useState } from 'react';

export const PositionPage = () => {
	const [city, setCity] = useState('');
	const [street, setStreet] = useState('');

	const onChangeCity = (e: ChangeEvent<HTMLInputElement>) => {
		setCity(e.target.value);
	};
	const onChangeStreet = (e: ChangeEvent<HTMLInputElement>) => {
		setStreet(e.target.value);
	};

	return (
		<div>
			<Input
				type='text'
				value={city}
				label='Город'
				name='city'
				placeholder='Начните вводить город ...'
				onChange={onChangeCity}
			/>
			<Input
				type='text'
				value={street}
				label='Улица'
				name='street'
				placeholder='Начните вводить улицы ...'
				onChange={onChangeStreet}
			/>
			<YMaps query={{ apikey: 'e0d09efb-487f-4235-8ae5-edaa6356c8a1' }}>
				<Map
					defaultState={{ center: [54.313836, 48.353282], zoom: 15 }}
					width='100%'
					height='300px'
				>
					<Placemark
						options={{
							iconColor: 'red',
							iconImageHref:
								'https://www.mapbox.com/help/data/examples/marker-editor.svg',
						}}
						geometry={[54.313836, 48.353282]}
					/>
				</Map>
			</YMaps>
		</div>
	);
};
