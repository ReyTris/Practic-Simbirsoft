import { PathNames } from '@/router/pathNames';
import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavMenu from '../NavMenu/NavMenu';
import Container from './Container';
import Header from './Header';
import Sidebar from './Sidebar';

export const Layout = () => {
	const location = useLocation();
	const path = location.pathname;
	const [showMenu, setShowMenu] = useState<boolean>(false);

	const handlerNavMenu = () => {
		setShowMenu((prev) => !prev);
	};
	return (
		<main className="min-h-[100vh] flex overflow-hidden m-auto">
			<Sidebar isBurgerOpen={showMenu} handlerNavMenu={handlerNavMenu} />
			{showMenu && <NavMenu handlerNavMenu={handlerNavMenu} />}
			<div className="flex-grow w-wrapper">
				{path != PathNames.MAIN_PAGE && (
					<Container>
						<Header />
						<Outlet />
					</Container>
				)}
				<Outlet />
			</div>
		</main>
	);
};
