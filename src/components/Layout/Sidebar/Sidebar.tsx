import Burger from '@/components/Burger';
import { Button } from '@/components/ui/Button';

export interface SidebarProps {
	handlerNavMenu: () => void;
	isBurgerOpen: boolean;
}

export const Sidebar = ({ handlerNavMenu, isBurgerOpen }: SidebarProps) => {
	return (
		<div className="flex flex-col w-sidebar bg-[#151B1F] px-[20px] py-[32px] max-md:bg-transparent max-md:absolute">
			<Burger handlerNavMenu={handlerNavMenu} isOpen={isBurgerOpen} />
			<Button className="p-0 mt-auto max-lg:hidden text-main">Eng</Button>
		</div>
	);
};
