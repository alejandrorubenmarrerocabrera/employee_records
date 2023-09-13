import pool from '@/app/database';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			const { first_name, last_name, birthday, employee_id } = req.body;

			const SQL = `UPDATE employees
			SET
			first_name = COALESCE(?, first_name),
			last_name = COALESCE(?, last_name),
			birthday = COALESCE(?, birthday)
			WHERE employee_id = ?`;

			const [result] = await pool.query(SQL, [
				first_name || null,
				last_name || null,
				birthday || null,
				employee_id
			]);
			pool.query('CALL UpdateEmployeeAge(?)', [employee_id]);

			res.status(201).json({ message: 'Employee updated successfully', result });
		} catch (error) {
			console.error('Error creating employee -> ', error);
			res.status(500).json({ message: 'Employee update failed' });
		}
	} else {
		res.status(405).json({ message: 'Method not allowed' });
	}
}
