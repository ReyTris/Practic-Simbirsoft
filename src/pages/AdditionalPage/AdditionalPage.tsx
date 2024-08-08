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

	const dispatch = useAppDispatch();

	const { rate, loading } = useRateCar(id);

	const [selectedColor, setSelectedColor] = useState('');
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [tariff, setTariff] = useState(null);
	const [priceDays, setPriceDays] = useState<number>(0);
	const [options, setOptions] = useState([]);

	const onChange = (e: RadioChangeEvent) => {
		setSelectedColor(e.target.value);
	};
	const onChangeTariff = (e: RadioChangeEvent) => {
		setTariff(e.target.value);
	};

	const onChangeAdditional: GetProp<typeof Checkbox.Group, 'onChange'> = (
		checkedValues
	) => {
		const addedValues = checkedValues.filter(
			(value) => !options.includes(value)
		);
		const removedValues = options.filter(
			(value) => !checkedValues.includes(value)
		);

		// Считаем итоговую стоимость
		const addedTotal = addedValues.reduce(
			(sum: number, value: number) => sum + value,
			0
		);
		const removedTotal: number = removedValues.reduce(
			(sum, value) => sum + value,
			0
		);
		const newTotal = Number(priceDays) + Number(addedTotal) - removedTotal;
		// const selectedOptions = checkedValues.map((value) => {
		// 	return plainOptions.find((option) => option.value === value).field;
		// });
		// setOptions(selectedOptions);
		// Обновляем состояние опций и финальной цены
		setOptions(checkedValues);
		dispatch(updateFinalPrice(newTotal));
	};

	const handleStartDateChange = (date: any) => {
		setStartDate(date);
		setEndDate(null);
	};

	const handleEndDateChange = (date: any) => {
		setEndDate(date);
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
			(prev) => prev + Number(value) * Number(calculateDaysDiff(timeType))
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

	useEffect(() => {
		dispatch(updateFinalPrice(priceDays));
	}, [priceDays]);

	useEffect(() => {
		if (tariff !== null && selectedColor !== null && endDate !== null) {
			dispatch(updateAdditional({ status: true }));
		}
	}, [tariff, selectedColor, endDate]);

	useEffect(() => {
		dispatch(updateAdditional({ options: { chair: '', wheel: '', tank: '' } }));
		options.forEach((option) => {
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
					>
						<Radio
							value={7}
							onClick={(e) => calculatePriceOfDays('7', 'minutes')}
						>
							Поминутно, 7₽/мин
						</Radio>
						<Radio
							value={rate}
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
				/>
			</div>
		</div>
	);
};
