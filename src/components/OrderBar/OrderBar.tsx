import { getLastPathPart } from '@/features/getLastPathPart';
import { useAppSelector } from '@/hooks/useDispatch';
import { PathNames } from '@/router/pathNames';
import { RootState } from '@/store/store';
import { Fields, IOrderData } from '@/store/types';
import cn from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useState } from 'react';
import { CarService } from '@/services/car.service';

interface OrderBarProps {
	className?: string;
}

export const OrderBar = ({ className }: OrderBarProps) => {
	const [modalStatus, setModalStatus] = useState<boolean>(false);

	const { orderData } = useAppSelector((state: RootState) => state.order);
	const location = useLocation();
	let lastPartPath = getLastPathPart(location.pathname);
	if (lastPartPath == PathNames.ORDER_PAGE)
		lastPartPath = PathNames.POSITION_PAGE;

	const orderFields = useAppSelector((state: RootState) => state.order.data);

	const priceCar = orderFields.model.fields.model.price;
	const finalPrice = useAppSelector(
		(state: RootState) => state.order.finalPrice
	);

	const getOrderFields = useAppSelector(
		(state: RootState) => state.order.combinedFields
	);

	const navigate = useNavigate();

	const handleCreateOrder = async () => {
		try {
			const response: IOrderData | null = await CarService.createOrder(
				orderData
			);
			if (response) {
				const orderId = response.data.data.id;
				navigate(`${PathNames.ORDER_PAGE}/${orderId}`);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<div className="text-[18px] font-bold text-right">Ваш заказ</div>
			<ul className={className}>
				{Object.keys(getOrderFields).map((fieldKey: Fields) => {
					const field = getOrderFields[fieldKey];
					if (!field.value) return null;
					return (
						<li key={fieldKey}>
							<div key={fieldKey} className="flex justify-between items-end">
								<span className="inline-block text-[14px]">
									{' '}
									{field.name + ': '}
								</span>
								<div className="border-b-[1px] border-dotted border-gray flex-1 mx-2 mb-[6px]"></div>
								<span className="inline-block max-w-[112px] text-[14px] text-gray text-right">
									{field.value}
								</span>
							</div>
						</li>
					);
				})}
				{finalPrice !== 0 ? (
					<div className="mt-8 text-[16px]">
						<span className="font-semibold">Цена</span>: {finalPrice} Р
					</div>
				) : (
					<div className="mt-8 text-[16px]">
						<span className="font-semibold">Цена</span>: от {priceCar}
					</div>
				)}
				{lastPartPath === PathNames.SUMMARY_PAGE ? (
					<Button
						variant="green-to-darkgreen"
						className={cn('mt-8 w-[100%] text-center')}
						onClick={() => setModalStatus(true)}
					>
						Заказать
					</Button>
				) : (
					<Button
						to={orderFields[lastPartPath as keyof IOrderData].button.link}
						variant="green-to-darkgreen"
						className={cn('mt-8 w-[100%] text-center', {
							'pointer-events-none opacity-50 bg-none bg-gray':
								!orderFields[lastPartPath as keyof IOrderData].button.status,
						})}
					>
						{orderFields[lastPartPath as keyof IOrderData].button.label}
					</Button>
				)}
			</ul>

			{modalStatus && (
				<div className="fixed inset-0 bg-[#FFFFFF]/80 z-1100 flex items-center justify-center">
					<div>
						<p className="text-center text-[24px]">Подтвердить заказ</p>
						<div className="mt-[32px]">
							<Button
								variant="green-to-darkgreen"
								className="mr-4 p-4 px-5"
								onClick={() => handleCreateOrder()}
							>
								Подтвердить
							</Button>
							<Button
								variant="darkred-to-red"
								className="p-4 px-5"
								onClick={() => setModalStatus(false)}
							>
								Вернуться
							</Button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
