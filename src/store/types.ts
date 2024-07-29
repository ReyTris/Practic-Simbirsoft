import { PathNames } from '@/router/pathNames';
import { ICar } from '@/services/car.service';

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

export interface IOrderData {
	[PathNames.POSITION_PAGE]?: IPosition;
	[PathNames.MODEL_PAGE]?: IModel;
	[PathNames.ADDITIONAL_PAGE]?: IModel;
}

export type Fields = 'address' | 'model';

export type ICombinedFields = {
	[key in Fields]?: IOrderField | IAddressField | IModelField;
};

export interface IInitialState {
	data: IOrderData;
	currentCoordinate: [number, number];
	combinedFields: ICombinedFields;
	currentZoom: number;
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
}
