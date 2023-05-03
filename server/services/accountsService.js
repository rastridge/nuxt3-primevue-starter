import mysql from 'mysql2/promise'
const CONFIG = useRuntimeConfig()

const { doDBQuery } = useQuery()
const { getConnection } = useDBConnection()
const { sendEmail } = useEmail()

export const accountsService = {
	getAll,
	getOne,
	addOne,
	editOne,
	changeStatus,
	deleteOne,
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
		console.log('START TRANSACTION')

		// check for existing email
		let sql = `select *
							from inbrc_accounts
							where deleted = 0`
		const [rows, fields] = await CONN.execute(sql)
		const accounts = rows
		const lc_account_email = info.account_email.toLowerCase()
		let account = accounts.find((u) => u.account_email === lc_account_email)

		let error_msg = null
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
			/*
			//unneeded?
			// const [rows, fields] = await CONN.execute(sql)
			// account = rows
			// const id = account.insertId

 */
			//
			// for email when it I get it working
			//
			const email_msg =
				'An account for account ' +
				member_firstname +
				' ' +
				member_lastname +
				'  has been created ' +
				' email = ' +
				lc_account_email

			const email_data = {
				from: CONFIG.FROM,
				fromName: CONFIG.FROM_NAME,
				to: CONFIG.TO,
				subject: 'Buffalo Ruggby Club Member Account Addition',
				body_text: '',
				body_html: '<h3>' + email_msg + '</h3>',
			}
			// the problem - causes CONN undefined
			await sendEmail(email_data)
		} else {
			error_msg =
				'An account with email ' + lc_account_email + ' already exists'
			console.log('EXISTS ', error_msg)
		}

		await CONN.query('COMMIT')
		await CONN.end()
		console.log('END TRANSACTION COMMIT')
		return { message: error_msg }
		// return { message: 'ok' }
	} catch (e) {
		await CONN.query('ROLLBACK')
		await CONN.end()
		console.log('END TRANSACTION ROLLBACK')
		return e
	}
}

/***************************************** */
/*               editOne                   */
/***************************************** */
async function editOne(info) {
	try {
		const CONN = await getConnection()
		await CONN.query('START TRANSACTION')
		console.log('START TRANSACTION')

		// check for existing email in others
		let sql = `select *
							from inbrc_accounts
							where deleted = 0  AND account_id <> ${info.account_id}`
		const [rows, fields] = await CONN.execute(sql)
		const accounts = rows
		const lc_account_email = info.account_email.toLowerCase()
		let account = accounts.find((u) => u.account_email === lc_account_email)

		let error_msg = null
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

			//unneeded?
			// const [rows, fields] = await CONN.execute(sql)
			// account = rows
			// const id = account.insertId

			/*						 */
			//
			// for email when it I get it working
			//
			const email_msg =
				'An account for account ' +
				member_firstname +
				' ' +
				member_lastname +
				'  has been updated ' +
				' email = ' +
				lc_account_email
			const email_data = {
				from: CONFIG.FROM,
				fromName: CONFIG.FROM_NAME,
				to: CONFIG.TO,
				subject: 'Buffalo Ruggby Club Member Account Addition',
				body_text: '',
				body_html: '<h3>' + email_msg + '</h3>',
			}
			await sendEmail(email_data)
		} else {
			error_msg =
				'An account with email ' + lc_account_email + ' already exists'
			console.log('EXISTS ', error_msg)
		}

		await CONN.query('COMMIT')
		await CONN.end()
		console.log('END TRANSACTION COMMIT')
		return { message: error_msg }
	} catch (e) {
		await CONN.query('ROLLBACK')
		await CONN.end()
		console.log('END TRANSACTION ROLLBACK')
		return e
	}
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
