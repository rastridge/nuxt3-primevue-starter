import { sponsorsService } from '~/server/services/sponsorsService'

export default defineEventHandler(async (event) => {
	const id = event.context.params.id
	return sponsorsService.getOne(id)
})
