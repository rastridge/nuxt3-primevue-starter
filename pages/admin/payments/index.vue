<template>
	<div>
		<admin-header :title="app" />
		<span v-if="error" class="text-danger">ERROR: {{ error }}</span>
		<render-list
			:data="payments"
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
</template>

<script setup>
	const { getAll, deleteOne, changeStatusOne } = useFetchAll()
	//
	// Initialize values for Renderlist
	//
	const { getAccess } = useRenderListAccess()
	const app = 'payments'
	const { editable, addable, deleteable, statusable, viewable } = getAccess(app)

	//
	// Get all payments
	//
	const { data: payments, error, pending } = await getAll(app)
	//
	// Renderlist actions
	//
	const deleteItem = async (id) => {
		await deleteOne('payments', id)
	}

	const changeStatus = async ({ id, status }) => {
		await changeStatusOne('payments', { id, status })
	}
</script>
