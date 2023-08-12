<template>
	<div>
		<Dropdown
			v-model="year"
			:options="seasons"
			optionLabel="season"
			optionValue="year"
			:pt="{
				root: { class: 'w-full md:w-20rem' },
				item: { class: 'text-xl' },
				// input: ({ props, state, context }) => ({ class: 'text-2xl' }),
				input: { class: 'md:text-xl font-semibold' },
			}"
		/>
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
	const thisyear = parseInt($dayjs().format('YYYY'))
	const year = ref(props.currentyear)
	const seasons = computed(() => {
		{
			let temp = []
			for (let yr = props.startyear; yr <= thisyear + 1; yr++) {
				temp.push({
					year: yr,
					season: yr + ' Fall  -> ' + (yr + 1) + ' Spring',
				})
			}
			return temp
		}
	})

	//
	// Watch for dropdown value change
	//
	watch(year, () => emit('submitted', year.value))
</script>

<style lang="scss" scoped>
	.p-dropdown {
		width: 20rem;
	}
	@media screen and (max-width: 640px) {
		.p-treeselect {
			width: 100%;
		}
	}
</style>
