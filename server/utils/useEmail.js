import querystring from 'querystring'
import https from 'https'

export default function useEmail() {
	const { EE_API_KEY, FROM, FROM_NAME } = useRuntimeConfig()

	function sendNewsletters(
		recipientss,
		newsletter_subject,
		newsletter_body_html,
		newsletter_id
	) {
		function composeEmail(recipient, newsletter_body_html, newsletter_subject) {
			const BEGIN_HTML = `<!DOCTYPE html>
											<html>
											<head>
											<meta charset='UTF-8'>
											<meta name='viewport' content='width=device-width, initial-scale=1.0' />
											<style>
											html {
													font-size: 12px;
													@media screen and (min-width: 576px) {
														font-size: 14px;
													}
													@media screen and (min-width: 768px) {
														font-size: 16px;
													}
													@media screen and (min-width: 1200px) {
														font-size: 18px;
													}
												}
											.nl-container {	
												background-color: #C6C6C6;
												width: 90%;
												padding: 25px;
											}
											.nl-banner, .nl-footer { 
												width: 100%;
												padding: 0.5rem;
												color: #FFF;
												background-color: #00D;
												font-family: Verdana, Geneva, sans-serif;
												font-weight: bold;
												text-align: center;
											}
											@media screen and (min-width: 576px) {
												.nl-banner, .nl-footer { 
													font-size: 1.5rem;
												}													
											}
											@media screen and (min-width: 768px) {
												.nl-banner, .nl-footer { 
													font-size: 2rem;
												}													
											}
											.ql-indent-1,
											.ql-indent-2,
											.ql-indent-3 {
												margin: 10px;
												padding: 0.5rem;
												padding-left: 2rem;
											}
											.ql-align-center {	text-align: center;	}
											.ql-align-justify {	text-align: justify;}
											.ql-align-right {	text-align: right;}
											.ql-font-serif {
												font-family: serif;
											}
											.ql-size-huge {
												font-size: xx-large;
											}
											.ql-size-large {
												font-size: xx-large;
											}
											.ql-size-small {
												font-size: small;
											}
											.img-fluid {
												display: block;
												margin-left: auto;
												margin-right: auto;
											}

										</style>
										</head>
										<body>
											<div class='nl-container'>
												<div class='nl-banner'>
													<h3>Buffalo Rugby<br>Newsletter</h3>
												</div>`

			const NEWSLETTER_END_STYLES = `<div class="nl-footer">
												&nbsp;
												</div>
											</div> <!-- container -->
										</body>
									</html>`

			// const TRACKINGPIXEL = `<img src="/newsletters/track?account_id=${recipient.account_id}&newsletter_id=${newsletter_id}" height="1" width="1" alt="" />`
			// const TRACKINGPIXEL = ''

			// make image respond to width
			newsletter_body_html = newsletter_body_html.replace(
				/img/g,
				'img width="100%"'
			)
			const email = {
				from: FROM,
				fromName: FROM_NAME,
				to: recipient.account_email,
				subject: newsletter_subject,
				body_text: '',
				body_html:
					BEGIN_HTML +
					`<img src="https://peaceful-tarsier-458ff9.netlify.app/newsletters/track?account_id=${recipient.account_id}&newsletter_id=${newsletter_id}" height="1" width="1" alt="" />` +
					newsletter_body_html +
					NEWSLETTER_END_STYLES,
			}
			return email
		}
		const sendEmail = (email) => {
			const post_data = querystring.stringify({
				api_key: EE_API_KEY,
				subject: email.subject,
				from: email.from,
				from_name: email.from_name,
				to: email.to,
				// to: "rfa@me.com",
				body_html: email.body_html,
				body_text: email.body_text,
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
		}

		//
		// self invoking function, passing the number of iterations as an argument
		// very cute - https://stackoverflow.com/questions/3583724/how-do-i-add-a-delay-in-a-javascript-loop
		// Using recursion
		// Send emails to Elasticemail slowly	//

		const rec_cnt = recipientss.length

		;(function myLoop(i) {
			setTimeout(function () {
				const email = composeEmail(
					recipientss[i - 1],
					newsletter_body_html,
					newsletter_subject
				)
				sendEmail(email)
				if (--i) myLoop(i) //  decrement i and call myLoop again if i > 0
			}, 500) // delay 500ms
		})(rec_cnt)
	}

	function sendEmail(to, subject, message) {
		const post_data = querystring.stringify({
			api_key: EE_API_KEY,
			subject: subject,
			from: FROM,
			fromName: FROM_NAME,
			to: to,
			body_html: message,
			body_text: '',
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
		sendNewsletters,
	}
}
