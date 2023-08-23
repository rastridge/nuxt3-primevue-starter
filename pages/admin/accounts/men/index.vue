<template>
	<div>
		<Head>
			<Title>Accounts List</Title>
		</Head>
		<admin-header :title="app" />
		<p v-if="pending"><ProgressSpinner /> Loading ...</p>

		<div class="text-center mb-2">
			<Dropdown
				v-model="member_type_id"
				:options="memberTypeOptions"
				optionLabel="label"
				optionValue="value"
				placeholder="Select a member type"
			/>
		</div>
		<div class="text-center mb-2">
			<FormKit
				v-model="alpha"
				type="select"
				label="Last name begins with"
				:options="alphas"
			/>
		</div>
		<div v-if="pending" class="text-center text-2xl">Loading ...</div>
		<div v-else>
			<render-list
				:data="filteredData"
				:app="app"
				:statusable="statusable"
				:editable="editable"
				:deleteable="deleteable"
				:addable="addable"
				:viewable="viewable"
				@changeStatus="changeStatus"
				@deleteItem="deleteItem"
			/>
		</div>
	</div>
</template>

<script setup>
	import { usePlacemarkStore } from '@/stores'
	import { useAlertStore } from '~/stores/alertStore'
	const alert = useAlertStore()
	const placemark = usePlacemarkStore()
	const { getAll, deleteOne, changeStatusOne } = useFetchAll()
	const { getMemberTypeOptions } = useMembertypes()

	//
	// initial testing values
	//
	const alpha = ref(placemark.getAlpha)
	const member_type_id = ref(placemark.getMemberTypeId)
	//
	// Initialize values for Renderlist
	//
	const { getAccess } = useRenderListAccess()
	const app = 'accounts/men'
	const { editable, addable, deleteable, statusable, viewable } = getAccess(app)

	//
	// Get all accounts
	//
	const { data: accounts, pending } = await getAll('accounts')

	//
	// Filter members
	//
	const filteredData = computed(() => {
		let temp = []
		// by member type
		temp = accounts.value.filter(function (d) {
			return (
				d.member_type_id === member_type_id.value ||
				d.member_type2_id === member_type_id.value
			)
		})
		//by initial letter
		if (alpha.value !== '1') {
			return temp.filter(function (d) {
				return d.member_lastname[0].toUpperCase() === alpha.value
			})
		}
		return temp
	})

	watch(member_type_id, (newid) => {
		placemark.setMemberTypeId(newid)
	})
	watch(alpha, (newalpha) => {
		placemark.setAlpha(newalpha)
	})
	//
	// Get membertype opyions
	//

	const memberTypeOptions = await getMemberTypeOptions()

	const alphas = {
		1: 'All',
		A: 'A',
		B: 'B',
		C: 'C',
		D: 'D',
		E: 'E',
		F: 'F',
		G: 'G',
		H: 'H',
		I: 'I',
		J: 'J',
		K: 'K',
		L: 'L',
		M: 'M',
		N: 'N',
		O: 'O',
		P: 'P',
		Q: 'Q',
		R: 'R',
		S: 'S',
		T: 'T',
		U: 'U',
		V: 'V',
		W: 'W',
		X: 'X',
		Y: 'Y',
		Z: 'Z',
	}

	//
	// Renderlist actions
	//
	const deleteItem = async (id) => {
		await deleteOne('accounts', id)
	}

	const changeStatus = async ({ id, status }) => {
		await changeStatusOne('accounts', { id, status })
	}
</script>
