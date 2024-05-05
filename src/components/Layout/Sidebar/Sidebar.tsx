import { FC } from 'react';
import * as styles from './Sidebar.module.scss';

import cn from 'classnames';

export interface SidebarProps {
	handlerNavMenu: () => void;
	burgerStatus: boolean;
}

export const Sidebar: FC<SidebarProps> = ({ handlerNavMenu, burgerStatus }) => {
	return (
		<div className="w-sidebar bg-[#151B1F] px-[20px] py-[32px]">
			<div
				className={cn(styles.burger, { [styles.open]: burgerStatus })}
				onClick={handlerNavMenu}
			>
				<div className={styles.burger__line}></div>
				<div className={styles.burger__line}></div>
				<div className={styles.burger__line}></div>
			</div>
		</div>
	);
};
