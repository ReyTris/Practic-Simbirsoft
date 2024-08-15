import { useAppDispatch, useAppSelector } from '@/hooks/useDispatch';
import { useRateCar } from '@/hooks/useRateCar';
import { updateAdditional, updateFinalPrice } from '@/store/OrderSlice';
import { RootState } from '@/store/store';
import {
	Checkbox,
	DatePicker,
	GetProp,
	Radio,
	RadioChangeEvent,
	Space,
} from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import { useEffect, useState } from 'react';

const plainOptions = [
	{ label: 'Полный бак, 500р', value: 500, field: 'tank' },
	{ label: 'Детское кресло, 200р', value: 200, field: 'chair' },
	{ label: 'Правый руль, 1600р', value: 1600, field: 'wheel' },
];

export const AdditionalPage = () => {
	const { colors: carColors, id } = useAppSelector(
		(state: RootState) => state.order.data.model.fields.model
	);

	const {startDate: startDateStore, endDate: endDateStore, fields} = useAppSelector((state: RootState) => state.order.data.additional);

	const {color} = useAppSelector((state: RootState) => state.order.data.additional.fields);

	const dispatch = useAppDispatch();

	const { rate, loading } = useRateCar(id);

	const [selectedColor, setSelectedColor] = useState(color.value || '');
	const [startDate, setStartDate] = useState<any>(startDateStore.value || null);
	const [endDate, setEndDate] = useState<any>(endDateStore.value || null);
	const [tariff, setTariff] = useState(fields.tariff.value || null);
	const [priceDays, setPriceDays] = useState<number>(0);
	const [options, setOptions] = useState({values: [], fields: []});

	const onChange = (e: RadioChangeEvent) => {
		setSelectedColor(e.target.value);
	};
	const onChangeTariff = (e: RadioChangeEvent) => {
		setTariff(e.target.value);
	};

	const onChangeAdditional: GetProp<typeof Checkbox.Group, 'onChange'> = (
		checkedValues
	) => {
		const totalAdditionalCost = checkedValues.reduce(
			(sum: number, value: number) => {
				if (typeof value ===  'number') {
					return sum + value;
				} else {
					return sum
				}
			},
			0
		  );
	
		// Обновляем список опций
		const selectedOptions = checkedValues.map((value) => {
			return plainOptions.find((option) => option.value === value).field;
		});
	
		setOptions({ values: checkedValues, fields: selectedOptions });
		
		// Обновляем состояние финальной цены
		const newTotal = Number(priceDays) + Number(totalAdditionalCost);
		dispatch(updateFinalPrice(newTotal));
	};

	const handleStartDateChange = (date: any) => {
		setStartDate(date);
		setEndDate(null);

		dispatch(updateAdditional({ startDate: date }));
	};

	const handleEndDateChange = (date: any) => {
		setEndDate(date);
		
		dispatch(updateAdditional({ endDate: date }));
	};

	const disabledDate: RangePickerProps['disabledDate'] = (current) => {
		return startDate ? current && current < startDate.startOf('day') : false;
	};

	const calculateDaysDiff = (timeType: string) => {
		if (startDate && endDate) {
			return endDate.diff(startDate, timeType);
		}
	};

	const calculatePriceOfDays = (value: string, timeType: string) => {
		setPriceDays(
			 Number(value) * Number(calculateDaysDiff(timeType))
		);
	};

	useEffect(() => {
		dispatch(updateAdditional({ options: { color: selectedColor } }));
	}, [selectedColor]);

	useEffect(() => {
		if (startDate && endDate) {
			const commonMinutes = calculateDaysDiff('minutes');
			const days = Math.ceil(commonMinutes / (60 * 24));
			const hours = Math.ceil((commonMinutes % (60 * 24)) / 60);
			const totalDays = days - (hours > 0 ? 1 : 0);
			dispatch(
				updateAdditional({ options: { timeLength: `${totalDays}д ${hours}ч` } })
			);
		}
	}, [endDate]);

	// Обновляем состояние финальной цены
	useEffect(() => {
		dispatch(updateFinalPrice(priceDays));
	}, [priceDays]);

	useEffect( () => {
		dispatch(updateAdditional({ options: { tariff: tariff } }));
	}, [tariff])

	//Проверка всех полей для включения кнопки
	useEffect(() => {
		if (tariff !== null && selectedColor !== null && endDate !== null) {
			dispatch(updateAdditional({ status: true }));
		}
	}, [tariff, selectedColor, endDate]);

	//Проверка всех полей для включения кнопки, если опции не выбраны
	useEffect(() => {
		dispatch(updateAdditional({ options: { chair: '', wheel: '', tank: '' } }));
		options.fields.forEach((option) => {
			dispatch(updateAdditional({ options: { [option]: 'Да' } }));
		});
		if (tariff !== null && selectedColor !== null && endDate !== null) {
			dispatch(updateAdditional({ status: true }));
		}
	}, [options, tariff, selectedColor, endDate]);

	return (
		<div>
			<div>
				<p>Цвет</p>
				<Radio.Group
					className="radio-custom mt-[18px]"
					onChange={onChange}
					value={selectedColor}
				>
					{carColors.map((color) => {
						return (
							<Radio key={color} value={color}>
								{color}
							</Radio>
						);
					})}
				</Radio.Group>
			</div>
			<div className="mt-[32px]">
				<p>Дата аренды</p>
				<Space className="mt-[18px]" direction="vertical" size="middle">
					<Space style={{ alignItems: 'center' }}>
						<DatePicker
							value={startDate}
							onChange={handleStartDateChange}
							format={{
								format: 'YYYY-MM-DD HH:mm',
								type: 'mask',
							}}
						/>
					</Space>
					<Space style={{ alignItems: 'center' }}>
						<DatePicker
							value={endDate}
							onChange={handleEndDateChange}
							disabledDate={disabledDate}
							format={{
								format: 'YYYY-MM-DD HH:mm',
								type: 'mask',
							}}
						/>
					</Space>
				</Space>
			</div>

			<div className="mt-[32px]">
				<p>Тариф</p>
				{loading ? (
					<div>Загрузка...</div>
				) : (
					<Radio.Group
						className="mt-[18px] radio-custom flex flex-col"
						onChange={onChangeTariff}
						value={tariff}
						disabled={endDate === null}
					>
						<Radio
							value='Поминутно'
							onClick={(e) => calculatePriceOfDays('7', 'minutes')}
						>
							Поминутно, 7₽/мин
						</Radio>
						<Radio
							value='На сутки'
							onClick={(e) => calculatePriceOfDays(rate, 'days')}
						>{`На сутки, ${rate} ₽/сутки`}</Radio>
					</Radio.Group>
				)}
			</div>

			<div className="mt-[32px]">
				<p>Доп услуги</p>
				<Checkbox.Group
					className="mt-[18px] flex flex-col"
					options={plainOptions}
					onChange={onChangeAdditional}
					disabled={endDate === null}
				/>
			</div>
		</div>
	);
};
