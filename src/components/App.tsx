import { useState } from 'react';
import './App.scss';
import { Test } from './test/Test';

const App = () => {
	const [count, setCount] = useState<number>(0);

	const increment = () => {
		setCount((prev) => prev + 1);
	};

	const dicrement = () => {
		setCount((prev) => prev - 1);
	};
	return (
		<div>
			<h1>{count}</h1>
			<button onClick={increment}>+</button>
			<button onClick={dicrement}>-</button>
			<Test />
		</div>
	);
};
export default App;
