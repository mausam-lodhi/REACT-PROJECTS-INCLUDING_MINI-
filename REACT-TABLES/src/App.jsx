import axios from "axios";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams } from "react-router-dom";
import "./App.css";

function App() {
	const [tabledata, setTabledata] = useState([]);

	useEffect(() => {
		printData();
	}, []);

	function printData() {
		axios.get("http://localhost:8080/get")
			.then((res) => {
				setTabledata(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function deleteRow(id) {
		axios.delete(`http://localhost:8080/get/${id}`)
			.then((res) => {
				if (id === res.data._id) {
					setTabledata((prevData) => prevData.filter((row) => row._id !== id));
				}
				printData();
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function updateRow(id, updatedData) {
		axios.put(`http://localhost:8080/get/${id}`, updatedData)
			.then((res) => {
				setTabledata((prevData) => prevData.map((row) => (row._id === id ? res.data : row)));
				printData();
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<Router>
			<Routes>
				<Route path='/' element={<MainPage tabledata={tabledata} deleteRow={deleteRow} />} />
				<Route path='/add-user' element={<AddUserPage printData={printData} />} />
				<Route path='/edit-user/:id' element={<EditUserPage printData={printData} updateRow={updateRow} />} />
			</Routes>
		</Router>
	);
}

function MainPage({ tabledata, deleteRow }) {
	const navigate = useNavigate();

	return (
		<>
			<h2>Table</h2>
			<table border={1} style={{ textAlign: "center", height: "100px", width: "100%", borderCollapse: "collapse" }}>
				<thead>
					<tr>
						<th>id</th>
						<th>name</th>
						<th>city</th>
						<th>salary</th>
						<th>isGood</th>
						<th>options</th>
					</tr>
				</thead>
				<tbody>
					{tabledata.map((row) => (
						<tr key={row._id}>
							<td>{row._id}</td>
							<td>{row.name}</td>
							<td>{row.city}</td>
							<td>{row.salary}</td>
							<td>{row.isGood}</td>
							<td>
								<button onClick={() => navigate(`/edit-user/${row._id}`)}>Edit</button>
								{"\u00A0"} {"\u00A0"}
								<button onClick={() => deleteRow(row._id)}>Delete</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<br />
			<button onClick={() => navigate("/add-user")}>Add User</button>
		</>
	);
}

function AddUserPage({ printData }) {
	const [newData, setNewData] = useState({ name: "", city: "", salary: "", isGood: "" });
	const navigate = useNavigate();

	function handleChange(e) {
		const { name, value } = e.target;
		setNewData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	}

	function updateData() {
		axios.post("http://localhost:8080/get", newData)
			.then(() => {
				printData();
				setNewData({ name: "", city: "", salary: "", isGood: "" });
				navigate("/");
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<>
			<h2>Add User</h2>
			<table border={1} style={{ textAlign: "center", height: "100px", width: "100vw", borderCollapse: "collapse" }}>
				<thead>
					<tr>
						<th>name</th>
						<th>city</th>
						<th>salary</th>
						<th>isGood</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<input type='text' name='name' value={newData.name} onChange={handleChange} style={{ width: "80%" }} />
						</td>
						<td>
							<input type='text' name='city' value={newData.city} onChange={handleChange} style={{ width: "80%" }} />
						</td>
						<td>
							<input type='text' name='salary' value={newData.salary} onChange={handleChange} style={{ width: "80%" }} />
						</td>
						<td>
							<input type='text' name='isGood' value={newData.isGood} onChange={handleChange} style={{ width: "80%" }} />
						</td>
					</tr>
				</tbody>
			</table>
			<br />
			<button onClick={updateData}>Submit</button>
		</>
	);
}

function EditUserPage({ printData, updateRow }) {
	const [newData, setNewData] = useState({ name: "", city: "", salary: "", isGood: "" });
	const navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		axios.get(`http://localhost:8080/get/${id}`)
			.then((res) => {
				setNewData(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [id]);

	function handleChange(e) {
		const { name, value } = e.target;
		setNewData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	}

	function handleSubmit() {
		updateRow(id, newData);
		navigate("/");
	}

	return (
		<>
			<h2>Edit User</h2>
			<table border={1} style={{ textAlign: "center", height: "100px", width: "100vw", borderCollapse: "collapse" }}>
				<thead>
					<tr>
						<th>name</th>
						<th>city</th>
						<th>salary</th>
						<th>isGood</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<input type='text' name='name' value={newData.name} onChange={handleChange} style={{ width: "80%" }} />
						</td>
						<td>
							<input type='text' name='city' value={newData.city} onChange={handleChange} style={{ width: "80%" }} />
						</td>
						<td>
							<input type='text' name='salary' value={newData.salary} onChange={handleChange} style={{ width: "80%" }} />
						</td>
						<td>
							<input type='text' name='isGood' value={newData.isGood} onChange={handleChange} style={{ width: "80%" }} />
						</td>
					</tr>
				</tbody>
			</table>
			<br />
			<button onClick={handleSubmit}>Submit</button>
		</>
	);
}

export default App;
