'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { Button } from 'antd';
import { Card } from 'antd';
import { Input } from 'antd';

const { Meta } = Card;
const queryClient = new QueryClient();

async function sendUserData(data) {
	const response = await fetch('/api/updateUser', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});

	if (!response.ok) {
		throw new Error('User creation failed');
	}

	return response.json();
}

function ShowForm({ id }) {
	const { mutate, isLoading, isError, isSuccess } = useMutation(sendUserData);

	const handleSubmit = async event => {
		event.preventDefault();

		const formData = new FormData(event.target);
		const data = {
			employee_id: formData.get('employee_id'),
			first_name: formData.get('first_name'),
			last_name: formData.get('last_name'),
			birthday: formData.get('birthday')
		};

		mutate(data);
	};

	return (
		<div className="m-2 p-3">
			<Card>
				<Meta title="Update User form" description="" />
				<form onSubmit={handleSubmit}>
					<Input
						type="text"
						value={id}
						readOnly={true}
						className="m-2  text-black"
						name="employee_id"
						placeholder="Id"
					/>
					<Input type="text" className="m-2 text-black" name="first_name" placeholder="First Name" />
					<Input type="text" className="m-2 text-black" name="last_name" placeholder="Last Name" />
					<Input type="date" className="m-2 text-black" name="birthday" placeholder="Birthday" />
					<button type="submit" className="m-2 bg-gray-500 rounded px-2 py-1" disabled={isLoading}>
						{isLoading ? 'Updating User...' : 'Update user'}
					</button>
					{isError && <div className="text-red-500">User creation failed</div>}
					{isSuccess && <div className="text-green-500">User update successfully</div>}
				</form>
			</Card>
		</div>
	);
}
export default function updateUserForm({ id }) {
	console.log('UpdateUserForm', id);
	return (
		<QueryClientProvider client={queryClient}>
			<ShowForm id={id} />
		</QueryClientProvider>
	);
}
