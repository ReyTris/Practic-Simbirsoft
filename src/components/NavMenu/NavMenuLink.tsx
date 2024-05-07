import { NavLink } from 'react-router-dom';
import * as styles from './NavMenu.module.scss';
import { INavMenuLink } from './types';

export const NavMenuLink = ({ title, link, onClick }: INavMenuLink) => {
	return (
		<NavLink
			to={link}
			className={({ isActive }) =>
				`${styles.navMenu__link} ${isActive ? styles.active : ''}`
			}
			onClick={onClick}
		>
			{title}
		</NavLink>
	);
};
