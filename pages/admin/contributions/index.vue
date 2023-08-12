<template>
	<div>
		<Head>
			<Title>Contributions Admin</Title>
		</Head>
		<admin-header :title="app" />
		<div v-if="!contributions" class="text-center text-2xl">
			<ProgressSpinner /> Loading ...
		</div>
		<div v-else>
			<!--Select year -->
			<div class="text-center m-5">
				<select-year
					:startyear="startyear"
					:currentyear="year"
					@submitted="onSubmit"
					class="mb-3"
				/>
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
	import { usePlacemarkStore } from '@/stores'
	const placemark = usePlacemarkStore()
	const { getAll, deleteOne, changeStatusOne } = useFetchAll()
	const { $dayjs } = useNuxtApp()

	//
	// Initialize values for Renderlist and Select Year
	//

	const { getAccess } = useRenderListAccess()
	const { editable, addable, deleteable, statusable, viewable } = getAccess(app)
	const app = 'contributions'

	//
	// Initialize year select
	//
	const startyear = 2012
	// const { $dayjs } = useNuxtApp()
	const year = ref(placemark.getYear)

	//
	// Get all contributions
	//
	const { data: contributions, pending } = await getAll(app)

	//
	// Select year action
	//
	const onSubmit = function (value) {
		year.value = value
		placemark.setYear(year.value)
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
