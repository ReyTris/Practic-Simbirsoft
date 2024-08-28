import { PathNames } from '@/router/pathNames';
import { ICar } from '@/services/car.service';
import { IOrderData } from '@/services/types.order';

export interface IOrderField {
	name: string;
	value: string;
}

export interface IAddressField extends IOrderField {
	city: string;
	street: string;
}

export interface IModelField extends IOrderField {
	type: string;
	id: number | null;
	price: string;
	colors: string[];
	number: string;
	imagePath: string;
}

export interface IAdditionalField extends IOrderField {
	type: string;
}

export interface IButtonOrder {
	status: boolean;
	label: string;
	link: string;
}

export interface IPosition {
	fields: {
		address: IAddressField;
	};
	button: IButtonOrder;
}

export interface IModel {
	fields: {
		model: IModelField;
	};
	button: IButtonOrder;
}

export interface IAdditional {
	fields: {
		color: IOrderField;
		timeLength: IOrderField;
		tariff: IOrderField;
		isFullTank: IAdditionalField;
		isNeedChildChair: IAdditionalField;
		isRightWheel: IAdditionalField;
	};

	startDate: IOrderField;
	endDate: IOrderField;
	button: IButtonOrder;
}

export interface IOrderFields {
	[PathNames.POSITION_PAGE]?: IPosition;
	[PathNames.MODEL_PAGE]?: IModel;
	[PathNames.ADDITIONAL_PAGE]?: IAdditional;
	[PathNames.SUMMARY_PAGE]?: IModel;
}

export type Fields = 'address' | 'model';

export type ICombinedFields = {
	[key in Fields]?: IOrderField | IAddressField | IModelField;
};

export interface IInitialState {
	data: IOrderFields;
	currentCoordinate: [number, number];
	combinedFields: ICombinedFields;
	currentZoom: number;
	priceDays: number;
	priceOptions: number;
	finalPrice: number;
	orderData: IOrderData;
}

//actions
export interface IActionUpdatePosition {
	city?: string;
	street?: string;
	status?: boolean;
	coordinate?: [number, number];
	zoom?: number;
}

export interface IActionUpdateModel {
	model?: string;
	type?: string;
	status?: boolean;
	id?: number | null;
	price?: string;
	colors?: string[];
	imagePath?: string;
	number?: string;
	car?: ICar;
}
export interface IActionUpdateAdditional {
	options?: {
		[key in AdditionalPayload]?: string;
	};
	status?: boolean;
	startDate?: string;
	endDate?: string;
}

export type AdditionalPayload =
	| 'color'
	| 'timeLength'
	| 'tariff'
	| 'isFullTank'
	| 'isNeedChildChair'
	| 'isRightWheel'
	| 'status';
