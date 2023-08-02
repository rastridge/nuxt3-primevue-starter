import mysql from 'mysql2/promise'
const CONFIG = useRuntimeConfig()

const { sendEmail } = useEmail()
const { doDBQuery } = useQuery()
const { getConnection } = useDBConnection()

export const accountsService = {
	getAll,
	getOne,
	addOne,
	editOne,
	getOfficers,
	getSuggestions,
	changeStatus,
	deleteOne,
	getShow,
	getMemberTypes,
	getMemberAdminTypes,
}

async function getAll() {
	const sql = `SELECT 
									account_id as id,
									account_id,
									member_type_id,
									member_type2_id,
									member_firstname,
									member_lastname,
									CONCAT(member_firstname," ", member_lastname) as title,
									member_year,
									account_email,
									account_email_opening,
									account_textmsg_opening,
									account_addr_street,
									account_addr_street_ext,
									account_addr_city,
									account_addr_state,
									account_addr_country,
									account_addr_postal,
									account_addr_phone,
									newsletter_recipient,
									mail_recipient,
									sms_recipient,
									modified_dt,
									modified_dt as dt,
									status
							FROM inbrc_accounts
							WHERE deleted = 0
							ORDER BY member_lastname ASC`

	const accounts = await doDBQuery(sql)
	return accounts
}

async function getShow() {
	const sql = `SELECT
									a.account_id,
									a.member_firstname,
									a.member_lastname,
									CONCAT(
											a.member_firstname,
											' ',
											a.member_lastname
									) AS NAME,
									a.member_position,
									a.member_year,
									a.member_prev_club,
									a.member_wall_of_fame_year,
									a.member_type_id,
									mt.member_type,
									(
									SELECT
											COUNT(p.player_id)
									FROM
											inbrc_stats_player p,
											inbrc_accounts ac,
											inbrc_stats_games g
									WHERE
											ac.account_id = a.account_id AND p.player_id = a.account_id AND p.game_id = g.game_id AND g.game_type_id <> 8 AND g.game_type_id <> 7
							) AS fifteensct,
							(
									SELECT
											COUNT(p.player_id)
									FROM
											inbrc_stats_player p,
											inbrc_accounts ac,
											inbrc_stats_games g
									WHERE
											ac.account_id = a.account_id AND p.player_id = a.account_id AND p.game_id = g.game_id AND g.game_type_id <> 8 AND g.game_type_id = 7 AND g.game_type_id <> 8
							) AS sevensct
							FROM
									inbrc_accounts a,
									inbrc_member_types mt
							WHERE
									a.member_type_id NOT IN('9', '13') AND a.STATUS = 1 AND a.deleted = 0 AND a.member_type_id = mt.member_type_id  
							ORDER BY a.member_lastname ASC`

	const accounts = await doDBQuery(sql)
	return accounts
}

async function getOne(id) {
	const sql = `SELECT *
							FROM inbrc_accounts
							WHERE account_id = ?`
	const accounts = await doDBQuery(sql, [id])
	const account = accounts[0]
	return account
}

/***************************************** */
/*              addOne                     */
/***************************************** */
async function addOne(info) {
	try {
		const CONN = await getConnection()
		await CONN.query('START TRANSACTION')

		// check for existing email
		let sql = `select *
							from inbrc_accounts
							where deleted = 0`
		const [rows, fields] = await CONN.execute(sql)
		const accounts = rows
		const lc_account_email = info.account_email.toLowerCase()
		let account = accounts.find((u) => u.account_email === lc_account_email)

		let msg = null
		// If no email conflict
		//
		if (!account) {
			//
			// add record
			//
			let sql = `INSERT INTO inbrc_accounts
									SET
									account_email = ?,
									member_firstname = ?,
									member_lastname = ?,

									member_year = ?,
									account_addr_street = ?,
									account_addr_street_ext = ?,
									account_addr_city = ?,
									account_addr_state = ?,
									account_addr_country = ?,
									account_addr_postal = ?,
									account_addr_phone = ?,

									member_show_phone = ?,
									member_show_addr = ?,
									newsletter_recipient = ?,
									mail_recipient = ?,
									sms_recipient = ?,

									member_type_id = ?,
									member_type2_id = ?,
									member_admin_type_id = ?,
									member_admin_type2_id = ?,
									status = 1,

									created_dt = NOW(),
									modified_dt= NOW();`
			const {
				member_firstname,
				member_lastname,

				member_year,
				account_addr_street,
				account_addr_street_ext,
				account_addr_city,
				account_addr_state,
				account_addr_country,
				account_addr_postal,
				account_addr_phone,

				member_show_phone,
				member_show_addr,
				newsletter_recipient,
				mail_recipient,
				sms_recipient,

				member_type_id,
				member_type2_id,
				member_admin_type_id,
				member_admin_type2_id,
			} = info
			let inserts = []
			inserts.push(
				lc_account_email,
				member_firstname,
				member_lastname,

				member_year,
				account_addr_street,
				account_addr_street_ext,
				account_addr_city,
				account_addr_state,
				account_addr_country,
				account_addr_postal,
				account_addr_phone,

				member_show_phone,
				member_show_addr,
				newsletter_recipient,
				mail_recipient,
				sms_recipient,

				member_type_id,
				member_type2_id,
				member_admin_type_id,
				member_admin_type2_id
			)
			sql = mysql.format(sql, inserts)
			await CONN.execute(sql)

			//
			// Compose and send individual email
			//
			const email_msg =
				'An account for account ' +
				member_firstname +
				' ' +
				member_lastname +
				'  has been created ' +
				' email = ' +
				lc_account_email

			await sendEmail(
				CONFIG.TO,
				'Buffalo Rugby Club Member Account Addition',
				email_msg
			)
		} else {
			msg = 'An account with email ' + lc_account_email + ' already exists'

			sendEmail(
				'ron.astridge@me.com',
				'Buffalo Rugby Club Admin Account Modification',
				msg
			)
		}

		await CONN.query('COMMIT')
		await CONN.end()
		return { message: msg }
	} catch (e) {
		await CONN.query('ROLLBACK')
		await CONN.end()
		return e
	}
}

