export default function useActivityLogs() {
	const activityLog = (message, variable) => {
		fs.appendFile('/logs/activity.txt', message + ' ' + variable + '\n')
	}

	return {
		activityLog,
	}
}
