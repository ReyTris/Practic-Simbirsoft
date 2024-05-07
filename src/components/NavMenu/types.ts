export interface INavMenuLink {
	title: string;
	link: string;
	onClick?: () => void;
}

export interface ISocialLink {
	title: string;
	link: string;
	icon: React.ReactNode;
}
