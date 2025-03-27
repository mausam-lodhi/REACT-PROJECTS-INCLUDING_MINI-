import { useState } from "react";

function To_Do() {
	const [arr, setArr] = useState(["Go for a walk", "Go to gym"]);
	function addInList() {
		let inputElement = document.getElementById("input").value;
		if (inputElement != "") {
			setArr([...arr, inputElement]);
			document.getElementById("input").value = "";
		} else {
			console.error("enter your value");
		}
	}
	function removeInList() {
		arr.pop();
		setArr([...arr]);
	}

	return (
		<>
			<h2>TO-DO-LIST</h2>
			<input
				type='text'
				placeholder='enter your task'
				id='input'
			/>
			<button onClick={addInList}>Add</button>
			<button onClick={removeInList}>Remove</button>
			<ol>
				{arr.map((ele, index) => (
					<li className='list' key={index}>
						{ele}
					</li>
				))}
			</ol>
		</>
	);
}
export default To_Do;
