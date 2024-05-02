import * as styles from './NavMenu.module.scss';
import { NavMenuLink } from './NavMenuLink';
import { dataNavMenu } from './dataNavMenu';

const NavMenu = () => {
	return (
		<div className={styles.navMenu}>
			<nav className={styles.navMenu__nav}>
				<ul className={styles.navMenu__list}>
					{dataNavMenu.map(({ title, link }) => {
						return (
							<li>
								<NavMenuLink key={title} title={title} link={link} />
							</li>
						);
					})}
				</ul>
			</nav>
			<ul className="socialList">
				<li className="socialList__item"></li>
			</ul>
		</div>
	);
};

export default NavMenu;
