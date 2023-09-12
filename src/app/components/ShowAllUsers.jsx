'use client';
import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import DeleteUser from './DeleteUser';
import UpdateUser from './UpdateUser';

const queryClient = new QueryClient();

export default function ShowAllUsers() {
	return (
		<QueryClientProvider client={queryClient}>
			<FetchAllEmployees />
		</QueryClientProvider>
	);
}

function FetchAllEmployees() {
	const { isLoading, error, data } = useQuery(['repoData'], () => fetch('api/getData').then(res => res.json()));

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) return 'An error has occurred: ' + error.message;

	return (
		<div>
			<h1 className="text-3xl m-2">Employees</h1>
			<ul>
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
						<DeleteUser userId={employee.employee_id} />
						<UpdateUser user={employee} />
					</li>
				))}
			</ul>
		</div>
	);
}
