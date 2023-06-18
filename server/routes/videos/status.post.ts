import { videosService } from '~/server/services/videosService'

export default defineEventHandler(async (event) => {
	const body = await readBody(event)
	return videosService.changeStatus(body)
})
