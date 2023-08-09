<template>
	<div>
		<p v-if="!state"><ProgressSpinner /> Loading</p>

		<div v-else>
			<FormKit
				type="form"
				:config="{ validationVisibility: 'live' }"
				v-model="state"
				submit-label="Submit Game"
				@submit="submitForm(state)"
			>
				<!-- opponent input-->
				<div v-if="!props.id">
					<Card style="width: 30em; margin-bottom: 1rem">
						<template #title> Find opponent</template>
						<template #content>
							<AutoComplete
								v-model="selectedOpponent"
								optionLabel="opponent_name"
								:suggestions="filteredOpponents"
								@complete="search_opponents"
								@item-select="setOpponent"
							/>
							<br />
							<p>
								If the opponent for this game can not be found in the existing
								opponents list, you must first create the opponent<br />
								<Button
									class="p-button-sm"
									label="Create Opponent"
									@click="navigateTo('/admin/opponents/add')"
								>
								</Button>
							</p>
						</template>
					</Card>
				</div>
				<FormKit label="Opponent" name="opponent_name" type="text" disabled />

				<!-- referee input-->
				<FormKit label="Referee" name="referee" type="text" />
				<!-- venue input-->
				<FormKit label="Venue" name="venue" type="text" validation="required" />

				<!-- Date input-->
				<FormKit type="date" label="Date" name="date" validation="required" />

				<!-- Time input-->
				<FormKit type="time" label="Time" name="time" validation="required" />

				<!-- Game Type input-->
				<FormKit
					type="select"
					label="Game type"
					placeholder="Select game type"
					name="game_type_id"
					:options="gametypes"
					validation="required"
				/>

				<!-- Game Level input-->
				<FormKit
					type="select"
					label="Game level"
					placeholder="Select game level"
					name="game_level"
					:options="[
						{ label: 'A', value: 'A' },
						{ label: 'B', value: 'B' },
						{ label: 'C', value: 'C' },
						{ label: 'D', value: 'D' },
					]"
					validation="required"
				/>
				<!-- Comment input-->
				<FormKit label="Comment" name="comment" type="text" />

				<!-- occasion input-->
				<FormKit label="Occasion" name="occasion" type="text" />

				<!-- points for input-->
				<FormKit label="Pts For" name="ptsFor" type="text" />

				<!-- points against input-->
				<FormKit label="Pts against" name="ptsAgn" type="text" />
			</FormKit>

			<p v-if="saving" class="text-2xl"><ProgressSpinner /> Saving ...</p>

			<Button label="Cancel" @click.prevent="cancelForm()" style="margin: 1rem">
			</Button>

			<div v-if="props.id === 0 || $dayjs().isBefore(dayjs(state.date))">
				<!-- Select previous game for autofill -->
				<label for="reset"
					><div>
						Do you want to select roster from a previous game? All current game
						info will be replaced.
						<p v-if="!state.date" style="color: red">
							To do so you must first set a date for this game
						</p>
					</div>
				</label>

				<div v-if="state.date">
					Check here
					<input
						id="reset"
						v-model="reset"
						type="checkbox"
						@input="resetPlayers()"
					/>
					<p style="color: red">
						Selecting another roster will replace existing players on this
						roster!
					</p>
					<div v-if="reset">
						<FormKit
							type="select"
							label="Select another roster"
							v-model="previous_game_id"
							placeholder="Select another roster"
							:options="previousgames"
						/>
					</div>
				</div>
			</div>

			<!-- ------------ players table ------------------------- -->
			<table
				v-if="players"
				style="white-space: nowrap; width: 100%; border-style: none"
			>
				<tr>
					<th>Pos</th>
					<th>Player</th>
					<th>Tries</th>
					<th>Assts</th>
					<th>Conv</th>
					<th>PenK</th>
					<th>DrpG</th>
					<th>Yel</th>
					<th>Red</th>
					<th>Replaced by</th>
				</tr>
				<tbody>
					<tr v-for="(item, index) in players" :key="item.position_id">
						<td>
							{{ players[index].position_id }}
						</td>
						<td>
							<AutoComplete
								v-model="selectedPlayers[index]"
								optionLabel="title"
								:suggestions="filteredNames"
								@complete="search"
							/>
						</td>
						<td>
							<input v-model="players[index].tries" size="1" type="text" />
						</td>
						<td>
							<input v-model="players[index].assists" size="1" type="text" />
						</td>
						<td style="width: 1rem">
							<input v-model="players[index].conv" size="1" type="text" />
						</td>
						<td>
							<input v-model="players[index].penk" size="1" type="text" />
						</td>
						<td>
							<input v-model="players[index].dgoal" size="1" type="text" />
						</td>
						<td>
							<input v-model="players[index].yellow" size="1" type="text" />
						</td>
						<td>
							<input v-model="players[index].red" size="1" type="text" />
						</td>
						<td>
							<AutoComplete
								v-model="selectedReplacements[index]"
								optionLabel="title"
								:suggestions="filteredNames"
								@complete="search"
							/>
						</td>
					</tr>
				</tbody>
			</table>
			<!-- Confirm deletion -->
			<Dialog
				v-model:visible="showReplaceDialog"
				:style="{ width: '450px' }"
				header="Confirm replacement"
				:modal="true"
			>
				<div class="confirmation-content">
					<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
					<span>Are you sure you want to replace this roster?</span>
				</div>

				<template #footer>
					<Button
						label="No"
						icon="pi pi-times"
						class="p-button-text"
						@click="showReplaceDialog = false"
					/>
					<Button
						label="Yes"
						icon="pi pi-check"
						class="p-button-text"
						@click="confirmedReplace(previous_game_id)"
					/>
				</template>
			</Dialog>
		</div>
	</div>
