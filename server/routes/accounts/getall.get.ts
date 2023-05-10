import { accountsService } from '~/server/services/accountsService'

export default defineEventHandler((event) => {
	return accountsService.getAll()
})

/* import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
	const feed = await prisma.inbrc_accounts.findMany({
		where: { deleted: 0, STATUS: 1 },
		select: {
			id: true,
			member_firstname: true,
			member_lastname: true,
			account_email: true,
			modified_dt: true,
		},
	})
	return feed
}) */
