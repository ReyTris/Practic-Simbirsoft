import { useRateCar } from '@/hooks/useRateCar';

export const AdditionalPage = () => {
	const {rate} = useRateCar(6)

	console.log(rate);
	
	return <div>AdditionalPage</div>;
};
