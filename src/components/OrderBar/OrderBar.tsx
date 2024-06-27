import { getLastPathPart } from '@/features/getLastPathPart';
import { useAppSelector } from '@/hooks/useDispatch';
import { PathNames } from '@/router/pathNames';
import { IAddressField, IOrderData, IOrderField } from '@/store/OrderSlice';
import { RootState } from '@/store/store';
import cn from 'classnames';
import { useLocation } from 'react-router-dom';
import { Button } from '../ui/Button';

interface OrderBarProps {
	className?: string;
}

export const OrderBar = ({ className }: OrderBarProps) => {
	const location = useLocation();
	let lastPartPath = getLastPathPart(location.pathname);
	if (lastPartPath == PathNames.ORDER_PAGE)
		lastPartPath = PathNames.POSITION_PAGE;

	const orderData: IOrderData = useAppSelector(
		(state: RootState) => state.order.data
	);

	const orderList = [];

	for (const key in orderData) {
		orderList.push(orderData[key as keyof IOrderData].fields);
	}

	return (
		<ul className={className}>
			{orderList.map((item, index) => (
				<li key={index}>
					{Object.keys(item).map((fieldKey) => {
						const field = item[fieldKey as keyof typeof item] as
							| IAddressField
							| IOrderField;
						return (
							<div key={fieldKey} className="flex justify-between items-end">
								<span className="inline-block"> {field.name + ': '}</span>
								<div className="border-b-[1px] border-dotted border-gray flex-1 mx-2 mb-[6px]"></div>
								<span className="inline-block max-w-[112px] text-gray text-right">
									{field.value}
								</span>
							</div>
						);
					})}
				</li>
			))}
			<li className="font-semibold mt-8">Цена: от 8 000 до 12 000 ₽</li>
			<Button
				to={orderData[lastPartPath as keyof IOrderData].button.link}
				variant="green-to-darkgreen"
				className={cn('mt-8 w-[100%] text-center', {
					'pointer-events-none opacity-50 bg-none bg-gray':
						!orderData[lastPartPath as keyof IOrderData].button.status,
				})}
			>
				{orderData[lastPartPath as keyof IOrderData].button.label}
			</Button>
		</ul>
	);
};
