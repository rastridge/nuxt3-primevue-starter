<template>
	<div>
		<Head>
			<Title>Contributions Admin</Title>
		</Head>
		<common-header :title="app" />
		<span v-if="error" class="text-danger">ERROR: {{ error }}</span>
		<div v-if="pending" class="text-center text-2xl">Loading ...</div>
		<div v-else>
			<!--Select year -->
			<div class="text-center m-5">
				<select-year
					:startyear="startyear"
					@submitted="onSubmit"
					class="mb-3"
				/>
				<p class="text-2xl">{{ year }}</p>
			</div>
			<render-list
				:data="filteredData"
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
	</div>
</template>

<script setup>
	const { getAll, deleteOne, changeStatusOne } = useFetchAll()

	//
	// Initialize values for Renderlist and Select Year
	//

	const { getAccess } = useRenderListAccess()
	const app = 'contributions'
	const { editable, addable, deleteable, statusable, viewable } = getAccess(app)

	const startyear = ref(2012)
	const { $dayjs } = useNuxtApp()
	let year = ref(parseInt($dayjs().format('YYYY')))

	//
	// Get all contributions
	//
	const { data: contributions, pending } = await getAll(app)

	//
	// Select year action
	//
	const onSubmit = function (value) {
		year.value = value
	}

	const filteredData = computed(() => {
		return contributions.value.filter((d) => {
			return parseInt($dayjs(d.dt).format('YYYY')) === year.value
		})
	})

	//
	// Renderlist actions
	//
	const deleteItem = async (id) => {
		await deleteOne('contributions', id)
	}

	const changeStatus = async ({ id, status }) => {
		await changeStatusOne('contributions', { id, status })
	}
</script>
