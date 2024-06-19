import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

interface OrderBarProps {
	className?: string;
}

export const OrderBar = ({ className }: OrderBarProps) => {
	const dataOrder = useSelector((state: RootState) => state.order.data);
	console.log(dataOrder);

	return <div className={className}>OrderBar</div>;
};
