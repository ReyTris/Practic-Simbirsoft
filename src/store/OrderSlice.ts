import { PathNames } from '@/router/pathNames';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
	AdditionalPayload,
	IActionUpdateAdditional,
	IActionUpdateModel,
	IActionUpdatePosition,
	IInitialState,
} from './types';

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
				tank: {
					name: 'Полный бак',
					value: '',
				},
				chair: {
					name: 'Детское кресло',
					value: '',
				},
				wheel: {
					name: 'Правый руль',
					value: '',
				},
			},
			button: {
				status: false,
				label: 'Итого',
				link: `${PathNames.ORDER_PAGE}/${PathNames.SUMMARY_PAGE}`,
			},
		},
	},

	currentCoordinate: null,
	currentZoom: null,

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
			}

			if (street !== undefined) {
				address.street = street;
			}

			address.value = `${address.city}${
				address.city && address.street ? ', ' : ''
			}${address.street}`;

			state.currentCoordinate = coordinate;
			state.currentZoom = zoom;

			state.data[PathNames.POSITION_PAGE].button.status = status;
		},
		updateModel: (state, action: PayloadAction<IActionUpdateModel>) => {
			const { model, type, status, id, price, colors } = action.payload;

			state.data[PathNames.MODEL_PAGE].fields.model = {
				...state.data[PathNames.MODEL_PAGE].fields.model,
				value: model,
				id,
				price,
				type,
				colors,
			};

			state.data[PathNames.MODEL_PAGE].button.status = status;

			state.combinedFields = {
				...state.data[PathNames.POSITION_PAGE].fields,
				...state.data[PathNames.MODEL_PAGE].fields,
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
			};

			state.data.model.button.status = false;
		},

		updateFinalPrice: (state, action: PayloadAction<number>) => {
			state.finalPrice += action.payload;
		},

		updateAdditional: (
			state,
			action: PayloadAction<IActionUpdateAdditional>
		) => {
			const { options, status } = action.payload;
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

			state.data[PathNames.ADDITIONAL_PAGE].button.status = status;

			state.combinedFields = {
				...state.data[PathNames.POSITION_PAGE].fields,
				...state.data[PathNames.MODEL_PAGE].fields,
				...state.data[PathNames.ADDITIONAL_PAGE].fields,
			};
		},
	},
});

export const {
	updatePosition,
	updateModel,
	clearModel,
	updateAdditional,
	updateFinalPrice,
} = orderSlice.actions;

export default orderSlice.reducer;
