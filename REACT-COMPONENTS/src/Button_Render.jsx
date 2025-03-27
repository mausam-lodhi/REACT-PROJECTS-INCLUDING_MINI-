import { useState } from "react";

function Buttton_Render() {
	const [name, setName] = useState("");
	const [age, setAge] = useState("");
	function updateAge() {
		setAge("20");
	}
	function updateName() {
		setName("mausam");
	}

	return (
		<>
			<p> Name : {name}</p>
			<p> age :{age}</p>
			<button onClick={updateName}>Set name</button>
			<button onClick={updateAge}>Set Age </button>
		</>
	);
}
export default Buttton_Render;
