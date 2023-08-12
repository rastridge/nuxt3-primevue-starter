<template>
	<div>
		<Head>
			<Title>Admin Users List</Title>
		</Head>
		<admin-header :title="app" />

		<div v-if="pending" class="text-center text-2xl">Loading ...</div>
		<div v-else>
			<render-list
				:data="users"
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
	// definePageMeta({ layout: 'admin' })
	import { useAlertStore } from '~/stores/alertStore'
	const alert = useAlertStore()
	const { getAll, deleteOne, changeStatusOne } = useFetchAll()

	//
	// Initialize values for Renderlist
	//
	const { getAccess } = useRenderListAccess()
	const app = 'users'
	const { editable, addable, deleteable, statusable, viewable } = getAccess(app)

	//
	// Get all users
	//
	const { data: users, pending } = await getAll('users')

	//
	// Renderlist actions
	//
	const deleteItem = async (id) => {
		await deleteOne('users', id)
	}
	const changeStatus = async ({ id, status }) => {
		await changeStatusOne('users', { id, status })
	}
</script>
