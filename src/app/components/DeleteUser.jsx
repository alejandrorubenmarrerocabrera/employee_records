import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const queryClient = new QueryClient();

function ShowDeleteButton(id) {
	const router = useRouter();
	fetch('/api/deleteUser', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(id)
	});

	return (
		<div>
			<button
				onClick={() =>
					fetch('/api/deleteUser', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({ employee_id: id.userId.userId })
					}).then(res => (res.ok ? console.log('User deleted') : console.log('User not deleted')))
				}
				type="button"
				className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
				Delete user
			</button>
		</div>
	);
}

export default function DeleteUser(userId) {
	return (
		<QueryClientProvider client={queryClient}>
			<ShowDeleteButton userId={userId} />
		</QueryClientProvider>
	);
}
