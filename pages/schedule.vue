<template>
	<div id="events">
		<div class="center-content">
			<common-header title="Schedule" />
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

		<DataView :value="filteredData">
			<template #list="slotProps">
				<div class="col-12">
					<span class="font-semibold">{{ slotProps.data.title }}</span>
				</div>
			</template>
		</DataView>
	</div>
</template>

<script setup>
	import { usePlacemarkStore } from '@/stores'
	const { $dayjs } = useNuxtApp()

	const placemark = usePlacemarkStore()
	const startyear = 2004
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

	season.value = getSeason(year.value)

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
