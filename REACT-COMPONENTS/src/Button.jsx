function Button() {
	let count = 0;
	function funButton() {
		count++;
		console.log("buttton presseed");
		console.log(`you licked me  : ${count} times`);
	}
	return (
		<>
			<button onClick={funButton}>Click me </button>
		</>
	);
}
export default Button;
