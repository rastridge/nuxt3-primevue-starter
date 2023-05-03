<template>
	<div>
		<Head>
			<Title>Accounts List</Title>
		</Head>
		<common-header title="Account List" />
		<div v-if="pending" class="text-center text-2xl">Loading ...</div>
		<div v-else>
			<render-list
				:data="accounts"
				:app="app"
				:statusable="statusable"
				:editable="editable"
				:deleteable="deleteable"
				:addable="addable"
				:viewable="viewable"
				@changeStatus="changeStatus"
				@deleteItem="deleteItem"
			/>
		</div>
	</div>
</template>

<script setup>
	const { getAll, deleteOne, changeStatusOne } = useFetchAll()

	//
	// Initialize values for Renderlist
	//
	const { getAccess } = useRenderListAccess()
	const app = 'accounts/men'
	const { editable, addable, deleteable, statusable, viewable } = getAccess(app)

	//
	// Get all accounts
	//
	const { data: accounts, pending } = await getAll('accounts')
	//
	// Renderlist actions
	//
	const deleteItem = async (id) => {
		await deleteOne('accounts', id)
	}

	const changeStatus = async ({ id, status }) => {
		await changeStatusOne('accounts', { id, status })
	}
</script>
