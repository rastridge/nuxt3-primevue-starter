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

	const props = defineProps({
		history: { type: Array, required: true },
	})
</script>

<style scoped>
	th,
	td {
		white-space: nowrap;
		border-bottom: 1px solid #ddd;
		border-left: 1px solid #ddd;
	}
</style>
