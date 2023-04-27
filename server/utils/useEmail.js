import querystring from 'querystring'
import https from 'https'

export default function useEmail() {
	const { EE_API_KEY } = useRuntimeConfig()
	function sendEmail(email_data) {
		console.log('IN sendEmail email_data = ', email_data)
		const post_data = querystring.stringify({
			api_key: EE_API_KEY,
			subject: email_data.subject,
			from: email_data.from,
			from_name: email_data.from_name,
			to: email_data.to,
			body_html: email_data.body_html,
			body_text: email_data.body_text,
			isTransactional: true,
		})

		const post_options = {
			hostname: 'api.elasticemail.com',
			path: '/v2/email/send',
			port: '443',
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length': post_data.length,
			},
		}

		let result = ''
		const post_req = https.request(post_options, function (res) {
			res.setEncoding('utf8')
			res.on('data', function (chunk) {
				result = chunk
				const { statusCode, statusMessage, headers } = res
			})
			res.on('error', function (e) {
				result = 'Error: ' + e.message
			})
		})

		post_req.write(post_data)
		post_req.end()

		return result
	}
	return {
		sendEmail,
	}
}
