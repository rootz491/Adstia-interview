import { Button, Center, Table } from "@mantine/core";
import moment from "moment";
import { useEffect, useState } from "react";

const BACKEND_URL = "http://localhost:3000";

export default function TableComponent() {
	const [users, setUsers] = useState([]);

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = () => {
		fetch(BACKEND_URL + "/user")
			.then((response) => response.json())
			.then((data) => setUsers(data));
	};

	const deleteUser = (id) => {
		fetch(BACKEND_URL + "/user/" + id, {
			method: "DELETE",
		}).then(() => {
			fetchUsers();
		});
	};

	const createUser = (e) => {
		e.preventDefault();

		fetch(BACKEND_URL + "/user", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, email, phone }),
		})
			.then(() => {
				fetchUsers();
				setUsername("");
				setEmail("");
				setPhone("");
			})
			.catch((error) => {
				alert(error);
			});
	};

	return (
		<>
			<h1 style={{ textAlign: "center" }}>Create User</h1>
			<form
				style={{
					display: "grid",
					width: "50%",
					margin: "auto",
				}}
			>
				<label htmlFor="username">Username</label>
				<input
					type="text"
					id="username"
					name="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>

				<label htmlFor="email">Email</label>
				<input
					type="email"
					id="email"
					name="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<label htmlFor="phone">Phone Number</label>
				<input
					type="tel"
					id="phone"
					name="phone"
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
				/>

				<input type="submit" value="Submit" onClick={createUser} />
			</form>

			<hr />

			<Table captionSide>
				{/* <tfoot>{ths}</tfoot> */}
				<thead>
					<tr>
						<th>Name</th>
						<th>Email</th>
						<th>Phone Number</th>
						<p>Date</p>
						<p>Options</p>
					</tr>
				</thead>
				<caption>List of users</caption>
				<tbody>
					{users.map((element) => (
						<tr key={element._id}>
							<td>{element.username}</td>
							<td>{element.phone}</td>
							<td>{element.email}</td>
							<td>
								{moment(element.createdAt)
									.format("DD MM YYYY")
									.split(" ")
									.join("/")}
							</td>
							<Button
								onClick={() => {
									deleteUser(element._id);
								}}
							>
								Delete
							</Button>
						</tr>
					))}
				</tbody>
			</Table>
		</>
	);
}
