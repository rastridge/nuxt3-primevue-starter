<template>
	<div id="stats">
		<div>
			<Button class="p-button-sm m-1" @click.prevent="returnToList()">
				Return to Season
			</Button>

			<display-history :opponent_id="opponent_id" />
			<display-records :opponent_id="opponent_id" />
			<display-streaks :opponent_id="opponent_id" />
		</div>
		<Button class="p-button-sm m-1" @click.prevent="returnToList()">
			Return to Season
		</Button>
	</div>
</template>

<script setup>
	useHead({
		title: 'Buffalo Rugby Club Opponent History',
	})

	const route = useRoute()
	const opponent_id = ref(route.params.id)

	const returnToList = () => {
		navigateTo(`/games/schedule`)
	}
</script>
