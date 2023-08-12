<script setup>
	const { onSubmitAdd } = useSubmit()
	const saving = ref(false)

	//
	// Content form action
	//
	const onSubmit = async function (form_state) {
		await onSubmitAdd('game_player_stats', form_state)
		navigateTo(`/admin/game_player_stats`)
	}
</script>

<template>
	<div>
		<Head>
			<Title>Add Game</Title>
		</Head>
		<admin-header title="Add Game" />
		<game-form @submitted="onSubmit" />
	</div>
</template>
