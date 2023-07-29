import { eventsService } from '~/server/services/eventsService'

export default defineEventHandler(async (event) => {
	const body = await readBody(event)
	return eventsService.changeStatus(body)
})
