<template>
	<div id="events">
		<div class="center-content">
			<common-header title="Game Schedule" />
		</div>

		<!--Select season -->
		<div class="text-center m-5">
			<select-season
				:startyear="startyear"
				:currentyear="year"
				@submitted="onSubmit"
				class="mb-3"
			/>
		</div>

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

		<!-- <DataView :value="season"> -->
		<DataView
			:value="filteredData"
			paginator
			:rows="5"
			:first="first"
			@page="onPaginate"
		>
			<template #list="slotProps">
				<div class="col-12">
					<div
						class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4 m-2 p-2 border-dotted border-black"
					>
						<div
							class="flex flex-column align-items-center sm:align-items-start gap-2 border-soli border-blue w-3"
						>
							<div class="flex align-items-center border-soli border-yellow">
								<span class="text-xl font-bold text-900">
									{{
										$dayjs(slotProps.data.date).format('MMMM D @ h:mm A')
									}}</span
								>
							</div>

							<div class="flex align-items-center border-soli border-yellow">
								<span class="font-semibold"
									>{{ getGameLevelCode(slotProps.data) }} Side
								</span>
							</div>

							<div class="flex align-items-center border-soli border-yellow">
								<span class="font-semibold">{{
									slotProps.data.game_type
								}}</span>
							</div>
						</div>

						<div
							class="flex flex-row justify-content-between align-items-center gap-2 border-soli border-blue w-6"
						>
							<div class="flex align-items-center border-soli border-yellow">
								<Button
									:label="slotProps.data.title"
									text
									class="text-3xl font-bold"
									@click.prevent="showGame(slotProps.data.game_id)"
								>
								</Button>
							</div>
							<div class="flex align-items-center border-soli border-yellow">
								<span class="text-2xl font-semibold">
									{{ getResultCode(slotProps.data) }} &nbsp;&nbsp;&nbsp;
									{{ slotProps.data.ptsFor }} -
									{{ slotProps.data.ptsAgn }}</span
								>
							</div>
						</div>

						<div
							class="flex flex-column align-items-center sm:align-items-start gap-2 border-soli border-blue w-3"
						>
							<div
								class="flex align-items-center gap-3 border-soli border-yellow"
							>
								<span class="text-xl font-semibold">{{
									slotProps.data.venue
								}}</span>
							</div>
							<div class="flex align-items-center border-soli border-yellow">
								<span>
									{{ slotProps.data.occasion }}
								</span>
							</div>
							<div class="flex align-items-center border-soli border-yellow">
								<Button
									label="Show history"
									text
									@click.prevent="showHistory(slotProps.data.opponent_id)"
								>
								</Button>
							</div>
						</div>
					</div>
				</div>
			</template>
		</DataView>
		<roster-chart />
	</div>
</template>

<script setup>
	import { usePlacemarkStore } from '@/stores'
	import dayjs from 'dayjs'
	const { $dayjs } = useNuxtApp()

	const placemark = usePlacemarkStore()
	const { getGameLevelCode, getResultCode } = useGames()

	//
	// Initialize year select
	//
	const startyear = 1966
	const year = ref(placemark.getYear)
	//
	// select Game type
	//
	const gametype = ref(placemark.getGameTypeId)

	//
	// Initial settings for pagination
	//
	const first = ref(placemark.getPage)

	const onPaginate = (e) => {
		first.value = e.rows * e.page
		placemark.setPage(first.value)
	}
	//
	// get / set season data
	//
	const season = ref([])

	const getSeason = async (year) => {
		const url = `/game_player_stats/getseason/${year}`
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
		// const d = $dayjs(season.value.date)
		// data.value.date = d.format('YYYY')
		return data.value
	}
	season.value = await getSeason(year.value)

	const onSubmit = async function (value) {
		year.value = value
		placemark.setYear(year.value)
		season.value = await getSeason(year.value)
	}

	//
	// set gametype after drop down choice
	//
	watch(gametype, (newid) => {
		placemark.setGameTypeId(newid)
	})

	const filteredData = computed(() => {
		return season.value.filter((d) => {
			if (gametype.value === 7) {
				return d.game_type_id === 7
			} else {
				return d.game_type_id !== 7
			}
		})
	})

	const showGame = (id) => {
		placemark.setYear(year.value)
		navigateTo(`/games/game/${id}`)
	}
	const showHistory = (id) => {
		placemark.setYear(year.value)
		navigateTo(`/games/history/${id}`)
	}
</script>