/***************************************** */
/*               editOne                   */
/***************************************** */
async function editOne(info) {
	const CONN = await getConnection()
	try {
		await CONN.query('START TRANSACTION')

		// check for existing email in other mewmbers
		let sql = `select *
							from inbrc_accounts
							where deleted = 0  AND account_id <> ${info.account_id}`
		const [rows, fields] = await CONN.execute(sql)
		const accounts = rows
		const lc_account_email = info.account_email.toLowerCase()
		let account = accounts.find((u) => u.account_email === lc_account_email)

		let msg = null
		// If no email conflict
		//
		if (!account) {
			let sql = `UPDATE inbrc_accounts
							SET
									account_email = ?,
									member_firstname = ?,
									member_lastname = ?,

									member_year = ?,
									account_addr_street = ?,
									account_addr_street_ext = ?,
									account_addr_city = ?,
									account_addr_state = ?,
									account_addr_country = ?,
									account_addr_postal = ?,
									account_addr_phone = ?,

									member_show_phone = ?,
									member_show_addr = ?,
									newsletter_recipient = ?,
									mail_recipient = ?,
									sms_recipient = ?,

									member_type_id = ?,
									member_type2_id = ?,
									member_admin_type_id = ?,
									member_admin_type2_id = ?,
									modified_dt= NOW()
								WHERE account_id = ?;`
			const {
				member_firstname,
				member_lastname,

				member_year,
				account_addr_street,
				account_addr_street_ext,
				account_addr_city,
				account_addr_state,
				account_addr_country,
				account_addr_postal,
				account_addr_phone,

				member_show_phone,
				member_show_addr,
				newsletter_recipient,
				mail_recipient,
				sms_recipient,

				member_type_id,
				member_type2_id,
				member_admin_type_id,
				member_admin_type2_id,

				account_id,
			} = info

			let inserts = []
			inserts.push(
				lc_account_email,
				member_firstname,
				member_lastname,

				member_year,
				account_addr_street,
				account_addr_street_ext,
				account_addr_city,
				account_addr_state,
				account_addr_country,
				account_addr_postal,
				account_addr_phone,

				member_show_phone,
				member_show_addr,
				newsletter_recipient,
				mail_recipient,
				sms_recipient,

				member_type_id,
				member_type2_id,
				member_admin_type_id,
				member_admin_type2_id,

				account_id
			)

			sql = mysql.format(sql, inserts)
			await CONN.execute(sql)

			const [rows, fields] = await CONN.execute(sql)
			account = rows

			//
			// Compose and send individual email
			//

			/* sendEmail(
				CONFIG.TO,
				'Buffalo Rugby Club Member Account Update',
				'The account for ' +
					member_firstname +
					' ' +
					member_lastname +
					'  has been updated ' +
					' email = ' +
					lc_account_email
			) */
		} else {
			msg = ' An account with that email address already exists'
			sendEmail(CONFIG.TO, 'BRC Member Account Action', msg)
		}

		await CONN.query('COMMIT')
		await CONN.end()
		return { message: msg }
	} catch (e) {
		await CONN.query('ROLLBACK')
		await CONN.end()
	}
}

async function getOfficers() {
	const sql = `SELECT
									a.account_id,
									account_id as id,
									account_email,
									CONCAT(member_firstname," ", member_lastname) as title,
									account_addr_phone as phone,
									g.member_admin_type as office,
									h.member_admin_type as office2
								FROM
									inbrc_accounts a,
									inbrc_member_admin_types h,
									inbrc_member_admin_types g
								WHERE
									a.member_admin_type_id = g.member_admin_type_id
									AND a.member_admin_type2_id = h.member_admin_type_id
									AND ((a.member_admin_type_id > 0) OR (a.member_admin_type2_id > 0 ))
									AND a.deleted = 0
									AND a.STATUS = 1
								ORDER BY
									a.member_admin_type_id`

	const officers = await doDBQuery(sql)
	return officers
}

async function getSuggestions() {
	const sql = `SELECT
									account_id,
									member_firstname,
									member_lastname,
									CONCAT(member_firstname," ", member_lastname) as title
							FROM inbrc_accounts
							WHERE deleted = 0 AND status = 1
							ORDER BY member_lastname ASC`

	const accounts = await doDBQuery(sql)
	return accounts
}

async function deleteOne(id) {
	const sql = `UPDATE inbrc_accounts
							SET
									deleted = '1',
									deleted_dt= NOW()
								WHERE account_id = ?;`
	let inserts = []
	inserts.push(id)
	const accounts = await doDBQuery(sql, inserts)
	return accounts
}

async function changeStatus({ id, status }) {
	const sql = `UPDATE inbrc_accounts
							SET
									status = ?,
									deleted_dt= NOW()
								WHERE account_id = ?;`
	let inserts = []
	inserts.push(status, id)
	const accounts = await doDBQuery(sql, inserts)
	return accounts
}

async function getMemberTypes() {
	const sql = `SELECT * FROM inbrc_member_types WHERE 1`
	const membertypes = await doDBQuery(sql)
	return membertypes
}
async function getMemberAdminTypes() {
	const sql = `SELECT * FROM inbrc_member_admin_types WHERE 1`
	const memberadmintypes = await doDBQuery(sql)
	return memberadmintypes
}
