<template>
	<div id="gameInfo">
		<table class="nowrap">
			<tbody>
				<tr>
					<td>
						Game date - {{ $dayjs(item.date).format('MMM D YYYY ddd h:mm a') }}
					</td>
				</tr>
				<tr>
					<td>
						Game level -
						{{ gglc(item) }}
					</td>
				</tr>
				<tr>
					<td>
						Score -
						{{ grc(item) }}
						{{ item.ptsFor }} -
						{{ item.ptsAgn }}
					</td>
				</tr>
				<tr>
					<td>Venue - {{ item.venue }}</td>
				</tr>
				<tr>
					<td>Occasion - {{ item.occasion }}</td>
				</tr>
				<tr>
					<td>Referee - {{ item.referee }}</td>
				</tr>
				<tr>
					<td>Game type - {{ item.game_type }}</td>
				</tr>
				<tr>
					<td>Comment - {{ item.comment }}</td>
				</tr>
				<tr>
					<td><img :src="item.game_pic_path" /></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup>
	const { $dayjs } = useNuxtApp()
	const { getGameLevelCode, getResultCode } = useGames()

	const props = defineProps({
		item: { type: Object, required: true },
	})
	const gglc = (s) => {
		return getGameLevelCode(s)
		// return 'AAAA'
	}
	const grc = (s) => {
		return getResultCode(s)
	}
</script>
