<template>
	<div>
		<Dropdown
			v-model="year"
			:options="seasons"
			optionLabel="season"
			optionValue="year"
			placeholder="Select a Different Season"
		/>
	</div>
</template>

<script setup>
	import Dropdown from 'primevue/dropdown'
	//
	// Incoming
	//
	const props = defineProps({
		startyear: {
			type: Number,
			required: true,
		},
	})

	//
	// Info for dropdown
	//
	const { $dayjs } = useNuxtApp()
	const thisyear = parseInt($dayjs().format('YYYY'))
	const year = ref(parseInt($dayjs().format('YYYY')))
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

	// this.$store.commit('pagination/saveyear', value)
	// this.$store.commit('pagination/savepage', '1')

	//
	// Outgoing
	//
	const emit = defineEmits(['submitted'])
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
