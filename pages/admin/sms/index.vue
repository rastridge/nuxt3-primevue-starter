<template>
	<div>
		<Head>
			<Title>SMS List</Title>
		</Head>
		<admin-header :title="app" />
		<div v-if="pending" class="text-center text-2xl">Loading ...</div>
		<div v-else>
			<render-list
				:data="sms_data"
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
	const app = 'sms'
	const { editable, addable, deleteable, statusable, viewable } = getAccess(app)

	//
	// Get all sms
	//
	const { data: sms_data, pending } = await getAll('sms')

	//
	// Renderlist actions
	//
	const deleteItem = async (id) => {
		await deleteOne('sms', id)
	}

	const changeStatus = async ({ id, status }) => {
		await changeStatusOne('sms', { id, status })
	}
</script>
