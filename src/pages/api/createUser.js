import pool from "@/app/database";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { first_name, last_name, birthday } = req.body;

      const SQL = 'CALL InsertEmployee(?, ?, ?)';

      const [result] = await pool.query(SQL, [first_name, last_name, birthday]);

      res.status(201).json({ message: 'Employee created successfully', result });
    } catch (error) {
      console.error("Error creating employee -> ", error);
      res.status(500).json({ message: 'Employee creation failed' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}