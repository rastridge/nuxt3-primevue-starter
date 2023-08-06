import { statsService } from '~/server/services/statsService'

export default defineEventHandler((event) => {
	const id = event.context.params.id
	return statsService.getHistoryStreaks(id)
})
