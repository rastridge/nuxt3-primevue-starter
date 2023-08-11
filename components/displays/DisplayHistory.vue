<template>
	<div class="history">
		<div v-if="history">
			<h6 class="m-2 text-xl">
				{{ history[0].opponent_name }} -
				{{ $dayjs(history[0].date).format('MMMM DD, YYYY @ ddd h:mm A') }}
			</h6>
			<p class="text-lg">Games</p>

			<table>
				<tbody class="text-sm">
					<tr v-for="item in history">
						<td>
							{{ $dayjs(item.date).format('ddd MMM D YYYY') }}
						</td>
						<td>
							{{ getGameLevelCode(item) }}
						</td>
						<td>
							{{ getResultCode(item) }}
							{{ item.ptsFor }} -
							{{ item.ptsAgn }}
						</td>
						<td>{{ item.comment }}</td>
						<td>{{ item.venue }}</td>
						<td>{{ item.occasion }} {{ item.game_type }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup>
	const { $dayjs } = useNuxtApp()
	const { getGameLevelCode, getResultCode } = useGames()
	const history = ref([])

	const props = defineProps({
		opponent_id: { type: String, required: true },
	})

	const url = `/game_player_stats/history/${props.opponent_id}`
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
</script>

<style scoped>
	th,
	td {
		white-space: nowrap;
		border-bottom: 1px solid #ddd;
		border-left: 1px solid #ddd;
	}
</style>
