import { EventType } from '../models/event.js';

export function generateEventLog(count) {
	let result = [];
	const baseUnixTime = Date.now();
	const PROBLEM_NAME = "PROBLEMO";

	for(let i=0; i<count; i++) {
		result.push({
			eventType: EventType.NAVIGATE_TO_PROBLEM,
			unixTime: baseUnixTime - (i * 1000),
			problem: PROBLEM_NAME
		});
	}

	return result;
}
