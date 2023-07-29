import { eventsService } from '~/server/services/eventsService'

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig()
	const headers = event.node.req.headers

	const id = event.context.params.id
	return eventsService.deleteOne(id)
})
