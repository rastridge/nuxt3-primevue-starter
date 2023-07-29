import { eventsService } from '~/server/services/eventsService'

export default defineEventHandler(async (event) => {
	const body = await readBody(event)
	console.log('In addOnepost body = ', body)

	return eventsService.addOne(body)
})
