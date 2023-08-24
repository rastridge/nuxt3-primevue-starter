import { leadersService } from '~/server/services/leadersService'

export default defineEventHandler(async (event) => {
	const body = await readBody(event)
	// console.log('IN router body = ', body)
	return leadersService.editOne(body)
})
