<template>
	<div id="sponsorad">
		<div class="card w-full">
			<div v-if="item">
				<a :href="item.ad_client_website" target="_blank">
					<img :src="item.ad_image_path" style="width: 100%" />
				</a>
			</div>
		</div>
	</div>
</template>

<script setup>
	const route = useRoute()

	const item = ref(null)
	const sponsorcount = ref(0)

	watch(
		() => route.fullPath,
		async () => {
			showRandomSponsor()
		}
	)

	onMounted(async () => {
		showRandomSponsor()
	})

	const showRandomSponsor = async () => {
		const getRandomInt = (min, max) => {
			min = Math.ceil(min)
			max = Math.floor(max)
			return Math.floor(Math.random() * (max - min + 1)) + min
		}

		const adIds = await getSponsorIds()
		const adIdIndex = getRandomInt(0, adIds.length)
		// console.log(
		// 	'IN showRandomSponsor adIds[adIdIndex].id = ',
		// 	adIds[adIdIndex].id
		// )
		item.value = getOne(adIds[adIdIndex].id)
	}

	const getSponsorIds = async () => {
		//
		// Get sponsors count
		//
		const { data, pending, error, refresh } = await useFetch(
			'/sponsors/getids',
			{
				method: 'get',
				headers: {
					authorization: 'not-needed',
				},
			}
		)
		return data.value
	}
	/* 					if (!$store.state.ads.ads) {
							sponsorService.getAllCurrent().then(
								(data) => {
									sponsors.value = data
									showRandomSponsor()
									$store.commit('ads/saveads', sponsors.value)
								},
								(error) => {
									error.value = error
								}
							)
						} else {
							sponsors.value = $store.state.ads.ads
						} */

	const getOne = async (id) => {
		//
		// Get one sponsors data
		//
		const { data, pending, error, refresh } = await useFetch(
			`/sponsors/${id}`,
			{
				method: 'get',
				headers: {
					authorization: 'not-needed',
				},
			}
		)
		item.value = data.value
	}
</script>
