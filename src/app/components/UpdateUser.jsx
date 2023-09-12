'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

const queryClient = new QueryClient();

function ShowUpdateButton(user) {
	console.log(user.user);
	return (
		<button
			onClick={() =>
				fetch('/api/updateUser', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ employee_id: user.user.employee_id })
				}).then(res => (res.ok ? console.log('User updated') : console.log('User not updated')))
			}
			type="button"
			className="text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 ">
			Update user
		</button>
	);
}

export default function UpdateUser(user) {
	return (
		<div>
			<ShowUpdateButton user={user} />
		</div>
	);
}
