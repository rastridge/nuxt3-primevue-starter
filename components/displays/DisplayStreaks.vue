<template>
	<div class="historystreaks">
		<p class="text-lg mt-1">Streaks</p>
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
	const historystreaks = ref({})
	const props = defineProps({
		opponent_id: { type: String, required: true },
	})
	const url = `/game_player_stats/streaks/${props.opponent_id}`
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
</script>
