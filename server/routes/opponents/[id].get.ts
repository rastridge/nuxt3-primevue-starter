import { opponentsService } from '~/server/services/opponentsService'

export default defineEventHandler(async (event) => {
	const id = event.context.params.id
	return opponentsService.getOne(id)
})
