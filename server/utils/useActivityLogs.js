export default function useActivityLogs() {
	const activityLog = (message, variable) => {
		alert(message + ' ' + variable)
	}

	return {
		activityLog,
	}
}
