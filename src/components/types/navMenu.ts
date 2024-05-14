export interface INavMenuLink {
	title: string;
	link: string;
	onClick?: () => void;
}

export interface ISocialLink {
	link: string;
	icon: React.FC<React.SVGProps<SVGSVGElement>>;
}
