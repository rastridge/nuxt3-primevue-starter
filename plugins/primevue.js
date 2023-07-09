import PrimeVue from 'primevue/config'
import AutoComplete from 'primevue/autocomplete'
import Button from 'primevue/button'
import Card from 'primevue/card'
import DataTable from 'primevue/datatable'
import Dialog from 'primevue/dialog'
import Dropdown from 'primevue/dropdown'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup' // optional
import Row from 'primevue/row' // optional
import InputText from 'primevue/inputtext'
import OverlayPanel from 'primevue/overlaypanel'
import ProgressSpinner from 'primevue/progressspinner'
import RadioButton from 'primevue/radiobutton'
import Textarea from 'primevue/textarea'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(PrimeVue, { ripple: true })
	nuxtApp.vueApp.use(ToastService)
	nuxtApp.vueApp.component('AutoComplete', AutoComplete)
	nuxtApp.vueApp.component('Button', Button)
	nuxtApp.vueApp.component('Button', Button)
	nuxtApp.vueApp.component('Card', Card)
	nuxtApp.vueApp.component('Column', Column)
	nuxtApp.vueApp.component('DataTable', DataTable)
	nuxtApp.vueApp.component('Dialog', Dialog)
	nuxtApp.vueApp.component('Dropdown', Dropdown)
	nuxtApp.vueApp.component('InputText', InputText)
	nuxtApp.vueApp.component('OverlayPanel', OverlayPanel)
	nuxtApp.vueApp.component('ProgressSpinner', ProgressSpinner)
	nuxtApp.vueApp.component('RadioButton', RadioButton)
	nuxtApp.vueApp.component('Textarea', Textarea)
	nuxtApp.vueApp.component('Toast', Toast)
	//other components that you need
})
