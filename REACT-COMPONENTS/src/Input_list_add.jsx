import { useState } from "react";

function Input_list_add() {
	const [arr, setArr] = useState(["arr", "mausam", "ram"]);

	function addElement() {
		let newElement = document.getElementById("inputelement").value;
		if (newElement != "") {
			setArr([...arr, newElement]);
			document.getElementById("inputelement").value = "";
		} else {
			console.error("enter any value");
		}
	}
	function deleteElement() {
		console.log(arr.pop());

		setArr([...arr]);
	}
	return (
		<>
			<ol>
				{arr.map((ele, index) => (
					<li className='list' key={index}>
						{ele}
					</li>
				))}
			</ol>
			<input
				type='text'
				placeholder='enter you want to add'
				id='inputelement'
			/>

			<button onClick={addElement}>Add element</button>
			<button onClick={deleteElement}>Delete element</button>
		</>
	);
}
export default Input_list_add;
