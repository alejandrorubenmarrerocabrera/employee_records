import pool from '@/app/database';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			const { employee_id } = req.body;

			const SQL = 'DELETE FROM employees WHERE employee_id = ?';

			const [result] = await pool.query(SQL, [employee_id]);

			res.status(201).json({ message: 'Employee deleted successfully', result });
		} catch (error) {
			console.error('Error creating employee -> ', error);
			res.status(500).json({ message: 'Employee deletion failed' });
		}
	} else {
		res.status(405).json({ message: 'Method not allowed' });
	}
}
