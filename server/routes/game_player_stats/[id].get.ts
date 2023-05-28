import { statsService } from '~/server/services/statsService'

export default defineEventHandler(async (event) => {
	const id = event.context.params.id
	return statsService.getOne(id)
})
