import { sponsorsService } from '~/server/services/sponsorsService'

export default defineEventHandler((event) => {
	return sponsorsService.getSponsorIds()
})
