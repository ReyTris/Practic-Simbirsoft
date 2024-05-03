import * as styles from './NavMenu.module.scss';
import { NavMenuLink } from './NavMenuLink';
import { dataNavMenu } from './dataNavMenu';

interface NavMenuProps {
	handlerNavMenu: () => void;
}

const NavMenu = ({ handlerNavMenu }: NavMenuProps) => {
	const handleMenuClose = (event) => {
		if (!event.target.closest(`.${styles.navMenu}`)) {
			handlerNavMenu();
		}
	};
	return (
		<div className={styles.navMenuWrapper} onClick={handleMenuClose}>
			<div className={styles.navMenu}>
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
		</div>
	);
};

export default NavMenu;
