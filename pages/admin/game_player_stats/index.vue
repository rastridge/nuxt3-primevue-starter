<template>
	<div>
		<Head>
			<Title>Stats Admin</Title>
		</Head>
		<common-header :title="app" />
		<div v-if="pending" class="text-center text-2xl">Loading ...</div>
		<div v-else>
			<!--Select season -->
			<div class="text-center m-5">
				<select-season
					:startyear="startyear"
					@submitted="onSubmit"
					class="mb-3"
				/>
				<p class="text-2xl">{{ year }}</p>
			</div>
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
	</div>
</template>

<script setup>
	const app = 'game_player_stats'
	//
	// initialize renderlist
	//
	const { getAccess } = useRenderListAccess()
	const { editable, addable, deleteable, statusable, viewable } = getAccess(app)
	const stats = ref([])
	//
	// Season select action
	//
	const { $dayjs } = useNuxtApp()
	const year = ref(parseInt($dayjs().format('YYYY')))
	const startyear = 1966
	const getSeason = async () => {
		const url = `/game_player_stats/getseason/${year.value}`
		const { data, error } = await useFetch(url, {
			method: 'get',
			headers: {
				// authorization: auth.user.token,
				authorization: 'not-needed',
			},
		})
		if (error.value) {
			throw createError({
				...error.value,
				statusMessage: `Could not get data from ${url}`,
			})
		}
		stats.value = data.value
	}
	getSeason()

	//
	// get season after drop down choice
	//
	const onSubmit = async function (value) {
		year.value = value
		getSeason()
	}
	//
	// get current season on start
	//
	/* 	onMounted(() => {
		getSeason()
	}) */

	//
	// Renderlist actions
	//
	const { deleteOne, changeStatusOne } = useFetchAll()

	const deleteItem = async (id) => {
		await deleteOne('stats', id)
	}

	const changeStatus = async ({ id, status }) => {
		await changeStatusOne('stats', { id, status })
	}
</script>
