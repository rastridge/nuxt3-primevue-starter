const CONFIG = useRuntimeConfig()
const { doDBQuery } = useQuery()

export const paymentsService = {
	getAll,
	getAllCurrent,
	getOne,
	editOne,
	addOne,
	deleteOne,
	changeStatus,
}

async function getAll() {
	const sql = `SELECT
								payment_id,
								payment_id as id,
								payment_title,
								payment_title as title,
								payment_description,
								payment_paypal_button,
								release_dt,
								expire_dt,
								status,
								deleted,
								created_dt,
								modified_dt,
								modified_dt as dt
							FROM
								inbrc_payments
							WHERE
								deleted = 0
							ORDER BY
								id DESC`
	const payments = await doDBQuery(sql)
	return payments
}

async function getAllCurrent() {
	const sql = `SELECT
								payment_id,
								payment_id as id,
								payment_title,
								payment_title as title,
								payment_description,
								payment_paypal_button,
								release_dt,
								expire_dt,
								status,
								deleted,
								created_dt,
								modified_dt,
								modified_dt as dt
							FROM
									inbrc_payments
							WHERE
								deleted = 0
								AND
								status = 1
								AND
								DATEDIFF( CURDATE(), expire_dt)  <=  0
							ORDER BY
								id DESC`

	const payments = await doDBQuery(sql)
	return payments
}

async function getOne(id) {
	const sql = `SELECT
								payment_id,
								payment_id as id,
								payment_title,
								payment_title as title,
								payment_description,
								payment_paypal_button,
								release_dt,
								expire_dt,
								status,
								deleted,
								created_dt,
								modified_dt
							FROM
								inbrc_payments
							WHERE
								deleted = 0
								AND
								payment_id = ${id}`

	const payments = await doDBQuery(sql)
	return payments[0]
}

async function editOne({
	payment_title,
	payment_description,
	payment_paypal_button,
	release_dt,
	expire_dt,
	id,
}) {
	const sql = `UPDATE inbrc_payments SET
								payment_title = ?,
								payment_description = ?,
								payment_paypal_button = ?,
								release_dt = ?,
								expire_dt = ?,
								modified_dt= NOW()
							WHERE payment_id = ?`
	const inserts = []
	inserts.push(
		payment_title,
		payment_description,
		payment_paypal_button,
		release_dt,
		expire_dt,
		id
	)
	const payments = await doDBQuery(sql, inserts)

	return payments
}

async function addOne({
	payment_title,
	payment_description,
	payment_paypal_button,
	release_dt,
	expire_dt,
}) {
	const sql = `INSERT INTO inbrc_payments SET
								payment_title = ?,
								payment_description = ?,
								payment_paypal_button = ?,
								release_dt = ?,
								expire_dt = ?,
								status = 1,
								deleted = 0,
								created_dt = NOW(),
								modified_dt = NOW()`

	const inserts = []
	inserts.push(
		payment_title,
		payment_description,
		payment_paypal_button,
		release_dt,
		expire_dt
	)
	const payments = await doDBQuery(sql, inserts)

	return payments
}

async function deleteOne(id) {
	const sql =
		`UPDATE inbrc_payments SET deleted = 1, deleted_dt= NOW() WHERE payment_id = ` +
		id
	const payments = await doDBQuery(sql)

	return payments
}

async function changeStatus({ id, status }) {
	const sql =
		`UPDATE inbrc_payments SET status = "` +
		status +
		`" WHERE payment_id = ` +
		id
	const payments = await doDBQuery(sql)

	return payments
}
