import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Category from "./categories.jsx";
import AddCategory from "./addCategory.jsx";
import EditCategory from "./editCategory.jsx";
import Transactions from "./transactions.jsx";
import AddTransaction from "./addTransaction.jsx";
import HomePage from "./homePage.jsx";
import EditTransaction from "./editTransaction.jsx";

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path='/' element={<HomePage />} />

					<Route path='/category' element={<Category />} />
					<Route path='/category/add-category' element={<AddCategory />} />
					<Route path='/category/edit-category/:_id' element={<EditCategory />} />

					<Route path='/transaction' element={<Transactions />} />
					<Route path='/transaction/add-transaction' element={<AddTransaction />} />
					<Route path='/transaction/edit-transaction/:_id' element={<EditTransaction />} />
				</Routes>
			</Router>
		</>
	);
}
export default App;
