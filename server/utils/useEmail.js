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
												.nl-container {	background-color: #FFF;
																				width: 100%;
																				padding-top: 2rem;
																				padding-bottom: 2rem;
																			}
												.nl-banner { width: 100%;
																			padding-top: 0.5rem;
																			padding-bottom: 0.5rem;
																			color: #FFF;
																			background-color: #00D;
																			font-family: Verdana, Geneva, sans-serif;
																			font-weight: bold;
																			font-size: 1rem;
																			text-align: center;
																		}
												.nl-content {
																			width: 80%;
																			padding: 1rem;
																			font-size: 1.5rem;
																		}
												.nl-footer { font-size: 1rem;
																			padding: 1rem;
																		}
												@media screen and (min-width: 576px) {
													.nl-banner {
														padding-top: 1rem;
														padding-bottom: 1rem;
														font-size: 2rem;
												}
												.ql-align-center {	text-align: center;	}
												.ql-align-justify {	text-align: justify;}
												.ql-align-right {	text-align: right;}
											</style>
											</head>
											<body>
												<div class='nl-container'>
													<div class='nl-banner'>
														<h3>Buffalo Rugby</h1>
														<h3>Newsletter</h1>
													</div>`

			const NEWSLETTER_END_STYLES = `</div> <!-- container -->
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

			// console.log(' IN sendMail end ')
		}

		//
		// self invoking function, passing the number of iterations as an argument
		// very cute - https://stackoverflow.com/questions/3583724/how-do-i-add-a-delay-in-a-javascript-loop
		// Using recursion
		// Send emails to Elasticemail slowly	//

		const rec_cnt = recipientss.length

		;(function myLoop(i) {
			setTimeout(function () {
				//
				console.log(' IN myLoop i, rec_cnt = ', i, rec_cnt)
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
