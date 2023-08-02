<template>
	<div>
		<span v-if="!hover" style="color: #00c" @mouseover="hover = true"
			>Email</span
		>
		<span v-if="hover" style="color: black" @mouseleave="hover = false">
			<a :href="'mailto:' + email">{{ email }}</a>
		</span>
	</div>
</template>

<script setup>
	const hover = ref(false)
	const props = defineProps({
		email: { type: String, default: 'Aol', required: true },
	})
</script>
