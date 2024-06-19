import { useAppSelector } from '@/hooks/useDispatch';
import { PathNames } from '@/router/pathNames';
import { IAddressField, IOrderData, IOrderField } from '@/store/OrderSlice';
import { RootState } from '@/store/store';
import { NavLink, useLocation } from 'react-router-dom';

interface OrderBarProps {
	className?: string;
}

export const OrderBar = ({ className }: OrderBarProps) => {
	const location = useLocation();
	let lastPartPath = location.pathname.split('/').pop();
	if (lastPartPath == PathNames.ORDER_PAGE) lastPartPath = PathNames.POSITION_PAGE;

	const orderData: IOrderData = useAppSelector((state: RootState) => state.order.data);

	const orderList = []

	for (const key in orderData) {	
		orderList.push(orderData[key as keyof IOrderData].fields)
	}
	
	return (
		<div className={className}>

		{orderList.map((item, index) => (
			<div key={index}>
				{Object.keys(item).map((fieldKey) => {
					const field = item[fieldKey as keyof typeof item] as IAddressField | IOrderField;
					return <p key={fieldKey}>{field.name + ': ' + field.value}</p> ;
				})}
				</div>
			))}

			<NavLink to={orderData[lastPartPath as keyof IOrderData].button.link}>
				{orderData[lastPartPath as keyof IOrderData].button.label}
				{orderData[lastPartPath as keyof IOrderData].button.status ? ' ✔' : ''}
			</NavLink>	
		</div>
	)
	
};
