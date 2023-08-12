<template>
	<div>
		<Dropdown
			v-model="gametype"
			:options="gametypes"
			optionLabel="label"
			optionValue="value"
			placeholder="Select Game Type"
			:pt="{
				root: { class: 'w-full md:w-8rem' },
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
		currenttype: {
			type: Number,
			required: true,
		},
	})
	const gametype = ref(props.currenttype)

	//
	// Outgoing
	//
	const emit = defineEmits(['submitted'])

	//
	// Info for dropdown
	//
	const gametypes = [
		{ label: '15s', value: 1 },
		{ label: '7s', value: 7 },
	]
	//
	// Watch for dropdown value change
	//
	watch(gametype, () => emit('submitted', gametype.value))
</script>
