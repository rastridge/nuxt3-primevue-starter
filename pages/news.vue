<template>
	<div>
		<!-- <div class="card"> -->
		<Common-header title="Current News" />
		<div
			class="flex flex-wrap card-container align-items-center justify-content-center"
		>
			<Card
				v-for="item in news"
				:key="item.news_id"
				class="shadow-7 m-2 p-2 cursor-pointer"
			>
				<template #title>
					<!-- Adjust for local time and Format for Primevue calendar -->
					<span class="text-sm">
						{{ $dayjs(item.dt).format('MMM D, YYYY HH:mm a') }} </span
					><br />
					{{ item.news_title }}
				</template>
				<template #subtitle> {{ item.news_synop }} </template>

				<template #footer>
					<a href="#" @click.prevent="openModal(item)">Read More</a>
				</template>
			</Card>
			<!-- </div> -->
		</div>

		<!-- Modal -->
		<Dialog
			v-model:visible="displayModal"
			:breakpoints="{ '960px': '75vw', '640px': '90vw' }"
			:style="{ width: '60vw' }"
		>
			<template #header>
				<div>
					<h3>{{ selectedItem.news_title }}</h3>
				</div></template
			>
			<div v-html="selectedItem.news_article"></div>

			<template #footer>
				<div>
					<Button
						label="Return"
						@click="closeModal"
						class="p-button-sm"
						autofocus
					/>
				</div>
			</template>
		</Dialog>
	</div>
</template>

<script setup>
	const { $dayjs } = useNuxtApp()
	//
	// Dialog initialization - display news item
	//
	const selectedItem = ref({})
	const displayModal = ref(false)
	const openModal = (item) => {
		displayModal.value = true
		// replace img with img width="100%"
		item.news_article = item.news_article.replace(/\<img/g, '<img width="100%"')

		selectedItem.value = item
	}
	const closeModal = () => {
		displayModal.value = false
	}
	//
	// Get current news
	//
	const {
		data: news,
		pending,
		error,
		refresh,
	} = await useFetch('/news/getallcurrent', {
		method: 'get',
		headers: {
			authorization: 'not-needed',
		},
	})
</script>
