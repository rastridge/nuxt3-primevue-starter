<template>
	<div class="history">
		<div v-if="history">
			<h3>{{ history[0].opponent_name }}</h3>
			<h3>Games</h3>

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
