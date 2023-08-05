import { statsService } from '~/server/services/statsService'

export default defineEventHandler((event) => {
	return statsService.getRosterStats()
})
