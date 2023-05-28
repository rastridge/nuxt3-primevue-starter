import { statsService } from '~/server/services/statsService'

export default defineEventHandler(async (event) => {
	const body = await readBody(event)
	return statsService.editOne(body)
})
