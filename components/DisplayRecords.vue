<template>
	<div class="historyrecords">
		<p class="text-lg mt-1">Totals</p>

		<table class="nowrap">
			<tr>
				<td><span>Games</span></td>
				<td>{{ historytotals.game_count }}</td>
			</tr>
			<tr>
				<td>Wins</td>
				<td>{{ historytotals.wins }}</td>
			</tr>
			<tr>
				<td>Losses</td>
				<td>{{ historytotals.losses }}</td>
			</tr>
			<tr>
				<td>Ties</td>
				<td>{{ historytotals.ties }}</td>
			</tr>
			<tr>
				<td>Unknown</td>
				<td>{{ historytotals.unknown }}</td>
			</tr>
			<tr>
				<td>Max Points For</td>
				<td>{{ historytotals.maxFor }}</td>
			</tr>
			<tr>
				<td>Max Points Against</td>
				<td>{{ historytotals.maxAgn }}</td>
			</tr>
			<tr>
				<td>Max Winning Margin</td>
				<td>{{ historytotals.maxWinMargin }}</td>
			</tr>
			<tr>
				<td>Max Losing Margin</td>
				<td>{{ historytotals.maxLossMargin }}</td>
			</tr>
		</table>
	</div>
</template>

<script setup>
	const historytotals = ref()
	const props = defineProps({
		opponent_id: { type: String, required: true },
	})

	const url = `/game_player_stats/totals/${props.opponent_id}`
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
</script>

<style scoped>
	th,
	td {
		border-bottom: 1px solid #ddd;
		border-left: 1px solid #ddd;
	}
</style>
