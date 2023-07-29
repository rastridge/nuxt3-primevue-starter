import { allCountries } from 'country-region-data'

export default function useLocations() {
	function getCountries() {
		let countries = []
		for (let i = 0; i < allCountries.length; i++) {
			let n = {}
			n.label = allCountries[i][0]
			n.value = allCountries[i][1]
			countries.push(n)
		}
		return countries
	}

	// get regions for country
	function setRegions(countrycode) {
		let regions = []
		for (let i = 0; i < allCountries.length; i++) {
			if (allCountries[i][1] === countrycode) {
				// format justRegions for Formkit
				regions = []
				for (let k = 0; k < allCountries[i][2].length; k++) {
					let n = {}
					n.label = allCountries[i][2][k][0]
					n.value = allCountries[i][2][k][1]
					regions.push(n)
				}
				break
			}
		}
		return regions
	}
	return { getCountries, setRegions }
}
