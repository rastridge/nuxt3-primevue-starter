<template>
	<div class="stats">
		<!-- <common-header :title="item.opponent_name" /> -->
		<div v-if="playersLoaded && infoLoaded">
			<Button class="p-button-sm m-1" @click.prevent="returnToList()">
				Return to Season
			</Button>

			<display-game-info :item="game" />
			<display-roster :players="players" />

			<Button class="p-button-sm m-1" @click.prevent="returnToList()">
				Return to Season
			</Button>
		</div>
	</div>
</template>

<script setup>
	//
	// Get account id to edit
	//
	const route = useRoute()
	const id = ref(route.params.id)
	console.log('IN game id =========== ', id)

	const players = ref([])
	const game = ref({})
	const playersLoaded = ref(false)
	const infoLoaded = ref(false)

	useHead({
		title: 'Buffalo Rugby Club Game',
	})
	onMounted(() => {
		getOne(id.value) // get game info
		// setGame(game.value)
		getPlayers(id.value) // get game info for players
	})

	const getPlayers = async (game_id) => {
		const url = `/game_player_stats/players/${game_id}`
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
			playersLoaded.value = true
			players.value = data.value
		}
	}

	const getOne = async (id) => {
		const url = `/game_player_stats/${id}`
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
			infoLoaded.value = true
			game.value = data.value
		}
	}

	const returnToList = () => {
		navigateTo(`/games/schedule`)
	}
</script>
