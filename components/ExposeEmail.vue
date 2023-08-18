<template>
	<div>
		<!-- <span v-if="!hover" style="color: #00c" @mouseover="hover = true"
			>Email</span
		>
		<span v-if="hover" style="color: black" @mouseleave="hover = false">
			<a :href="'mailto:' + email">{{ email }}</a>
		</span> -->
		<span v-if="!hover" @mouseover="hover = true">Email</span>
		<span v-if="hover" @mouseleave="hover = false">
			<a :href="'mailto:' + email">{{ email }}</a>
		</span>
	</div>
</template>

<script setup>
	const hover = ref(false)
	const props = defineProps({
		email: { type: String, required: true },
	})
</script>
