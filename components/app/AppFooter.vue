<script setup lang="ts">
	const { $dayjs } = useNuxtApp()
</script>

<template>
	<div class="mt-4 layout-footer">
		<div class="text-center w-75%">
			<sponsor-ads />
			<span class="font-medium ml-2"
				>Copyright {{ $dayjs().format('YYYY') }} &copy; The Buffalo Rugby Club -
				Buffalo New York</span
			>
		</div>
	</div>
</template>
