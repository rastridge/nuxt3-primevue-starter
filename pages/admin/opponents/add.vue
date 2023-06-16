<template>
	<div class="edit">
		<admin-header title="Opponent Add" />
		<p
			v-if="submitStatus === 'ERROR'"
			:class="{ error: submitStatus === 'ERROR' }"
		>
			Please fill the form correctly.
		</p>
		<form class="form-horizontal">
			<div class="form-group">
				<div class="col-sm-offset-2 col-sm-4">
					<submit-cancel :submitstatus="submitStatus" @dispose="dispose" />
				</div>
			</div>

			<!-- Page opponent_name input-->
			<div class="form-group">
				<label class="col-sm-4 control-label" for="opponent_name"
					>Opponent Name:
				</label>
				<div class="col-sm-6">
					<input
						id="opponent_name"
						v-model.trim="formItems.opponent_name"
						type="text"
						class="form-control"
						autofocus
						@input="setName($event.target.value)"
					/>
					<span v-if="!$v.formItems.opponent_name.required" class="error"
						>Opponent Name Field is required</span
					>
				</div>
			</div>

			<div class="form-group">
				<label class="col-sm-4 control-label" for="opponent_location"
					>Opponent Location:
				</label>
				<div class="col-sm-4">
					<input
						id="opponent_location"
						v-model.trim="formItems.opponent_location"
						type="text"
						class="form-control"
						@input="setLocation($event.target.value)"
					/>
					<span v-if="!$v.formItems.opponent_location.required" class="error"
						>Opponent Location Field is required</span
					>
				</div>
			</div>

			<div class="form-group">
				<label class="col-sm-4 control-label" for="opponent_type"
					>Opponent Type:
				</label>
				<div class="col-sm-4">
					<b-form-select
						v-model="formItems.opponent_type"
						class="form-control"
						@change="setType($event)"
					>
						<option v-for="cat in types" :key="cat.text" :value="cat.value">
							{{ cat.text }}
						</option>
					</b-form-select>
					<span v-if="!$v.formItems.opponent_type.required" class="error"
						>Opponent Type is required
					</span>
				</div>
			</div>

			<div class="form-group">
				<label class="col-sm-4 control-label" for="opponent_level"
					>Opponent Level:
				</label>
				<div class="col-sm-4">
					<b-form-select
						v-model="formItems.opponent_level"
						class="form-control"
						@change="setLevel($event)"
					>
						<option v-for="cat in levels" :key="cat.text" :value="cat.value">
							{{ cat.text }}
						</option>
					</b-form-select>
					<span v-if="!$v.formItems.opponent_level.required" class="error"
						>Opponent Level is required
					</span>
				</div>
			</div>

			<div class="form-group">
				<label class="col-sm-4 control-label" for="opponent_description"
					>Opponent Description:
				</label>
				<div class="col-sm-6">
					<input
						id="opponent_description"
						v-model="formItems.opponent_description"
						type="textarea"
						class="form-control"
						@input="setDescription($event.target.value)"
					/>
				</div>
			</div>

			<div class="form-group">
				<div class="col-sm-offset-2 col-sm-4">
					<submit-cancel :submitstatus="submitStatus" @dispose="dispose" />
				</div>
			</div>
		</form>
		<p
			v-if="submitStatus === 'ERROR'"
			:class="{ error: submitStatus === 'ERROR' }"
		>
			Please fill the form correctly.
		</p>
		<p v-if="submitStatus === 'PENDING'">Submitted...</p>
	</div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import AdminHeader from '@/components/presentation/AdminHeader'
import SubmitCancel from '@/components/selectors/SubmitCancel'
import { opponentsService } from '@/services'

export default {
	components: {
		AdminHeader,
		SubmitCancel,
	},
	mixins: [validationMixin],
	layout: 'admin',
	data() {
		return {
			formItems: {
				opponent_name: '',
				opponent_location: '',
				opponent_type: '',
				opponent_level: '',
				opponent_description: '',
			},
			levels: [
				{ text: 'First Side', value: 'A' },
				{ text: 'Second Side', value: 'B' },
				{ text: 'Third  Side', value: 'C' },
			],
			types: [
				{ text: 'Men', value: 'men' },
				{ text: 'College', value: 'college' },
				{ text: 'Old Boys', value: 'oldboys' },
			],
			error: '',
			submitStatus: 'Ok',
		}
	},
	validations: {
		formItems: {
			opponent_name: {
				required,
			},
			opponent_location: {
				required,
			},
			opponent_type: {
				required,
			},
			opponent_level: {
				required,
			},
		},
	},
	methods: {
		dispose(e) {
			if (e === 'submit') {
				this.handleSubmit()
			} else if (e === 'cancel') {
				this.returnToList()
			}
		},
		returnToList() {
			this.$router.push('/admin/opponents')
		},
		setName(value) {
			this.formItems.opponent_name = value
			this.$v.formItems.opponent_name.$touch()
		},
		setLocation(value) {
			this.formItems.opponent_location = value
			this.$v.formItems.opponent_location.$touch()
		},
		setType(value) {
			this.formItems.opponent_type = value
			this.$v.formItems.opponent_type.$touch()
		},
		setLevel(value) {
			this.formItems.opponent_level = value
			this.$v.formItems.opponent_level.$touch()
		},
		setDescription(value) {
			this.formItems.opponent_description = value
		},
		handleSubmit(e) {
			this.submitStatus = ''
			this.$v.$touch()
			if (this.$v.$invalid) {
				this.submitStatus = 'ERROR'
			} else {
				this.submitStatus = 'PENDING'
				opponentsService.addOne(this.formItems).then((content) => {
					if (!content.error) {
						this.returnToList()
					} else {
						this.submitStatus = 'ERROR'
						this.error = content.error
					}
				})
			}
		},
	},
}
</script>
