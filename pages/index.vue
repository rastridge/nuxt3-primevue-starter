<script setup lang="ts">
	import AdvertiseBox from '@/components/AdvertiseBox.vue'
</script>

<template>
	<!-- <div style="background-image: url('/imgs/2019_nyrc.jpg'); height: 800px"> -->
	<div style="height: 800px" class="splash">
		<div class="surface-0 text-center">
			<div class="mb-3 font-bold text-4xl">
				<span class="text-blue-600">Buffalo Rugby Club</span>
			</div>
			<div class="text-2xl pb-6">
				<span class="text-white-600">
					Home Field Delaware Park | Home Base Brawler's Deli
				</span>
			</div>
			<div class="grid grid-cols-2 lg:grid-cols-3 gap-2">
				<AdvertiseBox
					header="TipTap"
					icon="prime-check-circle"
					color="green-600"
				>
					TipTap Editor Demo
				</AdvertiseBox>
				<AdvertiseBox
					header="Vitest"
					icon="prime-check-circle"
					color="blue-600"
				>
					Testing with Vitest
				</AdvertiseBox>
				<AdvertiseBox
					header="Histoire"
					icon="prime-check-circle"
					color="green-600"
				>
					Interactive Component Playgrounds
				</AdvertiseBox>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
