import { paymentsService } from '~/server/services/paymentsService'

export default defineEventHandler(async (event) => {
	const id = event.context.params.id
	return paymentsService.getOne(id)
})
