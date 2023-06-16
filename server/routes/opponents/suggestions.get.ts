import { opponentsService } from '~/server/services/opponentsService'

export default defineEventHandler((event) => {
	return opponentsService.getSuggestions()
})
