import { sponsorsService } from '~/server/services/sponsorsService'

export default defineEventHandler(async (event) => {
	const body = await readBody(event)
	// console.log('IN router body = ', body)
	return sponsorsService.editOne(body)
})
