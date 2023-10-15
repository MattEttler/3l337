import { generateEventLog } from "/test/event-log-generator.js";
import { Event, ToggledSessionEvent, NavigatedEvent } from "/models/event.js";

const dummyLogData = generateEventLog(10);

function parseProblemUrl(url) {
	const problem_regex = /(problems\/)(.*?)(?=\/)/;
	const problem_match = url.match(problem_regex);

	if (problem_match == null || problem_match.length < 3) {
		throw new Error(`There was a problem parsing the url: ${url}. Expected to match pattern */problems/{problem-name}/*`);
	}

	return problem_match[2];
}

// Start/Stop the 3l337 Session.
chrome.action.onClicked.addListener((tab) => {
	const problem = parseProblemUrl(tab.url);
	console.log(`Toggling Session`);
	chrome.storage.local.get('eventLog')
		.then(result => {
			console.log(result);
			let eventLog = result?.eventLog ?? [];
			eventLog.push(new ToggledSessionEvent());
			return chrome.storage.local.set({ eventLog });
		});
});

chrome.tabs.onActivated.addListener(result => {
	// result.tabId
	// result.windowId
	chrome.tabs.get(result.tabId)
		.then(tab => {
			console.log(`Navigated to: ${tab.url}`);
			return chrome.storage.local.get('eventLog')
				.then(result => {
					console.log(result);
					let eventLog = result?.eventLog ?? [];
					eventLog.push(new NavigatedEvent(tab.url));		
					return chrome.storage.local.set({ eventLog });
				});
		});
});
