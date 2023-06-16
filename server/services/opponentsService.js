const CONFIG = useRuntimeConfig()
const { doDBQuery } = useQuery()

export const opponentsService = {
	getAll,
	getSuggestions,
	getOne,
	editOne,
	addOne,
	deleteOne,
	changeStatus,
}

async function getAll() {
	const sql = `SELECT
					opponent_id,
					opponent_id as id,
					opponent_name,
					opponent_name as title,
					opponent_location,
					opponent_type,
					opponent_level,
					opponent_description,
					status,
					deleted,
					created_dt,
					modified_dt,
					modified_dt as dt
			FROM
					inbrc_opponents
			WHERE
					deleted = 0
					AND
					status = 1
			ORDER BY
				opponent_name ASC`

	const opponents = await doDBQuery(sql)
	return opponents
}

async function getSuggestions() {
	const sql = `SELECT
									opponent_id as id,
									opponent_id,
									opponent_name
							FROM inbrc_opponents
							WHERE deleted = 0 AND status = 1
							ORDER BY opponent_name ASC`

	const suggestions = await doDBQuery(sql)
	return suggestions
}

async function getOne(id) {
	const sql = `SELECT
								opponent_id,
								opponent_id as id,
								opponent_name,
								opponent_location,
								opponent_type,
								opponent_level,
								opponent_description,
								status,
								deleted,
								created_dt,
								modified_dt
						FROM
								inbrc_opponents
						WHERE
								deleted = 0
								AND
								opponent_id = ${id}`

	const opponents = await doDBQuery(sql)
	return opponents[0]
}

async function editOne(item) {
	const sql = `UPDATE inbrc_opponents
				SET
					opponent_name = ?,
					opponent_location = ?,
					opponent_type = ?,
					opponent_level = ?,
					opponent_description = ?,
					modified_dt= NOW()
				WHERE opponent_id = ?`

	let inserts = []
	inserts.push(
		item.opponent_name,
		item.opponent_location,
		item.opponent_type,
		item.opponent_level,
		item.opponent_description,
		item.id
	)
	const opponents = await doDBQuery(sql, inserts)
	return opponents
}

async function addOne(item) {
	const sql = `INSERT INTO inbrc_opponents
				SET
				opponent_id = ?,
				opponent_name = ?,
				opponent_location = ?,
				opponent_type = ?,
				opponent_level = ?,
				opponent_description = ?,
				status = 1,
				deleted = 0,
				created_dt = NOW(),
				modified_dt = NOW()`

	let inserts = []
	inserts.push(
		item.opponent_id,
		item.opponent_name,
		item.opponent_location,
		item.opponent_type,
		item.opponent_level,
		item.opponent_description
	)
	const opponents = await doDBQuery(sql, inserts)
	return opponents
}

async function deleteOne(id) {
	const sql =
		`UPDATE inbrc_opponents SET deleted = 1, deleted_dt= NOW() WHERE opponent_id = ` +
		id
	const opponents = await doDBQuery(sql)
	return opponents
}

async function changeStatus({ id, status }) {
	const sql =
		`UPDATE inbrc_opponents SET status = "` +
		status +
		`" WHERE opponent_id = ` +
		id
	const opponents = await doDBQuery(sql)
	return opponents
}
