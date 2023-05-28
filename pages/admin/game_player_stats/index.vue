<template>
	<div>
		<admin-header :title="app" />
		<render-list
			:data="stats"
			:app="app"
			:statusable="statusable"
			:editable="editable"
			:deleteable="deleteable"
			:addable="addable"
			:viewable="viewable"
			@changeStatus="changeStatus"
			@deleteItem="deleteItem"
			@addItem="addItem"
		/>
	</div>
</template>

<script setup>
	const app = 'game_player_stats'
	const { getAll, deleteOne, changeStatusOne } = useFetchAll()
	const { getAccess } = useRenderListAccess()
	const { editable, addable, deleteable, statusable, viewable } = getAccess(app)
	//
	// Get all games
	//
	const { data: stats, pending } = await getAll(app)

	//
	// Renderlist actions
	//
	const deleteItem = async (id) => {
		await deleteOne('stats', id)
	}

	const changeStatus = async ({ id, status }) => {
		await changeStatusOne('stats', { id, status })
	}
</script>
