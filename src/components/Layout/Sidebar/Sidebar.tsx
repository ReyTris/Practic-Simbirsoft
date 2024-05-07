import Burger from '@/components/Burger';
import { FC } from 'react';

export interface SidebarProps {
	handlerNavMenu: () => void;
	burgerStatus: boolean;
}

export const Sidebar: FC<SidebarProps> = ({ handlerNavMenu, burgerStatus }) => {
	return (
		<div className="w-sidebar bg-[#151B1F] px-[20px] py-[32px]">
			<Burger handlerNavMenu={handlerNavMenu} burgerStatus={burgerStatus} />
		</div>
	);
};
