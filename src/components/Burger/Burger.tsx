import cn from 'classnames';
import * as styles from './Burger.module.scss';

interface IBurgerProps {
	handlerNavMenu: () => void;
	burgerStatus: boolean;
}

export const Burger = ({ handlerNavMenu, burgerStatus }: IBurgerProps) => {
	return (
		<div
			className={cn(styles.burger, { [styles.open]: burgerStatus })}
			onClick={handlerNavMenu}
		>
			<div className={styles.burger__line}></div>
			<div className={styles.burger__line}></div>
			<div className={styles.burger__line}></div>
		</div>
	);
};
