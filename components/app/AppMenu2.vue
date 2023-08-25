<script setup lang="ts">
	import AppSubmenu2 from './AppSubmenu2.vue'

	const props = defineProps<{
		model: Array<any>
	}>()

	const emit = defineEmits(['menuItemClick'])

	function onMenuItemClick(event: any) {
		emit('menuItemClick', event)
	}
</script>

<template>
	<div class="layout-menu-container">
		<AppSubmenu2
			:items="model"
			class="layout-menu"
			:root="true"
			@menu-item-click="onMenuItemClick"
		/>
	</div>
</template>

<style scoped></style>
