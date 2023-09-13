'use client';

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function ShowAllUsers() {
	return (
		<QueryClientProvider client={queryClient}>
			<FetchAllEmployees />
		</QueryClientProvider>
	);
}

function deleteUser(id) {
	fetch('/api/deleteUser', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ employee_id: id })
	}).then(res => (res.ok ? console.log('User deleted') : console.log('User not deleted')));
}

function FetchAllEmployees() {
	let show = false;
	const { isLoading, error, data } = useQuery(['repoData'], () => fetch('api/getData').then(res => res.json()));

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) return 'An error has occurred: ' + error.message;

	return (
		<div>
			<h1 className="text-3xl m-2">Employees</h1>
			<ul className="grid grid-cols-3">
				{data.map(employee => (
					<li key={employee.employee_id}>
						<div>
							Name: {employee.first_name} {employee.last_name}
						</div>
						<div>
							Birthday:{' '}
							{new Date(employee.birthday).toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})}
						</div>
						<div>Age: {employee.age}</div>
						<div>Id: {employee.employee_id}</div>
						<button className="bg-red-500 rounded" onClick={deleteUser(employee.employee_id)}>
							Delete user
						</button>
						<div>
							<form action="api/updateUser" method="POST">
								<div className="m-1">
									<span>First name: </span>
									<input type="text" name="first_name" className="text-black" />
								</div>
								<div className="m-1">
									<span>Last name: </span>
									<input type="text" name="last_name" className="text-black" />
								</div>
								<div className="m-1">
									<span>Birthday: </span>
									<input type="date" name="birthday" className="text-black" />
								</div>
								<input type="hidden" name="employee_id" value={employee.employee_id} />
								{/* Add more form inputs as needed */}
								<button type="submit">Update user</button>
							</form>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
