import { sponsorsService } from '~/server/services/sponsorsService'

export default defineEventHandler(async (event) => {
	const body = await readBody(event)
	return sponsorsService.changeStatus(body)
})
