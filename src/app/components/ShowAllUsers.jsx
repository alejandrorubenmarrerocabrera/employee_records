'use client';

import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery, useMutation } from '@tanstack/react-query';
import { Button } from 'antd';
import { Card } from 'antd';
import UpdateUserForm from './UpdateUserForm';

const queryClient = new QueryClient();

async function deleteUser(id) {
	const res = await fetch('/api/deleteUser', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ employee_id: id })
	});
	if (res.ok) {
		console.log('User deleted');
	} else {
		console.log('User not deleted');
	}
}

function FetchAllEmployees() {
	const { isLoading, error, data, refetch } = useQuery(['repoData'], () =>
		fetch('/api/getData').then(res => res.json())
	);

	const deleteUserMutation = useMutation(deleteUser, {
		onSuccess: () => {
			// When a user is deleted successfully, trigger a re-fetch of data
			refetch();
		}
	});

	useEffect(() => {
		const intervalId = setInterval(() => {
			refetch();
		}, 1000);

		return () => {
			clearInterval(intervalId);
		};
	}, [refetch]);

	const [selectedUserId, setSelectedUserId] = useState(null);

	const handleUpdateUserClick = id => {
		setSelectedUserId(id);
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) return 'An error has occurred: ' + error.message;

	return (
		<div>
			<h1 className="text-3xl text-center bg-white text-black font-bold rounded mx-10 my-1 m-2">Employees</h1>
			<div className="grid grid-cols-3">
				{data.map(employee => (
					<Card key={employee.employee_id} className="m-2">
						<div className="font-bold">
							{employee.first_name} {employee.last_name}
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
						<Button
							type="primary"
							className="bg-red-500 rounded mx-1"
							onClick={() => deleteUserMutation.mutate(employee.employee_id)}>
							Delete user
						</Button>
						<Button
							type="secondary"
							className="mx-1 bg-green-500 text-white"
							onClick={() => handleUpdateUserClick(employee.employee_id)}>
							Update User
						</Button>
					</Card>
				))}
			</div>
			{selectedUserId && <UpdateUserForm id={selectedUserId} />}
		</div>
	);
}

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<FetchAllEmployees />
		</QueryClientProvider>
	);
}

export default App;
