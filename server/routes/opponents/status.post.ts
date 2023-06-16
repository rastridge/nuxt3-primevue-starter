import { opponentsService } from '~/server/services/opponentsService'

export default defineEventHandler(async (event) => {
	const body = await readBody(event)
	return opponentsService.changeStatus(body)
})
