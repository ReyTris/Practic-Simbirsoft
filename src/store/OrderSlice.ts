import { createSlice } from '@reduxjs/toolkit';

interface IPosition {
	city: string | null;
	street: string | null;
}

interface IData {
	position: IPosition;
}

interface IInitialState {
	loading: boolean;
	data: IData;
}

const initialState: IInitialState = {
	loading: false,
	data: {
		position: {
			city: '',
			street: '',
		},
	},
};

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {},
});

export default orderSlice.reducer;
