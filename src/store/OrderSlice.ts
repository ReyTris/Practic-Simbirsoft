import { PathNames } from '@/router/pathNames';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
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
				model: {
					name: 'Модель',
					value: '',
					type: '',
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

			state.combinedFields = {
				...state.data[PathNames.POSITION_PAGE].fields,
			};
		},
		updateModel: (state, action: PayloadAction<IActionUpdateModel>) => {
			const { model, type, status } = action.payload;

			state.data[PathNames.MODEL_PAGE].fields.model.value = model;
			state.data[PathNames.MODEL_PAGE].fields.model.type = type;
			state.data[PathNames.MODEL_PAGE].button.status = status;

			state.combinedFields = {
				...state.data[PathNames.POSITION_PAGE].fields,
				...state.data[PathNames.MODEL_PAGE].fields,
			};
		},
		clearDataAfterModel: (state) => {},
	},
});

export const { updatePosition, updateModel, clearDataAfterModel } =
	orderSlice.actions;

export default orderSlice.reducer;
