import React, { useState, useEffect } from "react";
import { RiCloseCircleLine } from "react-icons/ri";

const Home = () => {
	const [newItem, setNewItem] = useState("");
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		getTodos();
	}, [newItem]);

	const sendTodos = async (result) => {
		const response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/ktkrau",
			{
				method: "PUT",
				body: JSON.stringify(result),
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		const data = await response.json();
		console.log(data);
	};
	const getTodos = async () => {
		const response = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/ktkrau",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		const data = await response.json();
		setTodos(data);
	};

	const deleteItem = (ind) => {
		const newArray = todos.filter((element, index) => index !== ind);
		setTodos(newArray);
		sendTodos(newArray);
	};

	const addTodo = (e) => {
		if (newItem === "") {
			return;
		}
		if (e.key === "Enter") {
			const task = {
				label: newItem,
				done: false,
			};
			sendTodos([...todos, task]);
			setNewItem("");
		}
	};
	return (
		<div className="container">
			<div className="row">
				<div className="col-4"></div>
				<div className="col-4 caja-lista">
					<div className="card-body">
    <h5 className="card-title m-auto">MY LIST</h5>
    <input 
					id="formGroupExampleInput" type="text"
					className="form-control"
					placeholder="Add a item..."
					onChange={(e) => {
						setNewItem(e.target.value);
					}}
					value={newItem}
					onKeyPress={(e) => addTodo(e)}
				/>
				<ul>
					{Array.isArray(todos) &&
						todos !== undefined &&
						todos?.map((task, index) => {
							return (
								<li className="items" key={index}>
									{task.label}
									<button
										className="delete-item"
										onClick={() => {
											deleteItem(index);
										}}>
											<div className="boton">
										<RiCloseCircleLine/></div>
									</button>
								</li>
							);
						})}
				</ul>
  </div>
				</div>
				<div className="col-4"></div>
		</div></div>
	)

		
};

export default Home;