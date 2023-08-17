import mysql from 'mysql2/promise'

export default function useQuery() {
	const CONFIG = useRuntimeConfig()
	async function doDBQuery(sql, inserts) {
		const conn1 = await mysql.createPool({
			host: CONFIG.DB_HOST,
			user: CONFIG.DB_USER,
			password: CONFIG.DB_PASSWORD,
			database: CONFIG.DB_DATABASE,
		})
		if (inserts) {
			sql = mysql.format(sql, inserts)
		}
		// console.log('IN dbQery sql = ', sql)
		const [rows, fields] = await conn1.execute(sql)
		await conn1.end()
		return rows
	}
	return {
		doDBQuery,
	}
}
