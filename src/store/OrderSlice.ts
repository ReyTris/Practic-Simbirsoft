import { PathNames } from '@/router/pathNames';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
	AdditionalPayload,
	IActionUpdateAdditional,
	IActionUpdateModel,
	IActionUpdatePosition,
	IInitialState,
} from './types';
import dayjs from 'dayjs';
import { IOrderData } from '@/services/types.order';

const initialState: IInitialState = {
	data: {
		[PathNames.POSITION_PAGE]: {
			fields: {
				address: {
					name: 'Пункт выдачи',
					value: '',
					city: '',
					street: '',
				},
			},
			button: {
				status: false,
				label: 'Выбрать модель',
				link: `${PathNames.ORDER_PAGE}/${PathNames.MODEL_PAGE}`,
			},
		},
		[PathNames.MODEL_PAGE]: {
			fields: {
				model: {
					name: 'Модель',
					value: '',
					type: '',
					id: null,
					price: '',
					colors: [],
					number: '',
					imagePath: '',
				},
			},
			button: {
				status: false,
				label: 'Дополнительно',
				link: `${PathNames.ORDER_PAGE}/${PathNames.ADDITIONAL_PAGE}`,
			},
		},
		[PathNames.ADDITIONAL_PAGE]: {
			fields: {
				color: {
					name: 'Цвет',
					value: '',
				},
				timeLength: {
					name: 'Длительность аренды',
					value: '',
				},
				tariff: {
					name: 'Тариф',
					value: '',
				},
				isFullTank: {
					name: 'Полный бак',
					value: '',
					type: 'isFullTank',
				},
				isNeedChildChair: {
					name: 'Детское кресло',
					value: '',
					type: 'isNeedChildChair',
				},
				isRightWheel: {
					name: 'Правый руль',
					value: '',
					type: 'isRightWheel',
				},
			},

			startDate: {
				name: 'Доступна с',
				value: '',
			},
			endDate: {
				name: 'Доступна до',
				value: '',
			},
			button: {
				status: false,
				label: 'Итого',
				link: `${PathNames.ORDER_PAGE}/${PathNames.SUMMARY_PAGE}`,
			},
		},
	},

	orderData: {
		color: '',
		dateFrom: 0,
		dateTo: 0,
		price: 0,
		isFullTank: false,
		isNeedChildChair: false,
		isRightWheel: false,
		createdAt: '',
		updatedAt: '',
		orderStatusId: null,
		cityId: {
			id: 1,
			name: '',
			createdAt: '',
			updatedAt: '',
		},
		pointId: {
			id: 1,
			name: '',
			address: '',
			city_id: 0,
			createdAt: '',
			updatedAt: '',
		},
		carId: {
			id: 4,
			priceMax: 0,
			priceMin: 0,
			name: '',
			thumbnail: {
				path: '',
				size: 0,
			},
			description: '',
			number: '',
			isFullTank: '',
			colors: [],
			category_id: {
				id: null,
				name: '',
				description: '',
				createdAt: '',
				updatedAt: '',
			},
			createdAt: '',
			updatedAt: '',
		},
		rateId: {
			id: 1,
			price: '',
			rateType_id: 0,
			createdAt: '',
			updatedAt: '',
		},
	},

	currentCoordinate: null,
	currentZoom: null,

	priceDays: 0,
	priceOptions: 0,
	finalPrice: 0,

	combinedFields: {},
};

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		updatePosition: (state, action: PayloadAction<IActionUpdatePosition>) => {
			const { city, street, status, coordinate, zoom } = action.payload;
			const address = state.data[PathNames.POSITION_PAGE].fields.address;

			if (city !== undefined) {
				address.city = city;

				state.orderData.cityId = {
					...state.orderData.cityId,
					name: `${city}`,
					createdAt: dayjs().toISOString(),
					updatedAt: dayjs().toISOString(),
				};
			}

			if (street !== undefined) {
				address.street = street;

				state.orderData.pointId = {
					...state.orderData.pointId,
					address: `${street}`,
					createdAt: dayjs().toISOString(),
					updatedAt: dayjs().toISOString(),
				};
			}

			address.value = `${address.city}${
				address.city && address.street ? ', ' : ''
			}${address.street}`;

			state.currentCoordinate = coordinate;
			state.currentZoom = zoom;

			state.data[PathNames.POSITION_PAGE].button.status = status;
		},
		updateModel: (state, action: PayloadAction<IActionUpdateModel>) => {
			const { model, type, status, id, price, colors, imagePath, number, car } =
				action.payload;

			state.data[PathNames.MODEL_PAGE].fields.model = {
				...state.data[PathNames.MODEL_PAGE].fields.model,
				value: model,
				id,
				price,
				type,
				colors,
				number,
				imagePath,
			};

			state.data[PathNames.MODEL_PAGE].button.status = status;

			state.combinedFields = {
				...state.data[PathNames.POSITION_PAGE].fields,
				...state.data[PathNames.MODEL_PAGE].fields,
			};

			state.orderData = {
				...state.orderData,
				carId: {
					...state.orderData.carId,
					category_id: car.categoryId,
				},
			};
		},
		clearModel: (state) => {
			state.combinedFields = {
				...state.data[PathNames.POSITION_PAGE].fields,
			};
			state.data.model.fields.model = {
				name: 'Модель',
				value: '',
				type: '',
				price: '',
				id: null,
				colors: [],
				number: '',
				imagePath: '',
			};

			state.data.model.button.status = false;
		},

		updateFinalPrice: (
			state,
			action: PayloadAction<{ priceDays: number; priceOptions: number }>
		) => {
			const { priceDays, priceOptions } = action.payload;
			state.priceDays = priceDays;
			state.priceOptions = priceOptions;
			state.finalPrice = priceDays + priceOptions;
		},

		updateAdditional: (
			state,
			action: PayloadAction<IActionUpdateAdditional>
		) => {
			const { options, status, startDate, endDate } = action.payload;
			// заполнение полей заказа
			for (let key in options) {
				const fieldKey = key as AdditionalPayload;
				state.data[PathNames.ADDITIONAL_PAGE].fields = {
					...state.data[PathNames.ADDITIONAL_PAGE].fields,
					[fieldKey]: {
						...state.data[PathNames.ADDITIONAL_PAGE].fields[fieldKey],
						value: options[fieldKey],
					},
				};
			}

			if (startDate !== undefined) {
				state.data[PathNames.ADDITIONAL_PAGE].startDate.value = startDate;
			}

			if (endDate !== undefined) {
				state.data[PathNames.ADDITIONAL_PAGE].endDate.value = endDate;
			}

			state.data[PathNames.ADDITIONAL_PAGE].button.status = status;

			state.combinedFields = {
				...state.data[PathNames.POSITION_PAGE].fields,
				...state.data[PathNames.MODEL_PAGE].fields,
				...state.data[PathNames.ADDITIONAL_PAGE].fields,
			};
		},

		clearAdditional: (state) => {
			state.combinedFields = {
				...state.data[PathNames.POSITION_PAGE].fields,
				...state.data[PathNames.MODEL_PAGE].fields,
			};
			for (let key in state.data.additional.fields) {
				const fieldKey = key as AdditionalPayload;
				state.data[PathNames.ADDITIONAL_PAGE].fields = {
					...state.data[PathNames.ADDITIONAL_PAGE].fields,
					[fieldKey]: {
						...state.data[PathNames.ADDITIONAL_PAGE].fields[fieldKey],
						value: '',
					},
				};
			}

			state.data.additional.startDate.value = '';
			state.data.additional.endDate.value = '';
			state.priceDays = 0;
			state.priceOptions = 0;
			state.finalPrice = 0;

			state.data[PathNames.ADDITIONAL_PAGE].button.status = false;
		},

		updateOrderData: (state, action: PayloadAction<any>) => {
			const {
				color,
				dateFrom,
				dateTo,
				isFullTank,
				isNeedChildChair,
				isRightWheel,
			} = action.payload;

			if (color !== undefined) state.orderData.color = color;
			if (dateFrom !== undefined) state.orderData.dateFrom = Number(dateFrom);
			if (dateTo !== undefined) state.orderData.dateTo = Number(dateTo);
			if (isFullTank !== undefined) state.orderData.isFullTank = isFullTank;
			if (isNeedChildChair !== undefined)
				state.orderData.isNeedChildChair = isNeedChildChair;
			if (isRightWheel !== undefined)
				state.orderData.isRightWheel = isRightWheel;
			state.orderData.price = state.finalPrice;
			state.orderData.createdAt = dayjs().toISOString();
			state.orderData.updatedAt = dayjs().toISOString();
		},
	},
});

export const {
	updatePosition,
	updateModel,
	clearModel,
	clearAdditional,
	updateAdditional,
	updateFinalPrice,
	updateOrderData,
} = orderSlice.actions;

export default orderSlice.reducer;
