import { useState } from "react";
import "./index.css";
function Counter() {
	const [count, setCount] = useState(0);
	function updateIncrease() {
		setCount(count + 1);
	}
	function updateDecrease() {
		setCount(count - 1);
	}
	function updateReset() {
		setCount(0);
	}
	return (
		<>
			<div className='main'>
				<p className='value'>{count}</p>
				<div className='buttons'>
					<button
						className='increase'
						onClick={updateIncrease}
					>
						Increase
					</button>
					<button
						className='decrease'
						onClick={updateDecrease}
					>
						Decrease
					</button>
					<button
						className='reset'
						onClick={updateReset}
					>
						Reset
					</button>
				</div>
			</div>
		</>
	);
}
export default Counter;
