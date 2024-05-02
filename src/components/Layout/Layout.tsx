import { Outlet } from 'react-router-dom';
import * as styles from './Layout.module.scss';
import Sidebar from './Sidebar';

export const Layout = () => {
	return (
		<main className={styles.mainWrapper}>
			<Sidebar />
			<Outlet />
		</main>
	);
};
