import { videosService } from '~/server/services/videosService'

export default defineEventHandler((event) => {
	return videosService.getAll()
})
