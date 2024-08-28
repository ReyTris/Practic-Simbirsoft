import OrderField from '@/components/OrderField/OrderField';
import { Button } from '@/components/ui/Button';
import { useGetOrder } from '@/hooks/useGetOrder';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const OrderPageId = () => {
	const [days, setDays] = useState(0);
	const [hours, setHours] = useState(0);
	let { id } = useParams();

	const { order, loading } = useGetOrder(Number(id));

	useEffect(() => {
		if (!loading) {
			const commonMinutes = Math.abs(order.dateTo - order.dateFrom);

			const days = Math.floor(commonMinutes / (60 * 60 * 24));
			const hours = Math.floor((commonMinutes % (60 * 60 * 24)) / 3600);
			setDays(days - (hours > 0 ? 1 : 0));
			setHours(hours);
		}
	}, [loading]);

	return (
		<>
			{loading ? (
				<div> </div>
			) : (
				<div className="py-2 border-y border-[#EEEEEE] font-bold text-[14px]">
					Заказ номер {order.id}
				</div>
			)}
			<div className="flex justify-between max-xl:flex-col">
				{loading ? (
					<p>...Загрузка</p>
				) : (
					<>
						<div className="pt-8 w-[736px] max-lg:w-[100%]">
							<div className="flex justify-between max-xl:flex-col">
								<div className="">
									<div className="text-[24px]">Ваш заказ подтвержден</div>
									<div className="text-[18px] font-normal mt-4">
										{order.carId.name}
									</div>
									<div className="text-[14px] leading-[14px] w-fit mt-2 p-2 border rounded">
										{order.carId.number}
									</div>

									{order.isFullTank && (
										<div className="mt-2">
											<span className="text-[14px] font-semibold">Топливо</span>{' '}
											100%
										</div>
									)}

									<div className="mt-2">
										<span className="text-[14px] font-semibold">
											Доступна с{' '}
										</span>
										<span>
											{dayjs(order.dateFrom * 1000).format('DD.MM.YYYY HH:mm')}
										</span>
									</div>
									<div className="mt-2">
										<span className="text-[14px] font-semibold">
											Доступна по{' '}
										</span>
										<span>
											{dayjs(order.dateTo * 1000).format('DD.MM.YYYY HH:mm')}
										</span>
									</div>
								</div>
								<img
									src={order.carId.thumbnail.path}
									alt={order.carId.name}
									className="w-[256px]"
								/>
							</div>
						</div>
						<div className="w-[350px] pl-8 pt-8 border-l border-grayLight">
							<div className="text-[18px] font-bold text-right">Ваш заказ</div>
							<ul className="mt-6">
								<li>
									<OrderField
										name="Пункт выдачи"
										value={`${order.cityId.name}, ${order.pointId.address}`}
									/>
								</li>
								<li>
									<OrderField name="Модель" value={`${order.carId.name}`} />
								</li>
								<li>
									<OrderField name="Цвет" value={`${order.color}`} />
								</li>
								<li>
									<OrderField
										name="Длительность аренды"
										value={`${days}д ${hours}ч`}
									/>
								</li>

								{order.isNeedChildChair && (
									<li>
										<OrderField name="Детское кресло" value={'Да'} />
									</li>
								)}

								{order.isNeedChildChair && (
									<li>
										<OrderField name="Правый руль" value={'Да'} />
									</li>
								)}

								{order.isFullTank && (
									<li>
										<OrderField name="полный бак" value={'Да'} />
									</li>
								)}
								<div className="mt-8 text-[16px]">
									<span className="font-semibold">Цена</span>: {order.price} Р
								</div>
								<Button
									variant="darkred-to-red"
									className={'mt-8 w-[100%] text-center'}
								>
									Отменить
								</Button>
							</ul>
						</div>
					</>
				)}
			</div>
		</>
	);
};
