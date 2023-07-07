<script setup>
	const { onSubmitAdd } = useSubmit()
	const saving = ref(false)

	//
	// Content form action
	//
	const onSubmit = async function (form_state) {
		saving.value = true
		await onSubmitAdd('game_player_stats', form_state)
		saving.value = false
		navigateTo(`/admin/game_player_stats`)
	}
</script>

<template>
	<div>
		<Head>
			<Title>Add Game</Title>
		</Head>
		<common-header title="Add Game" />
		<p v-if="saving" class="text-center text-2xl">
			<ProgressSpinner /> Saving ...
		</p>
		<game-form @submitted="onSubmit" />
		<p v-if="saving" class="text-2xl"><ProgressSpinner /> Saving ...</p>
	</div>
</template>
