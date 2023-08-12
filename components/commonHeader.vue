<template>
	<div id="commonheader">
		<div class="text-center m-5 md:text-2xl">{{ title }}</div>
	</div>
</template>

<script setup>
	const props = defineProps({
		title: { String, required: true },
	})
</script>
