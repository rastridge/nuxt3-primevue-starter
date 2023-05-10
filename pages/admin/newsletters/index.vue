<template>
	<div>
		<Head>
			<Title>Newsletters List</Title>
		</Head>
		<common-header title="Newsletters List" />
		<div v-if="pending" class="text-center text-2xl">Loading ...</div>
		<div v-else>
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
	const app = 'newsletters'
	const { editable, addable, deleteable, statusable, viewable } = getAccess(app)

	const startyear = ref(2020)
	const { $dayjs } = useNuxtApp()
	let year = ref(parseInt($dayjs().format('YYYY')))

	//
	// Get all news
	//
	const { data: newsletters, pending } = await getAll('newsletters')

	//
	// Select year action
	//
	const onSubmit = function (value) {
		// console.log('in onSubmit value = ', value)
		year.value = value
	}
	//
	// Select news by year
	//
	const filteredData = computed(() => {
		return newsletters.value.filter((d) => {
			return parseInt($dayjs(d.dt).format('YYYY')) === year.value
		})
	})
	//
	// Renderlist actions
	//
	const deleteItem = async (id) => {
		await deleteOne('newsletters', id)
	}

	const changeStatus = async ({ id, status }) => {
		await changeStatusOne('newsletters', { id, status })
	}
</script>
