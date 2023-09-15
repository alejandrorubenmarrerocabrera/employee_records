'use client';

import React, { useState } from 'react';
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

function ShowForm({ id, name, last_name, birthday }) {
	const { mutate, isLoading, isError, isSuccess } = useMutation(sendUserData);

	const formatDate = date => {
		var d = new Date(date);
		return d.toISOString().slice(0, 10);
	};

	// Add a useState hook for birthday
	const [birthdayValue, setBirthdayValue] = useState(formatDate(birthday));

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

	// Add a handleDateChange function to update the birthday state
	const handleDateChange = e => {
		setBirthdayValue(e.target.value); // Update birthdayValue, not birthday
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
					<Input type="text" className="m-2 text-black" name="first_name" placeholder={name} />
					<Input type="text" className="m-2 text-black" name="last_name" placeholder={last_name} />
					<Input
						type="date"
						className="m-2 text-black"
						name="birthday"
						readOnly={false}
						defaultValue={()=> formatDate(birthday)} 
						onChange={handleDateChange}
					/>
					<button type="submit" className="m-2 bg-gray-500 rounded px-2 py-1" disabled={isLoading}>
						{isLoading ? 'Updating User...' : 'Update user'}
					</button>
					{isError && <div className="text-red-500">User creation failed</div>}
					{isSuccess && <div className="text-green-500">User update successful</div>}
				</form>
			</Card>
		</div>
	);
}

export default function updateUserForm({ id, name, last_name, birthday }) {
	console.log('UpdateUserForm', name, last_name, birthday);
	return (
		<QueryClientProvider client={queryClient}>
			<ShowForm id={id} name={name} last_name={last_name} birthday={birthday} />
		</QueryClientProvider>
	);
}