</template>

<script setup>
	import dayjs from 'dayjs'

	import { useAuthStore } from '~/stores/authStore'
	const auth = useAuthStore()
	const { $dayjs } = useNuxtApp()
	const saving = ref(false)
	//
	// Outgoing
	//
	const emit = defineEmits(['submitted'])
	//
	// Incoming
	//
	const props = defineProps({
		id: { Number, default: 0 },
	})

	// Reactive variables
	const showReplaceDialog = ref(false)
	const gametypes = ref([])
	const players = ref([])
	let state = ref({})
	const reset = ref('')

	//
	// Player name autocomplete
	//
	const selectedPlayers = ref([])
	const selectedReplacements = ref([])
	const filteredNames = ref([])
	const suggestions = ref([])
	const search = (event) => {
		if (!event.query.trim().length) {
			filteredNames.value = [...suggestions.value]
		} else {
			filteredNames.value = suggestions.value.filter((suggestion) => {
				return suggestion.title
					.toLowerCase()
					.startsWith(event.query.toLowerCase())
				// .includes(event.query.toLowerCase())
			})
		}
	}

	//
	// Opponent name autocomplete
	//
	const suggestions_opponents = ref([])
	const filteredOpponents = ref([])
	const selectedOpponent = ref('')
	const setOpponent = () => {
		state.value.opponent_id = selectedOpponent.value.opponent_id
		state.value.opponent_name = selectedOpponent.value.opponent_name
	}
	const search_opponents = (event) => {
		if (!event.query.trim().length) {
			filteredOpponents.value = [...suggestions_opponents.value]
		} else {
			filteredOpponents.value = suggestions_opponents.value.filter(
				(suggestion) => {
					return suggestion.opponent_name
						.toLowerCase()
						.startsWith(event.query.toLowerCase())
					// .includes(event.query.toLowerCase())
				}
			)
		}
	}

	//
	// Get other options for form
	//

	// Game types
	const {
		data: gt,
		error: error3,
		pending: pending3,
	} = await useFetch(`/game_player_stats/getgametypes`, {
		method: 'get',
		headers: {
			authorization: auth.user.token,
		},
	})
	// convert for formkit
	let result = []
	gt.value.map((old) => {
		let n = {}
		n.label = old.game_type
		n.value = old.game_type_id
		result.push(n)
	})
	gametypes.value = result

	// player names suggestions
	const {
		data: sug,
		error: error4,
		pending: pending4,
	} = await useFetch(`/accounts/suggestions`, {
		method: 'get',
		headers: {
			authorization: auth.user.token,
		},
	})
	suggestions.value = sug.value

	//
	//
	// edit if there is an id
	//
	if (props.id !== 0) {
		//
		// Initialize Edit form game area
		//
		const {
			data: g,
			error,
			pending: pending_game,
		} = await useFetch(`/game_player_stats/${props.id}`, {
			method: 'get',
			headers: {
				authorization: auth.user.token,
			},
		})
		state.value = g.value

		// Adjustments
		// why?
		const d = $dayjs(g.value.date)
		state.value.date = d.format('YYYY-MM-DD')
		state.value.time = d.format('HH:mm:ss')

		// needs to be carried over because its not used in the form
		state.value.opponent_id = g.value.opponent_id

		//
		// Initialize Edit form Players area
		//
		const {
			data: p,
			error: error2,
			pending: pending_players,
		} = await useFetch(`/game_player_stats/players/${props.id}`, {
			method: 'get',
			headers: {
				authorization: auth.user.token,
			},
		})
		players.value = p.value

		// Special for Primevue AutoComplete
		players.value.forEach((value, index) => {
			selectedPlayers.value.push({
				account_id: value.player_id ? value.player_id : '0',
				member_firstname: value.pfn ? value.pfn : '',
				member_lastname: value.pln ? value.pln : '',
				title: value.pname ? value.pname : '',
			})
			selectedReplacements.value.push({
				account_id: value.replaced_by,
				member_firstname: value.rfn,
				member_lastname: value.rln,
				title: value.rname ? value.rname : '',
			})
		})
	} else {
		// add
		//
		// opponent names suggestions
		//
		const {
			data: opps_sug,
			error: error5,
			pending: pending5,
		} = await useFetch(`/opponents/suggestions`, {
			method: 'get',
			headers: {
				authorization: auth.user.token,
			},
		})
		suggestions_opponents.value = opps_sug.value

		//
		// initialize blank Add form
		//
		// game
		state.value.opponent_id = ''
		state.value.referee = ''
		state.value.venue = ''
		state.value.comment = ''
		state.value.occasion = ''
		state.value.ptsFor = ''
		state.value.ptsAgn = ''

		// players
		for (let i = 0; i < 23; i++) {
			players.value.push({
				position_id: i + 1,
				player_id: '',
				pname: '',
				pfn: '',
				pln: '',
				replaced_by: '0',
				rname: '',
				rfn: '',
				rln: '',
				tries: '0',
				assists: '0',
				conv: '0',
				penk: '0',
				dgoal: '0',
				yellow: '0',
				red: '0',
			})
			// for Primevue autocomplete
			selectedPlayers.value.push({
				account_id: '',
				title: '',
				member_firstname: '',
				member_lastname: '',
			})
			selectedReplacements.value.push({
				account_id: '',
				title: '',
				member_firstname: '',
				member_lastname: '',
			})
		}
	}

	//
	// Replace Players
	//
	const previousgames = ref([])
	const previous_game_id = ref(0)
	const getPreviousGames = async (date) => {
		const {
			data,
			error: error6,
			pending: pending6,
		} = await useFetch(`/game_player_stats/getprevious/${date}`, {
			method: 'get',
			headers: {
				authorization: auth.user.token,
			},
		})
		// convert for formkit select
		let result = []
		data.value.map((old) => {
			let n = {}
			n.label =
				old.opponent_name +
				' Game level ' +
				old.game_level +
				' Date ' +
				$dayjs(date).format('YYYY-MM-DD')
			n.value = old.game_id
			result.push(n)
		})
		previousgames.value = result
	}

	//
	// insert players from previous game
	//
	const resetPlayers = () => {
		reset.value = !reset.value
		if (reset.value) {
			getPreviousGames($dayjs(state.value.date).format('YYYY-MM-DD'))
		}
	}
	const confirmedReplace = (newid) => {
		showReplaceDialog.value = false
		getReplacePlayers(newid)
	}

	watch(previous_game_id, (newid, oldid) => {
		showReplaceDialog.value = true
	})

	const getReplacePlayers = async (game_id) => {
		const {
			data: rp,
			error,
			pending,
		} = await useFetch(`/game_player_stats/players/${game_id}`, {
			method: 'get',
			headers: {
				authorization: auth.user.token,
			},
		})
		// Needed to reset player stats
		const replacementPlayers = rp.value.map((item) => {
			const plr = {}
			plr.position_id = item.position_id
			plr.player_id = item.player_id
			plr.pname = item.pname
			plr.rname = ''
			plr.replaced_by = '0'
			plr.tries = '0'
			plr.assists = '0'
			plr.conv = '0'
			plr.penk = '0'
			plr.dgoal = '0'
			plr.yellow = '0'
			plr.red = '0'
			return plr
		})

		selectedPlayers.value = []
		selectedReplacements.value = []
		replacementPlayers.forEach((value, index) => {
			// adjustment for AutoCompletes
			selectedPlayers.value.push({
				account_id: value.player_id ? value.player_id : '0',
				member_firstname: value.pfn ? value.pfn : '',
				member_lastname: value.pln ? value.pln : '',
				title: value.pname ? value.pname : '',
			})
			selectedReplacements.value.push({
				account_id: value.replaced_by,
				member_firstname: value.rfn,
				member_lastname: value.rln,
				title: value.rname ? value.rname : '',
			})
		})
		players.value = replacementPlayers
	}

	//
	// form handlers
	//
	const submitForm = (state) => {
		selectedPlayers.value.forEach((value, index, array) => {
			players.value[index].player_id = value.account_id
			players.value[index].pfn = value.member_firstname
			players.value[index].pln = value.member_lastname
			players.value[index].pname = value.title
		})
		selectedReplacements.value.forEach((value, index, array) => {
			players.value[index].replaced_by = value.account_id
			players.value[index].rfn = value.member_firstname
			players.value[index].rln = value.member_lastname
			players.value[index].rname = value.title
		})

		state.players = players.value
		state.date = state.date + 'T' + state.time + ':00.000Z'

		saving.value = true
		emit('submitted', state)
	}
	const cancelForm = () => {
		navigateTo('/admin/game_player_stats') // needs to be / for self register
	}
</script>

<!-- <style>
	.p-inputtext {
		color: var(--text-color);
	}
</style>
 -->
