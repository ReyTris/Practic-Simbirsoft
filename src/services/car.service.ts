import { $api } from '@/api/api';
import { AxiosResponse } from 'axios';

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
	tank: string;
	colors: string[];
	createdAt: string;
	updatedAt: string;
	categoryId: ICategory;
}

export interface ICarApiResponse {
	data: ICar[];
}

export const CarService = {
	async getAllCars(): Promise<AxiosResponse<ICarApiResponse>> {
		return await $api.get('/db/car/');
	},
};
