<template>
	<div>
		<Dropdown
			v-model="year"
			:options="years"
			optionLabel="label"
			optionValue="value"
			placeholder="Select a Different Year"
			:pt="{
				root: { class: 'w-full md:w-14rem' },
				item: { class: 'text-xl' },
				input: { class: 'md:text-xl  font-semibold' },
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
