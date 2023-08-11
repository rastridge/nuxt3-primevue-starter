<template>
	<div class="roster">
		<div v-if="players">
			<table>
				<thead>
					<tr>
						<th>Pos</th>
						<th>Player</th>
						<th>Tries</th>
						<th>Assts</th>
						<th>Conv</th>
						<th>PenK</th>
						<th>DropG</th>
						<th>Yel</th>
						<th>Red</th>
						<th>Replaced by</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="player in players" :key="player.position_id">
						<td>{{ player.position_id }}</td>
						<td>{{ player.pfn }} {{ player.pln }}</td>
						<td>{{ player.tries ? player.tries : '' }}</td>
						<td>{{ player.assists ? player.assists : '' }}</td>
						<td>{{ player.conv ? player.conv : '' }}</td>
						<td>{{ player.penk ? player.penk : '' }}</td>
						<td>{{ player.dgoal ? player.dgoal : '' }}</td>
						<td>{{ player.yellow ? player.yellow : '' }}</td>
						<td>{{ player.red ? player.red : '' }}</td>
						<td>{{ player.rfn }} {{ player.rln }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup>
	const props = defineProps({
		players: { type: Array, required: true },
	})
</script>

<style scoped>
	th,
	td {
		border-bottom: 1px solid #ddd;
		border-left: 1px solid #ddd;
	}
</style>
