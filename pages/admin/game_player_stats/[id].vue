<script setup>
	import { useAuthStore } from '~/stores/authStore'
	const auth = useAuthStore()
	const saving = ref(false)

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
		saving.value = true
		await onSubmitEdit('game_player_stats', form_state)
		saving.value = false
		navigateTo(`/admin/game_player_stats`)
	}
</script>

<template>
	<div>
		<Head>
			<Title>Edit game {{ id }}</Title>
		</Head>
		<common-header title="Edit game" />
		<p v-if="saving" class="text-center text-2xl">
			<ProgressSpinner /> Saving ...
		</p>
		<game-form :id="id" @submitted="onSubmit" />
		<p v-if="saving" class="text-2xl"><ProgressSpinner /> Saving ...</p>
	</div>
</template>
