export const EventType = {
	TOGGLED_SESSION: 'TOGGLED_SESSION',
	NAVIGATED: 'NAVIGATED',
	TYPED: 'TYPED',
	SCROLLED: 'SCROLLED'
}

export class Event {
	constructor(eventType, unixTime) {
		this.eventType = eventType;
		this.unixTime = unixTime;
	}
}

export class ToggledSessionEvent extends Event {
	constructor() {
		super(EventType.TOGGLED_SESSION,Date.now());
	}
}

export class NavigatedEvent extends Event {
	constructor(url) {
		super(EventType.NAVIGATED, Date.now());
		this.url = url;
	}
}
