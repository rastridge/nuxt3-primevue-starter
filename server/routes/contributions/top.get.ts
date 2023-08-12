import { contributionsService } from '~/server/services/contributionsService'

export default defineEventHandler(async (event) => {
	return contributionsService.getTopContributors()
})
