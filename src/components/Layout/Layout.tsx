import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavMenu from '../NavMenu/NavMenu';
import Sidebar from './Sidebar';

export const Layout = () => {
	const [showMenu, setShowMenu] = useState<boolean>(false);

	const handlerNavMenu = () => {
		setShowMenu(!showMenu);
	};
	return (
		<main className="min-h-[100vh] flex overflow-hidden m-auto">
			<Sidebar burgerStatus={showMenu} handlerNavMenu={handlerNavMenu} />
			{showMenu && <NavMenu handlerNavMenu={handlerNavMenu} />}
			<div className="flex-grow w-wrapper">
				<Outlet />
			</div>
		</main>
	);
};
