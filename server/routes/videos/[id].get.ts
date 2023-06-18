import { videosService } from '~/server/services/videosService'

export default defineEventHandler(async (event) => {
	const id = event.context.params.id
	return videosService.getOne(id)
})
