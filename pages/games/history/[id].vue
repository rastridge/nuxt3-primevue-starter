<template>
	<div id="stats">
		<div>
			<Button class="p-button-sm m-1" @click.prevent="returnToList()">
				Return to Season
			</Button>
			<!-- <div
				v-if="
					history && historytotals && historystreaks && historycurrentstreak
				"
			>	 -->
			<div v-if="history">
				<display-history :history="history" />
				<display-records :historytotals="historytotals" />
				<display-streaks :historystreaks="historystreaks" />
			</div>
		</div>
		<Button class="p-button-sm m-1" @click.prevent="returnToList()">
			Return to Season
		</Button>
	</div>
</template>

<script setup>
	const route = useRoute()
	const opponent_id = ref(route.params.id)

	const history = ref([])
	const historytotals = ref({})
	const historystreaks = ref({})
	/* 			const historycurrentstreak = ref([])
	 */
	useHead({
		title: 'Buffalo Rugby Club Opponent History',
	})

	/* 			onMounted(() => {
		getHistoryStreaks(id)
		// getHistoryCurrentStreak($route.params.id.value) // sql error
	})
 */
	const getHistory = async (opponent_id) => {
		const url = `/game_player_stats/history/${opponent_id}`
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
		} else {
			history.value = data.value
		}
	}
	const getHistoryTotals = async (opponent_id) => {
		const url = `/game_player_stats/totals/${opponent_id}`
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
		} else {
			historytotals.value = data.value
		}
	}
	const getHistoryStreaks = async (opponent_id) => {
		const url = `/game_player_stats/streaks/${opponent_id}`
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
		} else {
			historystreaks.value = data.value
		}
	}

	/* 
	const getHistoryCurrentStreak = (id) => {
		statsService.getHistoryCurrentStreak(id).then((result) => {
			historycurrentstreak = result
		})
	}
 */
	await getHistory(opponent_id.value)
	await getHistoryTotals(opponent_id.value)
	await getHistoryStreaks(opponent_id.value)
	const returnToList = () => {
		navigateTo(`/games/schedule`)
	}
</script>
