import { eventsService } from '~/server/services/eventsService'

export default defineEventHandler(async (event) => {
	const id = event.context.params.id
	return eventsService.getOne(id)
})
