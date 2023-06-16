import { statsService } from '~/server/services/statsService'

export default defineEventHandler((event) => {
	const date = event.context.params.dt

	return statsService.getPrevious(date)
})
