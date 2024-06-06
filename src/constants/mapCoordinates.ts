export interface IMapData {
	city: string;
	points: IPoints[];
}

interface IPoints {
	coordinates: string;
	address: string;
}

export const mapCoordinates: IMapData[] = [
	{
		city: 'Ульяновск',
		points: [
			{
				coordinates: '54.313836, 48.353282',
				address: 'Ульяновск, улица Пушкарёва, 11',
			},
		],
	},
];
