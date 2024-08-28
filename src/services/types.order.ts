interface Thumbnail {
	path: string;
	size: number;
}

interface Car {
	id: number;
	priceMax: number;
	priceMin: number;
	name: string;
	thumbnail: Thumbnail;
	description: string;
	number: string;
	isFullTank: string;
	colors: string[];
	category_id:  {
        id: number,
        name: string,
        description: string,
        createdAt: string,
        updatedAt: string
    };
	createdAt: string;
	updatedAt: string;
}

interface City {
	id: number;
	name: string;
	createdAt: string;
	updatedAt: string;
}

interface Point {
	id: number;
	name: string;
	address: string;
	city_id: number;
	createdAt: string;
	updatedAt: string;
}

interface Rate {
	id: number;
	price: string;
	rateType_id: number;
	createdAt: string;
	updatedAt: string;
}

export interface IOrderData {
    id?: number;
	color: string;
	dateFrom: number;
	dateTo: number;
	price: number;
	isFullTank: boolean;
	isNeedChildChair: boolean;
	isRightWheel: boolean;
	createdAt: string;
	updatedAt: string;
	orderStatusId: number | null;
	cityId: City;
	pointId: Point;
	carId: Car;
	rateId: Rate;
}
