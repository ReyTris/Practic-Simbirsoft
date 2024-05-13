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
	const variantStyles = {
		'darkgreen-to-green': 'bg-gradient-to-r from-[#13493F] to-[#0C7B1B]',
		'blue-to-ocean': 'bg-gradient-to-r from-[#132949] to-[#0C7B67]',
		'orange-to-red': 'bg-gradient-to-r from-[#493013] to-[#7B0C3B]',
		'darkpurple-to-purple': 'bg-gradient-to-r from-[#281349] to-[#720C7B]',
		'green-to-darkgreen': 'bg-gradient-to-r from-[#0EC261] to-[#039F67]',
	};

	const buttonVariant = variantStyles[variant as keyof typeof variantStyles];

	if (to) {
		return (
			<a href={to} className={cn('button', buttonVariant, className)}>
				{children}
			</a>
		);
	} else {
		return (
			<button
				onClick={onClick}
				className={cn('button', buttonVariant, className)}
				disabled={disabled}
			>
				{children}
			</button>
		);
	}
};
