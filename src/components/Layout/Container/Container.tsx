import cn from 'classnames';
import { PropsWithChildren } from 'react';

interface ContainerProps extends PropsWithChildren {
	className?: string;
}

export const Container = ({ className, children }: ContainerProps) => {
	return (
		<div
			className={cn(
				'h-full w-full px-[16px] lg:px-[32px] xl:px-[64px]',
				className
			)}
		>
			{children}
		</div>
	);
};
