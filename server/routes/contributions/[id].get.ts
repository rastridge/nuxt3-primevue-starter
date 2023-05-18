import { contributionsService } from '~/server/services/contributionsService'

export default defineEventHandler(async (event) => {
	const id = event.context.params.id

	return contributionsService.getOne(id)
})
