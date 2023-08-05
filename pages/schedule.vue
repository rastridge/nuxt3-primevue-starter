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
		<DataView :value="filteredData" paginator :rows="5">
			<template #list="slotProps">
				<div class="col-12">
					<div
						class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4"
					>
						<div
							class="flex flex-column align-items-center sm:align-items-start gap-3"
						>
							<div class="text-2xl font-bold text-900">
								{{ slotProps.data.title }}
							</div>
							<div>
								{{ slotProps.data.occasion }} -
								{{ getGameLevelCode(slotProps.data) }} Team
							</div>

							<div class="flex align-items-center gap-3">
								<span class="flex align-items-center gap-2">
									<span class="font-semibold">{{
										slotProps.data.game_type
									}}</span>
								</span>
							</div>
						</div>
						<div
							class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2"
						>
							<span class="text-2xl font-semibold">
								{{ getResultCode(slotProps.data) }} &nbsp;&nbsp;&nbsp;
								{{ slotProps.data.ptsFor }} - {{ slotProps.data.ptsAgn }}</span
							>
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
	const { $dayjs } = useNuxtApp()
	const { getGameLevelCode, getResultCode } = useGames()

	const placemark = usePlacemarkStore()
	const startyear = 1966
	const year = ref(placemark.getYear)

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
		return data.value
	}
	// initial value
	season.value = await getSeason(year.value)

	const onSubmit = async function (value) {
		year.value = value
		placemark.setYear(year.value)
		season.value = await getSeason(year.value)
	}

	//
	// select Game type
	//
	const gametype = ref(placemark.getGameTypeId)

	const filteredData = computed(() => {
		return season.value.filter((d) => {
			if (gametype.value === 7) {
				return d.game_type_id === 7
			} else {
				return d.game_type_id !== 7
			}
		})
	})
</script>
