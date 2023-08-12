<script setup>
	import { useAuthStore } from '~/stores/authStore'
	const auth = useAuthStore()
	//
	// Get content item id
	//
	const route = useRoute()
	const id = ref(route.params.id)

	//
	// content form action
	//
	const { onSubmitEdit } = useSubmit()
	const onSubmit = async function (form_state) {
		await onSubmitEdit('game_player_stats', form_state)
		navigateTo(`/admin/game_player_stats`)
	}
</script>

<template>
	<div>
		<Head>
			<Title>Edit game {{ id }}</Title>
		</Head>
		<admin-header title="Edit game" />
		<game-form :id="id" @submitted="onSubmit" />
	</div>
</template>
