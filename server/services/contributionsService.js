// const { DB_PREFIX } = require("config");
// const doDBQuery = require("_helpers/do-query");
// const { FROM, FROM_NAME } = require("email_constants.json");
// const sendEmail = require("_helpers/sendEmail");
// const moment = require("moment");
// const activityLog = require("_helpers/activity-log");

const CONFIG = useRuntimeConfig()
const { doDBQuery } = useQuery()

export const contributionsService = {
	getAll,
	// getAllCurrent,
	getTopContributors,
	getPrevious,
	getTotal,
	getYear,
	getOne,
	addOne,
	editOne,
	deleteOne,
	changeStatus,
}
async function getAll() {
	const sql = `SELECT
					c.contribution_id,
					c.contribution_id as id,
					CONCAT(a.member_firstname,' ',a.member_lastname  ) as title,
					c.contribution_date as dt,
					c.status
				FROM
					inbrc_accounts a,
					inbrc_contributions c
				WHERE
					c.deleted = 0
					AND a.account_id = c.account_id
				ORDER BY dt DESC`

	const contributions = await doDBQuery(sql)

	return contributions
}

async function getTopContributors() {
	const sql = `SELECT
					CONCAT(a.member_firstname,' ', a.member_lastname ) as Name,
					c.contribution_showName as showName,
					sum(contribution_amount) as Total
				FROM
					inbrc_contributions c,
					inbrc_accounts a
				WHERE
					(c.account_id = a.account_id)
					AND c.deleted = 0
					AND c.Status = 1
				GROUP BY
					Name
				ORDER BY
					Total DESC
				LIMIT 0, 20`
	const contributions = await doDBQuery(sql)
	return contributions
}

async function getPrevious(id) {
	const sql = `SELECT
					c.contribution_id,
					CONCAT(a.member_lastname,', ', a.member_firstname ) as name,
					c.contribution_date as dt,
					c.contribution_amount
				FROM
					inbrc_accounts a,
					inbrc_contributions c
				WHERE
				c.deleted = 0
				AND c.Status = 1
				AND a.account_id = c.account_id
				AND a.account_id = ${id}
				ORDER BY dt DESC`
	const contributions = await doDBQuery(sql)
	return contributions
}

async function getTotal(year) {
	const sql = `SELECT
				sum(contribution_amount) as Total
			FROM
				inbrc_contributions
			WHERE
				deleted = 0
				AND Status = 1
				AND YEAR(contribution_date) = ${year}`

	const total = await doDBQuery(sql)
	return total[0]
}

async function getYear(year) {
	const sql = `SELECT
					c.contribution_id,
					c.contribution_id as id,
					contribution_amount,
					contribution_showName,
					contribution_showAmount,
					contribution_comment,
					contribution_date,
					contribution_date as dt,
					a.member_firstname,
					a.member_lastname,
					CONCAT(a.member_firstname,' ', a.member_lastname ) as title,
					a.member_year as year_joined,
					c.Status,
					c.Status as status,
					c.deleted,
					c.deleted_dt,
					c.created_dt,
					c.modified_dt
				FROM
					inbrc_accounts a,
					inbrc_contributions c
				WHERE
					c.deleted = 0
					AND a.account_id = c.account_id
					AND YEAR(contribution_date) = ${year}
				ORDER BY
          contribution_date DESC`

	const contributions = await doDBQuery(sql)
	return contributions
}

async function getOne(id) {
	const sql = `SELECT
	                contribution_id,
                  contribution_id as id,
									CONCAT(a.member_firstname,' ', a.member_lastname  ) as contribution_name,
									c.contribution_date,
									c.contribution_amount,
									c.contribution_showName,
									c.contribution_showAmount,
									c.contribution_comment
                FROM
				    			inbrc_accounts a,
                  inbrc_contributions c
                WHERE
									c.deleted = 0
									AND a.account_id = c.account_id
									AND c.contribution_id = ${id}`

	const contributions = await doDBQuery(sql)
	return contributions[0]
}

async function editOne({
	contribution_date,
	contribution_amount,
	contribution_showName,
	contribution_showAmount,
	contribution_comment,
	id,
}) {
	const sql = `UPDATE inbrc_contributions SET
								contribution_date = ?,
								contribution_amount = ?,
								contribution_showName = ?,
								contribution_showAmount = ?,
								contribution_comment = ?,
								modified_dt= NOW()
							WHERE contribution_id = ?`

	let inserts = []
	inserts.push(
		contribution_date,
		contribution_amount,
		contribution_showName,
		contribution_showAmount,
		contribution_comment,
		id
	)
	const contributions = await doDBQuery(sql, inserts)
	return contributions
}

async function addOne({
	account_id,
	contribution_date,
	contribution_amount,
	contribution_showName,
	contribution_showAmount,
	contribution_comment,
}) {
	let sql = `INSERT INTO inbrc_contributions SET
		account_id = ?,
		contribution_date = ?,
		contribution_amount = ?,
		contribution_showName = ?,
		contribution_showAmount = ?,
		contribution_comment = ?,
		created_dt = NOW(),
		modified_dt= NOW()`

	let inserts = []
	inserts.push(
		account_id,
		contribution_date,
		contribution_amount,
		contribution_showName,
		contribution_showAmount,
		contribution_comment
	)
	const contributions = await doDBQuery(sql, inserts)

	sql =
		`SELECT member_firstname, member_lastname, account_email FROM inbrc_accounts WHERE account_id = ` +
		account_id
	const rows = await doDBQuery(sql)

	// an error get thrown here

	/* 	const email = {
		from: CONFIG.FROM,
		fromName: CONFIG.FROM_NAME,
		to: rows[0].account_email,
		subject: 'Thank you for Your Contribution to the Buffalo Rugby Club',
		body_text: '',
		body_html:
			rows[0].member_firstname +
			' ' +
			rows[0].member_lastname +
			', Thank you for your donation to the Buffalo Rugby Club. Buffalo Rugby is a NYS 501 C3 organization and as such your donation is tax deductible. This email serves as a record that you donated $' +
			contribution_amount +
			' to your Buffalo Rugby Club',
	}

	sendEmail(email)
 */
	return contributions
}

async function deleteOne(id) {
	const sql = `UPDATE inbrc_contributions SET deleted = 1, deleted_dt= NOW() WHERE contribution_id = ${id}`
	contributions = await doDBQuery(sql)

	return contributions
}

async function changeStatus({ id, status }) {
	const sql =
		`UPDATE inbrc_contributions SET status = "` +
		status +
		`" WHERE contribution_id = ${id}`
	const contributions = await doDBQuery(sql)

	return contributions
}
