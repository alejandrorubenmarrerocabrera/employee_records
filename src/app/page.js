import CreateUser from './components/CreateUser';
import ShowAllUsers from './components/ShowAllUsers';

export default async function Home() {
	return (
		<div className="text-white">
			<CreateUser />
			<ShowAllUsers />
		</div>
	);
}
