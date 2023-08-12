<template>
	<div>
		<Head>
			<Title>Opponents List</Title>
		</Head>
		<admin-header :title="app" />
		<div v-if="pending" class="text-center text-2xl">Loading ...</div>
		<div v-else>
			<render-list
				:data="opponents_data"
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
	const { getAccess } = useRenderListAccess()

	//
	// Initialize values for Renderlist
	//
	const app = 'opponents'
	const { editable, addable, deleteable, statusable, viewable } = getAccess(app)
	const { data: opponents_data, pending } = await getAll(app)

	//
	// Renderlist actions
	//
	const deleteItem = async (id) => {
		await deleteOne('content', id)
	}

	const changeStatus = async ({ id, status }) => {
		await changeStatusOne('content', { id, status })
	}
</script>
