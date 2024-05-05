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
			<a
				href={to}
				className={cn(
					className,
					variant,
					'min-h-[48px] pt-[15px] pb-[10px] px-4 rounded-lg text-white'
				)}
			>
				{children}
			</a>
		);
	} else {
		return (
			<button
				onClick={onClick}
				className={cn(
					className,
					variant,
					'min-h-[48px] pt-[15px] pb-[10px] px-4 rounded-lg text-white'
				)}
				disabled={disabled}
			>
				{children}
			</button>
		);
	}
};
