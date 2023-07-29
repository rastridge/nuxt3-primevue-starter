import { eventsService } from '~/server/services/eventsService'

export default defineEventHandler((event) => {
	return eventsService.getAllCurrent()
})
