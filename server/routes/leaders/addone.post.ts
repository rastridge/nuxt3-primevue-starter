import { leadersService } from '~/server/services/leadersService'

export default defineEventHandler(async (event) => {
	const body = await readBody(event)
	return leadersService.addOne(body)
})
