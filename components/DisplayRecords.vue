<template>
	<div class="historyrecords">
		<h3>Totals</h3>

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
	const props = defineProps({
		historytotals: { type: Object, required: true },
	})
</script>

<style scoped>
	th,
	td {
		border-bottom: 1px solid #ddd;
		border-left: 1px solid #ddd;
	}
</style>
