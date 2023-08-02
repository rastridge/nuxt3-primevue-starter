<template>
	<div id="events">
		<div class="center-content">
			<common-header title="Officers" />
		</div>
		<div>
			<DataTable
				:value="officers"
				class="p-datatable-sm"
				tableStyle="min-width: 50rem"
			>
				<Column field="title" header=""></Column>
				<Column field="office" header="Office 1"></Column>
				<Column field="office2" header="Office 2"></Column>
				<Column field="account_email" header="Email">
					<template #body="slotProps">
						<div style="width: 5rem">
							<expose-email :email="slotProps.data.account_email" />
						</div>
					</template>
				</Column>
			</DataTable>
		</div>
	</div>
</template>

<script setup>
	//
	// Get current news
	//
	const {
		data: officers,
		pending,
		error,
		refresh,
	} = await useFetch('/accounts/getofficers', {
		method: 'get',
		headers: {
			authorization: 'not-needed',
		},
	})
</script>
