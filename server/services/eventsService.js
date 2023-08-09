const CONFIG = useRuntimeConfig()
const { doDBQuery } = useQuery()

export const eventsService = {
	getAll,
	// getPage,
	getAllCurrent,
	getOne,
	editOne,
	deleteOne,
	addOne,
	changeStatus,
}

async function getAll() {
	const sql = `SELECT
									event_id,
									event_id as id,
									event_title,
									event_title as title,
									event_description,
									event_location,
									event_dt as dt,
									expire_dt,
									release_dt,
									status
                FROM
									inbrc_events
                WHERE
									deleted = 0
                ORDER BY dt DESC`

	const events = await doDBQuery(sql)

	return events
}

async function getAllCurrent() {
	const sql = `SELECT
									event_id,
									event_id as id,
									event_title,
									event_title as title,
									event_description,
									event_location,
									event_dt as dt,
									status
                FROM
                    inbrc_events
                WHERE
                  deleted = 0
									AND status = 1
									AND DATEDIFF( CURDATE(), event_dt)  <=  0
									AND DATEDIFF( CURDATE(), expire_dt)  <=  0
									AND DATEDIFF( CURDATE(), release_dt)  >  0
                ORDER BY dt ASC`

	const events = await doDBQuery(sql)
	return events
}

/* function getPage(id) {
	const requestOptions = {
		url: `${API}/events/page/` + id,
		method: 'GET',
	}
	return Axios(requestOptions).then(handleSuccess).catch(handleError)
} */

async function getOne(id) {
	const sql =
		`SELECT
								event_id,
								event_id as id,
								event_title,
								event_title as title,
								event_description,
								event_location,
								event_dt,
								event_dt as dt,
								expire_dt,
								release_dt
							FROM
									inbrc_events
							WHERE
								event_id = ` + id

	const events = await doDBQuery(sql)

	return events[0]
}

// YES Authorization Required

async function addOne({
	event_title,
	event_description,
	event_location,
	event_dt,
	release_dt,
	expire_dt,
}) {
	const sql = `INSERT INTO inbrc_events SET
								event_title = ?,
								event_description = ?,
								event_location = ?,
								event_dt = ?,
								release_dt = ?,
								expire_dt = ?,
								created_dt = NOW(),
								modified_dt= NOW()`

	let inserts = []
	inserts.push(
		event_title,
		event_description,
		event_location,
		event_dt,
		release_dt,
		expire_dt
	)

	const events = await doDBQuery(sql, inserts)
	return events
}

async function editOne({
	id,
	event_title,
	event_description,
	event_location,
	event_dt,
	release_dt,
	expire_dt,
}) {
	const sql = `UPDATE inbrc_events SET
								event_title = ?,
								event_description = ?,
								event_location = ?,
								event_dt = ?,
								release_dt = ?,
								expire_dt = ?,
								created_dt = NOW(),
								modified_dt= NOW()
							WHERE event_id = ?`

	let inserts = []
	inserts.push(
		event_title,
		event_description,
		event_location,
		event_dt,
		release_dt,
		expire_dt,
		id
	)

	const events = await doDBQuery(sql, inserts)
	return events
}

async function deleteOne(id) {
	const sql = `UPDATE inbrc_events SET deleted = 1, deleted_dt = NOW() WHERE event_id = ${id}`
	const events = await doDBQuery(sql)

	return events
}

async function changeStatus({ id, status }) {
	const sql = `UPDATE inbrc_events SET status = ${status} WHERE event_id = ${id}`
	const events = await doDBQuery(sql)

	return events
}
