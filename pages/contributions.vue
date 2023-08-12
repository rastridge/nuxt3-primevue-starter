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
					tableStyle="width: 400px"
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
					<Column
						field="member_lastname"
						header="Contributor"
						frozen
						style="white-space: nowrap"
					>
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
					<Column
						field="contribution_comment"
						header="Comment"
						style="white-space: nowrap"
						>{{ slotProps.data.contribution_comment }}</Column
					>
				</DataTable>
			</div>
			<div class="card w-full">
				<h4>The Need</h4>
				<p>
					We need a committed active playing membership of about 50 to be
					successful. The Club is actively welcoming players from local
					colleges, from the local high school programs as well as walk-ons.
					Most of the new recruits are younger, seeking jobs or under-employed.
					Paying the $300 annual dues and travel expenses to away games is a
					difficult prospect for many of the kids.
				</p>
				<p>
					Over the last two years the Alumni Scholarship Program has helped
					about 8 players per year with the expenses of playing top level rugby.
					Under-employed and unemployed players were invited to sign contracts
					which promise they will pay half their annual dues up front, work as
					needed at club functions and attend practices regularly. At the end of
					the season, if the conditions are met the club submits a bill to the
					alumni fund for amount of the second dues installment and a percentage
					of the travel expenses (van rental, room, gas, etc). Approximately
					$6000 alumni dollars have be spent supporting this Program over the
					last three years.
				</p>
				<hr />
				<p>
					Buffalo Rugby Club Old Boys Alumni Fund<br />
					The Buffalo Rugby Club is a Tax Exempt 501c3 Organization. Your
					contributions are tax deductible.<br />
					&nbsp;
				</p>
			</div>
			<div class="card" style="width: 400px">
				<h3>Top Contributors</h3>
				<DataTable
					:value="topcontributors"
					class="p-datatable-sm"
					tableStyle="width: 320px"
					scrollable
					scrollHeight="400px"
					dataKey="contribution_id"
				>
					<template #empty> No contributions found for this year </template>
					<template #loading>
						Loading contributions data. Please wait.
					</template>

					<Column field="Name" header="Contributor" frozen>
						<template #body="slotProps">
							<div>
								{{
									slotProps.data.showName ? slotProps.data.Name : 'Anonymous'
								}}
							</div>
						</template>
					</Column>
					<Column field="Total" header="" frozen>
						<template #body="slotProps">
							<div>${{ slotProps.data.Total }}</div>
						</template>
					</Column>
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

	const getTopContributors = async () => {
		const { data, pending, error, refresh } = await useFetch(
			`/contributions/top`,
			{
				method: 'get',
				headers: {
					authorization: 'not-needed',
				},
			}
		)
		topcontributors.value = data.value
	}

	// topcontributors values
	const topcontributors = ref([])
	topcontributors.value = getTopContributors()

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
