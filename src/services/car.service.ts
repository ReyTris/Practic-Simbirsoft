import { $api } from '@/api/api';
import { AxiosResponse } from 'axios';
import { IOrderData } from './types.order';

interface IThumbnail {
	path: string;
	size: number;
}

interface ICategory {
	id: number;
	name: string;
	description: string;
	createdAt: string;
	updatedAt: string;
}

export interface ICar {
	id: number;
	priceMax: number;
	priceMin: number;
	name: string;
	thumbnail: IThumbnail;
	description: string;
	number: string;
	isFullTank: string;
	colors: string[];
	createdAt: string;
	updatedAt: string;
	categoryId: ICategory;
}

export interface ICarApiResponse {
	data: ICar[];
}

export interface IRateCarResponse {
	data: {
		id: number;
		price: string;
		createdAt: string;
		updatedAt: string;
		rateTypeId: {
			i: number;
			name: string;
			unit: string;
			createdAt: string;
			updatedAt: string;
		};
	};
}
export const CarService = {
	async getAllCars(): Promise<ICarApiResponse> {
		const response: AxiosResponse<ICarApiResponse> = await $api.get('/db/car/');
		return response.data;
	},
	async getRateCar(id: number): Promise<IRateCarResponse> {
		const response: AxiosResponse<IRateCarResponse> = await $api.get(
			`/db/rate/${id}`
		);
		return response.data;
	},

	async createOrder(orderData: IOrderData): Promise<IOrderData> {
		const response: IOrderData = await $api.post('/db/order/', orderData);
		return response
	},

	async getOrderId(id: number): Promise<IOrderData> {
		const response: IOrderData = await $api.get(`/db/order/${id}`);
		return response
	}
};
