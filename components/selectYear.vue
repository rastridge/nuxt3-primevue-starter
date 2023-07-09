<template>
	<div>
		<Dropdown
			v-model="year"
			:options="years"
			optionLabel="label"
			optionValue="value"
			placeholder="Select a Different Year"
		/>
		<!-- year = {{ year }} years = {{ years }} -->
	</div>
</template>

<script setup>
	//
	// Incoming
	//
	const props = defineProps({
		startyear: {
			type: Number,
			required: true,
		},
		currentyear: {
			type: Number,
			required: true,
		},
	})
	//
	// Outgoing
	//
	const emit = defineEmits(['submitted'])

	//
	// Info for dropdown
	//
	const { $dayjs } = useNuxtApp()
	const year = ref(props.currentyear)

	const years = computed(() => {
		{
			const years = [] // array of numbers
			const thisyear = parseInt($dayjs().format('YYYY'))
			for (let year = props.startyear; year <= thisyear + 1; year++) {
				years.push({ label: year, value: year })
			}
			return years
		}
	})
	//
	// Watch for dropdown value change
	//
	watch(year, () => emit('submitted', year.value))
</script>

<style lang="scss" scoped>
	.p-dropdown {
		width: 10rem;
	}
	@media screen and (max-width: 640px) {
		.p-treeselect {
			width: 100%;
		}
	}
</style>
