import Close from '@/assets/icons/close.svg';
import * as styles from './NavMenu.module.scss';
import { NavMenuLink } from './NavMenuLink';
import { dataNavMenu } from './dataNavMenu';

const NavMenu = () => {
	return (
		<div className={styles.navMenu}>
			<div>
				<Close />
			</div>
			<nav className={styles.navMenu__nav}>
				<ul className={styles.navMenu__list}>
					{dataNavMenu.map(({ title, link }) => {
						return (
							<li key={title}>
								<NavMenuLink title={title} link={link} />
							</li>
						);
					})}
				</ul>
			</nav>
			<div className="socialList">
				<div className="socialList__item"></div>
			</div>
		</div>
	);
};

export default NavMenu;
