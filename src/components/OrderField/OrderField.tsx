import React from 'react';

interface OrderFieldsProps {
	name: string;
	value: string;
}

const OrderField = ({ name, value }: OrderFieldsProps) => {
	return (
		<div className="flex justify-between items-end">
			<span className="inline-block text-[14px]">{name}</span>
			<div className="border-b-[1px] border-dotted border-gray flex-1 mx-2 mb-[6px]"></div>
			<span className="inline-block max-w-[112px] text-[14px] text-gray text-right">
				{value}
			</span>
		</div>
	);
};

export default OrderField;
