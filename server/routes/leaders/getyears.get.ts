import { leadersService } from '~/server/services/leadersService'

export default defineEventHandler((event) => {
	return leadersService.getYears()
})
