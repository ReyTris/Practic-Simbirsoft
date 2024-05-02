import { NavLink } from 'react-router-dom';
import * as styles from './NavMenu.module.scss';
import { INavMenuLink } from './types';

export const NavMenuLink = ({ title, link }: INavMenuLink) => {
	return (
		<NavLink
			to={link}
			className={({ isActive }) =>
				`${styles.navMenu__link} ${isActive ? styles.active : ''}`
			}
		>
			{title}
		</NavLink>
	);
};
