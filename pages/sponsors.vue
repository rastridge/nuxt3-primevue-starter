<template>
	<div id="sponsors">
		<div class="center-content">
			<common-header title="Sponsors" />
		</div>
		<div>
			<Card
				v-for="item in sponsors"
				:key="item.id"
				class="shadow-7 border-round-lg m-2 p-2"
			>
				<template #header>
					<span class="text-xl">{{ item.ad_client_name }}</span></template
				>
				<template #subtitle>
					<div class="flex flex-row flex-wrap">
						<div class="flex align-items-center justify-content-center w-10rem">
							{{ item.ad_client_contact }}
						</div>
						<div class="flex align-items-center justify-content-center w-20rem">
							<expose-email :email="item.ad_client_email" />
						</div>
					</div>
				</template>
				<template #content>
					<img :src="item.ad_image_path" class="responsive" />
				</template>
			</Card>
		</div>
	</div>
</template>

<script setup>
	//
	// Get current sponsors
	//
	const {
		data: sponsors,
		pending,
		error,
		refresh,
	} = await useFetch('/sponsors/getallcurrent', {
		method: 'get',
		headers: {
			authorization: 'not-needed',
		},
	})
</script>

<style scoped>
	.responsive {
		width: 100%;
		height: auto;
	}
</style>
