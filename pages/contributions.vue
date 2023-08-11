<template>
	<div id="contributions">
		<div class="center-content">
			<common-header title="Contributions" />
			<!-- Paypal-->
			<form action="https://www.paypal.com/donate" method="post" target="_top">
				<input type="hidden" name="hosted_button_id" value="EH2TSRTGPZVPY" />
				<input
					type="image"
					src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif"
					border="0"
					name="submit"
					title="PayPal - The safer, easier way to pay online!"
					alt="Donate with PayPal button"
				/>
				<img
					alt=""
					border="0"
					src="https://www.paypal.com/en_US/i/scr/pixel.gif"
					width="1"
					height="1"
				/>
			</form>

			<!-- ------------ yearly contributions --------------------------->
			<div class="text-center m-5">
				<select-year
					:startyear="startyear"
					:currentyear="year"
					@submitted="onSubmit"
					class="mb-3"
				/>
			</div>
			<!-- <div v-if="contributions.length < 1"> -->
			<div class="card">
				<DataTable
					:value="contributions"
					class="p-datatable-sm"
					tableStyle="min-width: 50rem"
					scrollable
					scrollHeight="400px"
					dataKey="contribution_id"
					:loading="loading"
				>
					<template #empty> No contributions found for this year </template>
					<template #loading>
						Loading contributions data. Please wait.
					</template>

					<Column
						field="contribution_date"
						header="Date"
						style="white-space: nowrap"
					>
						<template #body="slotProps">
							<div>
								{{ $dayjs(slotProps.data.contribution_date).format('ll') }}
							</div>
						</template>
					</Column>
					<Column field="member_lastname" header="Contributor" frozen>
						<template #body="slotProps">
							<div>
								{{
									slotProps.data.contribution_showName
										? slotProps.data.member_firstname +
										  ' ' +
										  slotProps.data.member_lastname
										: 'Anonymous'
								}}
							</div>
						</template>
					</Column>
					<Column field="year_joined" header="Joined">
						<template #body="slotProps">
							<div>
								{{
									slotProps.data.year_joined != 0
										? slotProps.data.year_joined
										: ''
								}}
							</div>
						</template>
					</Column>
					<Column field="contribution_amount" header="Amount">
						<template #body="slotProps">
							<div>
								{{
									slotProps.data.contribution_showAmount
										? slotProps.data.contribution_amount
										: ''
								}}
							</div>
						</template>
					</Column>
					<Column field="contribution_comment" header="Comment">{{
						slotProps.data.contribution_comment
					}}</Column>
				</DataTable>
			</div>
		</div>
	</div>
</template>

<script setup>
	const { $dayjs } = useNuxtApp()

	//
	// Get year contributions
	//
	const getYearContributiions = async (year) => {
		const { data, pending, error, refresh } = await useFetch(
			`/contributions/year/${year}`,
			{
				method: 'get',
				headers: {
					authorization: 'not-needed',
				},
			}
		)
		contributions.value = data.value
	}

	// initial values
	const year = ref(2023)
	const contributions = ref([])
	contributions.value = getYearContributiions(year.value)

	//
	// Select year action
	//
	const startyear = 2010
	// get year contributions
	const onSubmit = (value) => {
		year.value = value
		contributions.value = getYearContributiions(year.value)
	}
</script>
