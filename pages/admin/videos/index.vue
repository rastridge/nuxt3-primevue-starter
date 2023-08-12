<template>
	<div>
		<Head>
			<Title>Videos List</Title>
		</Head>
		<admin-header :title="app" />

		<div v-if="pending" class="text-center text-2xl">Loading ...</div>
		<div v-else>
			<render-list
				:data="video_data"
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
	const app = 'videos'
	const { editable, addable, deleteable, statusable, viewable } = getAccess(app)
	const { data: video_data, pending } = await getAll(app)

	//
	// Renderlist actions
	//
	const deleteItem = async (id) => {
		await deleteOne('app', id)
	}

	const changeStatus = async ({ id, status }) => {
		await changeStatusOne('app', { id, status })
	}
</script>
