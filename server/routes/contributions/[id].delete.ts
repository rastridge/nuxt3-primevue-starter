import { contributionsService } from '~/server/services/contributionsService'

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig()
	const headers = event.node.req.headers

	const id = event.context.params.id
	return contributionsService.deleteOne(id)
})
