function List() {
	const fruits = ["apple", "banana", "litchi"];
	const listitem = fruits.map((fruit, index) => <li key={index}>{fruit}</li>);
	return (
		<>
			<ul>{listitem}</ul>
			<h1>mausam</h1>
		</>
	);
}
export default List;
