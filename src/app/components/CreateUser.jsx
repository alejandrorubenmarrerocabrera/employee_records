'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Button } from 'antd';

const queryClient = new QueryClient();

async function sendUserData(data) {
	const response = await fetch('/api/createUser', {
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

function UserForm() {
	const { mutate, isLoading, isError, isSuccess } = useMutation(sendUserData);

	const handleSubmit = async event => {
		event.preventDefault();

		const formData = new FormData(event.target);
		const data = {
			first_name: formData.get('first_name'),
			last_name: formData.get('last_name'),
			birthday: formData.get('birthday')
		};

		mutate(data);
	};

	return (
		<div className="border rounded m-2 p-3">
			<h1 className="text-3xl m-2">Create User Form</h1>
			<form onSubmit={handleSubmit}>
				<input type="text" className="m-2 text-black" name="first_name" placeholder="First Name" />
				<input type="text" className="m-2 text-black" name="last_name" placeholder="Last Name" />
				<input type="date" className="m-2 text-black" name="birthday" placeholder="Birthday" />
				<button type="submit" className="m-2 p-1 rounded bg-white text-black" disabled={isLoading}>
					{isLoading ? 'Creating User...' : 'Create User'}
				</button>
				{isError && <div className="text-red-500">User update failed</div>}
				{isSuccess && <div className="text-green-500">User update successfully</div>}
			</form>
		</div>
	);
}

export default function CreateUser() {
	return (
		<QueryClientProvider client={queryClient}>
			<UserForm />
		</QueryClientProvider>
	);
}
