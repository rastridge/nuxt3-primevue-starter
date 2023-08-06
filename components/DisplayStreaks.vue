<template>
	<div class="historystreaks">
		<h3>Win Steaks</h3>
		<table class="nowrap">
			<tr>
				<td>&nbsp;</td>
				<td>&nbsp;</td>
				<td>&nbsp;</td>
			</tr>
			<tr v-for="item in historystreaks" :key="item.StartDate">
				<td>{{ item.result }}</td>
				<td>{{ item.Games }}</td>
				<td>
					{{ $dayjs(item.StartDate).format('MMM D YYYY') }} ->
					{{ $dayjs(item.EndDate).format('MMM D YYYY') }}
				</td>
			</tr>
		</table>
	</div>
</template>

<script setup>
	const props = defineProps({
		historystreaks: { type: Object, required: true },
	})
</script>
