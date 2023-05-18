import { accountsService } from '~/server/services/accountsService'

export default defineEventHandler(async (event) => {
	const runtimeConfig = useRuntimeConfig()
	// const authorization = event.node.req.headers.authorization
	// const secretKey = runtimeConfig.apiSecret
	const body = await readBody(event)
	return accountsService.addOne(body)
})
