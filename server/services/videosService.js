const { doDBQuery } = useQuery()
export const videosService = {
	getAll,
	getOne,
	editOne,
	addOne,
	deleteOne,
	changeStatus,
}

async function getAll() {
	const sql = `SELECT
                    video_id,
                    video_id as id,
                    video_title,
                    video_title as title,
                    video_synop,
                    video_url,
                    video_release_dt,
                    video_event_dt as dt,
                    video_expire_dt,
                    status,
                    deleted,
                    created_dt,
                    modified_dt,
                    modified_dt
                FROM
                    inbrc_video
                WHERE
                    deleted = 0
                    AND
                    status = 1
                ORDER BY
                    dt DESC`

	const videos = await doDBQuery(sql)
	return videos
}

async function getOne(id) {
	const sql = `SELECT
									video_id,
									video_id as id,
									video_title,
									video_synop,
									video_url,
									video_release_dt,
									video_event_dt,
									video_expire_dt,
									status,
									deleted,
									created_dt,
									modified_dt
                 FROM
                    inbrc_video
                WHERE
									deleted = 0
									AND
									video_id = ${id}`

	const video = await doDBQuery(sql)
	return video[0]
}

async function editOne({
	video_title,
	video_synop,
	video_url,
	video_release_dt,
	video_event_dt,
	video_expire_dt,
	id,
}) {
	const sql = `UPDATE inbrc_video SET
                video_title = ?,
                video_synop = ?,
                video_url = ?,
                video_release_dt = ?,
                video_event_dt = ?,
                video_expire_dt = ?,
                modified_dt = NOW()
            WHERE video_id = ?`
	var inserts = []
	inserts.push(
		video_title,
		video_synop,
		video_url,
		video_release_dt,
		video_event_dt,
		video_expire_dt,
		id
	)
	const video = await doDBQuery(sql, inserts)
	return video
}

async function addOne({
	video_title,
	video_synop,
	video_url,
	video_release_dt,
	video_event_dt,
	video_expire_dt,
}) {
	const sql = `INSERT INTO inbrc_video SET
                    video_title = ?,
                    video_synop = ?,
                    video_url = ?,
                    video_release_dt = ?,
                    video_event_dt = ?,
                    video_expire_dt = ?,
                    status = 1,
                    deleted = 0,
                    created_dt = NOW(),
                    modified_dt = NOW()`

	const inserts = []
	inserts.push(
		video_title,
		video_synop,
		video_url,
		video_release_dt,
		video_event_dt,
		video_expire_dt
	)
	const video = await doDBQuery(sql, inserts)
	return video
}

async function deleteOne(id) {
	const sql =
		`UPDATE inbrc_video SET deleted = 1, deleted_dt= NOW() WHERE video_id = ` +
		id
	const video = await doDBQuery(sql)
	return video
}

async function changeStatus({ id, status }) {
	const sql =
		`UPDATE inbrc_video SET status = "` + status + `" WHERE video_id = ` + id
	const video = await doDBQuery(sql)
	return video
}
