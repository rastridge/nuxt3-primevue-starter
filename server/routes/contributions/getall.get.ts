import { contributionsService } from '~/server/services/contributionsService'

export default defineEventHandler((event) => {
	return contributionsService.getAll()
})
