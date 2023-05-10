import { statsService } from '~/server/services/statsService'

export default defineEventHandler((event) => {
	const query = getQuery(event)
	const gametype = query.gametype
	const account_id = query.account_id
	return statsService.getGameCount(gametype, account_id)
})
