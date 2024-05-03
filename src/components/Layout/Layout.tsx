import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavMenu from '../NavMenu/NavMenu';
import * as styles from './Layout.module.scss';
import Sidebar from './Sidebar';

export const Layout = () => {
	const [showMenu, setShowMenu] = useState<boolean>(false);

	const handlerNavMenu = () => {
		setShowMenu(!showMenu);
	};
	return (
		<main className={styles.mainWrapper}>
			<Sidebar burgerStatus={showMenu} handlerNavMenu={handlerNavMenu} />
			{showMenu && <NavMenu handlerNavMenu={handlerNavMenu} />}
			<div className="w-full">
				<Outlet />
			</div>
		</main>
	);
};
