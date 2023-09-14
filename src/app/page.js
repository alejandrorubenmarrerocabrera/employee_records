import CreateUser from './components/CreateUser';
import UpdateUserForm from './components/UpdateUserForm';
import ShowAllUsers from './components/ShowAllUsers';

export default async function Home() {
	return (
		<div className="text-white dark">
			<CreateUser />
			<ShowAllUsers />
		</div>
	);
}
