export default function useGames() {
	function getGameLevelCode(stat) {
		const { $dayjs } = useNuxtApp()

		const Year = parseInt($dayjs(stat.date).format('YYYY'))
		let level = ''
		if (stat.game_type_id === 1 || stat.game_type_id === 2) {
			if (Year === 2007 || Year === 2008 || Year === 2009 || Year === 2011) {
				if (stat.game_level === 'A') {
					level = 'D1'
				} else if (stat.game_level === 'B') {
					level = 'D3'
				}
			} else if (Year === 2012) {
				if (stat.game_level === 'A') {
					level = 'D1'
				} else if (stat.game_level === 'B') {
					level = 'D2'
				}
			} else if (
				Year === 2010 ||
				Year === 2013 ||
				Year === 2014 ||
				Year === 2015 ||
				Year === 2016 ||
				Year === 2017 ||
				Year === 2018 ||
				Year === 2019 ||
				Year >= 2020
			) {
				if (stat.game_level === 'A') {
					level = 'D2'
				} else if (stat.game_level === 'B') {
					level = 'D3'
				}
			}
		} else {
			level = stat.game_level
		}
		return level
	}
	function getResultCode(stat) {
		let code = ''
		if (stat.ptsFor !== 0 || stat.ptsAgn !== 0) {
			if (stat.ptsFor > stat.ptsAgn) {
				code = 'W'
			} else if (stat.ptsFor < stat.ptsAgn) {
				code = 'L'
			} else {
				code = 'T' // else both 0 show nothing
			}
		}
		return code
	}

	return { getGameLevelCode, getResultCode }
}
