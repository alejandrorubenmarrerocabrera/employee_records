import pool from '@/app/database';

export default async function getData(req, res) {
	try {
		const [rows] = await pool.query('SELECT * FROM employees');
		res.status(200).json(rows);
	} catch (error) {
		console.log('Error fetching from MYSQL getData.js -> ', error);
		res.status(500).json({ error: 'Database error' });
	}
}
