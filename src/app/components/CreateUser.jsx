'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { Card } from 'antd';
import { Input } from 'antd';

const { Meta } = Card;
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
	const [formData, setFormData] = useState({
		first_name: '',
		last_name: '',
		birthday: ''
	});

	const { mutate, isLoading, isError, isSuccess } = useMutation(sendUserData);

	const handleSubmit = async event => {
		event.preventDefault();

		const data = {
			first_name: formData.first_name,
			last_name: formData.last_name,
			birthday: formData.birthday
		};

		try {
			await mutate(data);
			// Clear the form fields on successful user creation
			setFormData({
				first_name: '',
				last_name: '',
				birthday: ''
			});
		} catch (error) {
			console.error(error);
		}
	};

	const handleChange = event => {
		const { name, value } = event.target;
		setFormData(prevData => ({
			...prevData,
			[name]: value
		}));
	};

	return (
		<div className="m-2 p-3">
			<Card>
				<Meta title="Create User form" description="" />
				<form onSubmit={handleSubmit}>
					<Input
						type="text"
						className="m-2 text-black"
						name="first_name"
						placeholder="First Name"
						value={formData.first_name}
						onChange={handleChange}
					/>
					<Input
						type="text"
						className="m-2 text-black"
						name="last_name"
						placeholder="Last Name"
						value={formData.last_name}
						onChange={handleChange}
					/>
					<Input
						type="date"
						className="m-2 text-black"
						name="birthday"
						placeholder="Birthday"
						value={formData.birthday}
						onChange={handleChange}
					/>
					<button type="submit" className="m-2 p-1 rounded bg-green-500 text-black" disabled={isLoading}>
						{isLoading ? 'Creating User...' : 'Create User'}
					</button>
					{isError && <div className="text-red-500">User update failed</div>}
					{isSuccess && <div className="text-green-500">User update successfully</div>}
				</form>
			</Card>
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
