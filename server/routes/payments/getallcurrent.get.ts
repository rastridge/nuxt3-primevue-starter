import { paymentsService } from '~/server/services/paymentsService'

export default defineEventHandler((event) => {
	return paymentsService.getAllCurrent()
})
