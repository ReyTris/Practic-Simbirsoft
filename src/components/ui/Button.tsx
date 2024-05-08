import cn from 'classnames';

interface ButtonProps {
	to?: string;
	className?: string;
	onClick?: () => void;
	disabled?: boolean;
	children: React.ReactNode;
	variant?: string;
}

export const Button = ({
	to,
	className,
	onClick,
	disabled,
	children,
	variant,
}: ButtonProps) => {
	if (to) {
		return (
			<a href={to} className={cn('button', variant, className)}>
				{children}
			</a>
		);
	} else {
		return (
			<button
				onClick={onClick}
				className={cn('button', className, variant)}
				disabled={disabled}
			>
				{children}
			</button>
		);
	}
};
