<script setup lang="ts">
	import AdvertiseBox from '@/components/AdvertiseBox.vue'
</script>

<template>
	<div
		class="bg-no-repeat bg-cover bg-center w-full pt-4"
		style="min-height: 900px; background-image: url('/imgs/2019_nyrc.jpg')"
	>
		<div class="card bg-transparent w-full">
			<div class="flex justify-content-center flex-col md:flex-row">
				<div
					class="flex align-items-center justify-content-center text-3xl md:text-4xl lg:text-6xl uppercase font-bold text-red-900"
					style="text-shadow: 2px 2px 6px rgb(233, 233, 233)"
				>
					Buffalo
				</div>
				<div class="flex align-items-center justify-content-center">
					<img src="/imgs/bflo_blue.png" class="w-6rem md:w-8rem xl:w-16rem" />
				</div>

				<div
					class="flex align-items-center justify-content-center text-3xl md:text-4xl lg:text-6xl uppercase font-bold text-red-900"
					style="text-shadow: 2px 2px 6px rgb(233, 233, 233)"
				>
					Rugby
				</div>
			</div>
		</div>
		<p class="text-center text-xl md:text-2xl text-white">
			Home Field Delaware Park | Home Base Brawler's Deli
		</p>
		<!-- <p>class="grid grid-cols-2 lg:grid-cols-3 gap-2">
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
		</div> -->
	</div>
</template>

<style scoped></style>
