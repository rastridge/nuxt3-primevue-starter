import twilio from 'twilio'
const { TWILIO_NUMBER, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } =
	useRuntimeConfig()
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

export default function useSMS() {
	function sendOneSMS(recipient, sms_body_text) {
		client.messages
			.create({
				from: TWILIO_NUMBER,
				to: recipient.account_addr_phone,
				body: sms_body_text,
				// statusCallback: `/sms/MessageStatus`,
			})
			.then(function (res) {})
			.catch(function (err) {
				console.log(err)
			})
	}
	return {
		sendOneSMS,
	}
}
