import { useState } from "react";

function Color_Picker() {
	const [color, setColor] = useState("white", "");
	function changeColor(event) {
		setColor(event.target.value);
		console.log(event.target.value);
	}
	return (
		<>
			<p style={{ color: color }} className='color_picker'>
				Changed Color
			</p>
			<input
				id='input'
				type='color'
				className='inputcolor'
				placeholder='enter your color'
				onChange={changeColor}
			/>
		</>
	);
}
export default Color_Picker;
