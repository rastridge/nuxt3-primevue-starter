const { doDBQuery } = useQuery()
export const leadersService = {
	getAll,
	getAllCurrent,
	getOne,
	editOne,
	addOne,
	getYears,
	deleteOne,
	changeStatus,
}

async function getYears() {
	const sql = `SELECT
								leaders_year
							FROM 
								inbrc_leaders
							WHERE 
								deleted != 1
							ORDER BY 
								leaders_year`

	const years = await doDBQuery(sql)
	return years
}

async function getAll() {
	const sql = `SELECT
									leaders_id,
									leaders_id as id,
									leaders_year as title,
									president,
									vice_president,
									secretary,
									match_secretary,
									treasurer,
									social_chairman, 
									spring_captain,
									fall_captain,
									coach,
									assistant_coach,
									chair_bod,
									status,
									deleted,
									deleted_dt,
									modified_dt,
									modified_dt as dt
                FROM inbrc_leaders
                WHERE deleted = 0
                ORDER BY title ASC`

	const leaders = await doDBQuery(sql)
	return leaders
}

async function getAllCurrent() {
	const sql = `SELECT
										leaders_id,
										leaders_id as id,
										leaders_year as title,
										president,
										vice_president,
										secretary,
										match_secretary,
										treasurer,
										social_chairman, 
										spring_captain,
										fall_captain,
										coach,
										assistant_coach,
										chair_bod,
										status,
										deleted,
										deleted_dt,
										modified_dt,
										modified_dt as dt
									FROM inbrc_leaders
									WHERE
										deleted = 0
										AND
										STATUS = 1`

	const leaders = await doDBQuery(sql)
	return leaders
}

async function getOne(id) {
	const sql = `SELECT 	
								leaders_id,
								leaders_id as id,
								leaders_year,
								president,
								vice_president,
								secretary,
								match_secretary,
								treasurer,
								social_chairman, 
								spring_captain,
								fall_captain,
								coach,
								assistant_coach,
								chair_bod
							from 
								inbrc_leaders 
							where 
								leaders_id=${id}`

	const leaders = await doDBQuery(sql)
	return leaders[0]
}

async function addOne({
	leaders_year,
	president,
	vice_president,
	secretary,
	match_secretary,
	treasurer,
	social_chairman,
	spring_captain,
	fall_captain,
	coach,
	assistant_coach,
	chair_bod,
}) {
	const sql = `INSERT INTO 
								inbrc_leaders
              SET
								leaders_year = ?,
								president = ?,
								vice_president = ?,
								secretary = ?,
								match_secretary = ?,
								treasurer = ?,
								social_chairman = ?,
								spring_captain = ?,
								fall_captain = ?,
								coach = ?,
								assistant_coach = ?,
								chair_bod = ?,
								STATUS = 1,
								deleted = 0,
								created_dt = NOW(),
								modified_dt = NOW()`

	let inserts = []
	inserts.push(
		leaders_year,
		president,
		vice_president,
		secretary,
		match_secretary,
		treasurer,
		social_chairman,
		spring_captain,
		fall_captain,
		coach,
		assistant_coach,
		chair_bod
	)
	const leaders = await doDBQuery(sql, inserts)
	return leaders
}

async function editOne({
	leaders_year,
	president,
	vice_president,
	secretary,
	match_secretary,
	treasurer,
	social_chairman,
	spring_captain,
	fall_captain,
	coach,
	assistant_coach,
	chair_bod,
	id,
}) {
	const sql = `UPDATE inbrc_leaders SET
									leaders_year = ?,
									president = ?,
									vice_president = ?,
									secretary = ?,
									match_secretary = ?,
									treasurer = ?,
									social_chairman = ?,
									spring_captain =?,
									fall_captain =?,
									coach =?,
									assistant_coach =?,
									chair_bod =?,
									modified_dt= NOW()
								WHERE leaders_id = ?`
	let inserts = []

	inserts.push(
		leaders_year,
		president,
		vice_president,
		secretary,
		match_secretary,
		treasurer,
		social_chairman,
		spring_captain,
		fall_captain,
		coach,
		assistant_coach,
		chair_bod,
		id
	)
	const sponsor = await doDBQuery(sql, inserts)
	return sponsor
}

async function deleteOne(id) {
	const sql = `UPDATE inbrc_leaders SET deleted=1, deleted_dt=NOW() WHERE leaders_id=${id}`
	const sponsor = await doDBQuery(sql)
	return sponsor
}

async function changeStatus({ id, status }) {
	const sql =
		`UPDATE inbrc_leaders SET STATUS = "` +
		status +
		`" WHERE leaders_id  = ` +
		id
	const sponsor = await doDBQuery(sql)
	return sponsor
}
