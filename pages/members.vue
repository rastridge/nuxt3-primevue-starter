<template>
	<div>
		<Common-header title="Membership" />
		<div class="card">
			<DataTable
				v-model:expandedRows="expandedRows"
				:value="members"
				dataKey="account_id"
				v-model:filters="filters"
				:globalFilterFields="['member_type']"
				:class="'p-datatable-sm'"
				tableStyle="width: 40rem; font-family: Lora"
				filterDisplay="row"
				paginator
				:rows="20"
				:rowsPerPageOptions="[5, 10, 20, 50]"
				paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
				currentPageReportTemplate="{first} to {last} of {totalRecords}"
				@rowExpand="onRowExpand"
			>
				<template #empty> No members found. </template>
				<template #loading> Loading Membership data. Please wait. </template>
				<Column header="Expand" expander style="width: 5rem" />
				<Column
					header="Name"
					field="name"
					:showFilterMenu="false"
					style="width: 20rem"
				>
					<template #body="{ data }">
						{{ data.member_firstname }} {{ data.member_lastname }}
					</template>
					<template #filter="{ filterModel, filterCallback }">
						<InputText
							v-model="filterModel.value"
							type="text"
							@input="filterCallback()"
							class="p-column-filter"
							placeholder="Search by name"
						/>
					</template>
				</Column>
				<Column
					field="member_year"
					header="Year Joined"
					:showFilterMenu="false"
					sortable
					style="width: 20rem"
				>
					<template #filter="{ filterModel, filterCallback }">
						<InputText
							v-model="filterModel.value"
							type="text"
							@input="filterCallback()"
							class="p-column-filter"
							placeholder="Search by year"
						/>
					</template>
				</Column>
				<Column
					field="member_type"
					header="Member Type"
					:showFilterMenu="false"
				>
					<template #filter="{ filterModel, filterCallback }">
						<Dropdown
							v-model="filterModel.value"
							@change="filterCallback()"
							:options="member_types"
							placeholder="Search by member type"
							:showClear="true"
							style="width: 10rem"
						>
						</Dropdown> </template
				></Column>
				<template #expansion="slotProps">
					<div class="p-3">
						<table>
							<tr>
								<th>Previous club</th>
								<th>Position</th>
								<th>15s Games Recorded</th>
								<th>7s Games Recorded</th>
								<th>WOF Year</th>
							</tr>
							<tr>
								<td>
									{{ slotProps.data.member_prev_club }}
								</td>
								<td>
									{{ slotProps.data.member_position }}
								</td>
								<td>
									{{ gamecount }}
								</td>
								<td>
									{{ gamecount7s }}
								</td>
								<td>
									{{ slotProps.data.member_wall_of_fame_year }}
								</td>
							</tr>
						</table>
					</div>
				</template>
			</DataTable>
		</div>
	</div>
</template>

<script setup>
	import { FilterMatchMode } from 'primevue/api'
	const expandedRows = ref([])
	const gamecount = ref(0)
	const gamecount7s = ref(0)
	//
	// Get current news
	//
	const {
		data: members,
		pending,
		error,
		refresh,
	} = await useFetch('/accounts/getshow', {
		method: 'get',
		headers: {
			authorization: 'not-needed',
		},
	})

	const onRowExpand = async (event) => {
		//
		// Get gaemcount
		//
		const { data: gmcnt } = await useFetch(
			`/game_player_stats/getgamecount/?gametype=1&account_id=${event.data.account_id}`,
			{
				method: 'get',
				headers: {
					authorization: 'not-needed',
				},
			}
		)
		gamecount.value = gmcnt.value
		// toast.add({ severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000 });

		const { data: gmcnt7s } = await useFetch(
			`/game_player_stats/getgamecount/?gametype=7&account_id=${event.data.account_id}`,
			{
				method: 'get',
				headers: {
					authorization: 'not-needed',
				},
			}
		)
		gamecount7s.value = gmcnt7s.value
	}
	//
	// filter value criteria
	//
	const filters = ref({
		name: { value: null, matchMode: FilterMatchMode.CONTAINS },
		member_type: { value: null, matchMode: FilterMatchMode.EQUALS },
		member_year: { value: null, matchMode: FilterMatchMode.EQUALS },
	})

	const member_types = ref([
		'Alumni',
		'Active',
		'Other',
		'Ad_Astra',
		'Development',
		'Special',
		'Sponsor',
		'Flag',
		'Flag Pending',
	])
	const loading = ref(true)
</script>
