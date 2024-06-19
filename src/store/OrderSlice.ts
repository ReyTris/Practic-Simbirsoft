import { PathNames } from '@/router/pathNames';
import { createSlice } from '@reduxjs/toolkit';

interface IPosition {
	city: string | null;
	street: string | null;
	button: {
		status: false;
		label: string;
		link: string;
	};
}

interface IData {
	position: IPosition;
	model: {
		name: string;
		button: {
			status: false;
			label: string;
			link: string;
		};
	};
}

interface IInitialState {
	loading: boolean;
	data: IData;
}

const initialState: IInitialState = {
	loading: false,
	data: {
		[PathNames.POSITION_PAGE]: {
			city: '',
			street: '',
			button: {
				status: false,
				label: 'Выбрать модель',
				link: `${PathNames.ORDER_PAGE}/${PathNames.MODEL_PAGE}`,
			},
		},
		[PathNames.MODEL_PAGE]: {
			name: '',
			button: {
				status: false,
				label: 'Дополнительно',
				link: `${PathNames.ORDER_PAGE}/${PathNames.ADDITIONAL_PAGE}`,
			},
		},
	},
};

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		getOrderData(state) {},
	},
});

export default orderSlice.reducer;
