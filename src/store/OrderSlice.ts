import { PathNames } from '@/router/pathNames';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

  
export interface IOrderField {
  name: string;
  value: string;
}

export interface IAddressField extends IOrderField {
	city: string;
	street: string;
}

interface IButtonOrder {
	status: boolean;
	label: string;
	link: string;
}

interface IPosition {
	fields: {
		address: IAddressField
	}
	button: IButtonOrder;
}

interface IModel {
	fields: {
		model: IOrderField
	}
	button: IButtonOrder;
}

export interface IOrderData {
	[PathNames.POSITION_PAGE]?: IPosition;
	[PathNames.MODEL_PAGE]?: IModel
}

interface IInitialState {
	data: IOrderData;
	combinedFields: {}
}

const initialState: IInitialState = {
	// loading: false,
	data: {
		[PathNames.POSITION_PAGE]: {
			fields: {
				address: {
					name: 'Пункт выдачи',
					value: '',
					city: '',
          			street: '',
				}
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
				}
			},
			button: {
				status: false,
				label: 'Дополнительно',
				link: `${PathNames.ORDER_PAGE}/${PathNames.ADDITIONAL_PAGE}`,
			},
		},
	},

	combinedFields: {}
};

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		updatePosition: (state, action: PayloadAction<{city?: string, street?: string, status?: boolean}>) => {
			const {city, street, status} = action.payload;
			const address = state.data[PathNames.POSITION_PAGE].fields.address;

			if (city !== undefined) {
				address.city = city;
			}

			if (street !== undefined) {
				address.street = street;
			}
		
			address.value = `${address.city}${address.city && address.street ? ', ' : ''}${address.street}`;

			state.data[PathNames.POSITION_PAGE].button.status = status;

			state.combinedFields = {
				...state.data[PathNames.POSITION_PAGE].fields,
			}
		},
		updateModel: (state, action: PayloadAction<{model?: string, status?: boolean}>) => {
			const {model, status} = action.payload;

			state.data[PathNames.MODEL_PAGE].fields.model.value = model;
			state.data[PathNames.MODEL_PAGE].button.status = status;
			
			
			state.combinedFields = {
				...state.data[PathNames.POSITION_PAGE].fields,
				...state.data[PathNames.MODEL_PAGE].fields
			}
		},
		clearDataAfterModel: (state) => {
				
		}
	},
});

export const { updatePosition, updateModel, clearDataAfterModel } = orderSlice.actions;

export default orderSlice.reducer;
