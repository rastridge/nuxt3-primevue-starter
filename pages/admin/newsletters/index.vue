<template>
	<div>
		<Head>
			<Title>Newsletters List</Title>
		</Head>
		<admin-header :title="app" />
		<div v-if="pending" class="text-center text-2xl">Loading ...</div>
		<div v-else>
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
	//
	// Initialize values for Renderlist and Select Year
	//
	const { getAccess } = useRenderListAccess()
	const app = 'newsletters'
	const { editable, addable, deleteable, statusable, viewable } = getAccess(app)

	const startyear = ref(2004)
	const { $dayjs } = useNuxtApp()
	const year = ref(placemark.getYear)

	//
	// Get all news
	//
	const { data: newsletters, pending } = await getAll('newsletters')

	//
	// Select year action
	//
	const onSubmit = function (value) {
		year.value = value
		placemark.setYear(year.value)
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
