import Burger from '@/components/Burger';
import { Button } from '@/components/ui/Button';
import { FC } from 'react';

export interface SidebarProps {
	handlerNavMenu: () => void;
	burgerStatus: boolean;
}

export const Sidebar: FC<SidebarProps> = ({ handlerNavMenu, burgerStatus }) => {
	return (
		<div className="flex flex-col w-sidebar bg-[#151B1F] px-[20px] py-[32px] max-md:bg-transparent max-md:absolute">
			<Burger handlerNavMenu={handlerNavMenu} burgerStatus={burgerStatus} />
			<Button className="p-0 mt-auto max-lg:hidden text-main">Eng</Button>
		</div>
	);
};
