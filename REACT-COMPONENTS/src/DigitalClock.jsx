import { useState, useEffect } from "react";

function DigitalClock() {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		const timerId = setInterval(updateTime, 1000);
		return () => clearInterval(timerId);
	}, []);

	function updateTime() {
		setTime(new Date());
	}

	return (
		<>
			<div className='clock-container'>
				<div className='clock'>
					<span>{time.toLocaleTimeString()}</span>
				</div>
			</div>
		</>
	);
}
export default DigitalClock;
