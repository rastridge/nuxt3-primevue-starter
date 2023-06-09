<template>
	<div>
		<Head>
			<Title>Stats Admin</Title>
		</Head>
		<common-header :title="app" />
		<div v-if="!stats" class="text-center text-2xl">
			<ProgressSpinner /> Loading ...
		</div>
		<div v-else>
			<!--Select season -->
			<div class="text-center m-5">
				<select-season
					:startyear="startyear"
					:currentyear="year"
					@submitted="onSubmit"
					class="mb-3"
				/>

				<div style="display: block; width: 100px; margin: auto">
					<FormKit
						type="select"
						label="Game type"
						v-model="gametype"
						:options="[
							{ label: '15s', value: 1 },
							{ label: '7s', value: 7 },
						]"
					/>
				</div>
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
	//
	// initialize renderlist
	//
	const { getAccess } = useRenderListAccess()
	const app = 'game_player_stats'
	const { editable, addable, deleteable, statusable, viewable } = getAccess(app)
	const stats = ref([])

	//
	// Initialize year select
	//
	const startyear = 1966
	const { $dayjs } = useNuxtApp()
	const year = ref(placemark.getYear)
	//
	// select Game type
	//
	const gametype = ref(placemark.getGameTypeId)

	const filteredData = computed(() => {
		return stats.value.filter((d) => {
			if (gametype.value === 7) {
				return d.game_type_id === 7
			} else {
				return d.game_type_id !== 7
			}
		})
	})
	//
	// get season data
	//
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

	//
	// set season after drop down choice
	//
	const onSubmit = async function (value) {
		year.value = value
		placemark.setYear(year.value)
		await getSeason()
	}

	//
	// set gametype after drop down choice
	//
	watch(gametype, (newid) => {
		placemark.setGameTypeId(newid)
	})

	//
	// get current season on select season submit
	//
	getSeason()

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
