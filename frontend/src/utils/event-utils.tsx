import { API_BASE_URL } from "../constants/constants"
import { Event, EventListInfo, EventType } from "../types/types"

const validEventTypes: Set<EventType> = new Set<EventType>([
    "social",
    "workshop",
    "networking",
    "fundraiser",
    "competition",
    "seminar",
    "communityService",
    "cultural",
    "recreational",
    "generalMeeting",
    "academic",
    "orientation",
    "careerDevelopment",
    "volunteering",
    "panel",
    "celebration",
    "sports",
    "arts",
    "training",
    "research",
  ]);

export const fetchEventById = async (eventId: number): Promise<Event> => {

    const response = await fetch(`${API_BASE_URL}/event/${eventId}`)
    

    if (!response.ok) {
        throw new Error("Failed to fetch event")
    }    

    const event: Event = await response.json();
    
    if (event.begin_time) {
        event.begin_time = new Date(event.begin_time);  // Convert to Date object
    }

    if (event.end_time) {
        event.end_time = new Date(event.end_time);  // Convert to Date object
    }

    if (event.stop_date) event.stop_date = new Date(event.stop_date);

    if (Array.isArray(event.type)) {
        event.type = event.type.filter((type): type is EventType =>
          validEventTypes.has(type as EventType)
        );
      }
    
    console.log("Event fetched successfully:", event);
    return event;
};

// All events
export const fetchEvents = async (): Promise<Event[]> => {

    const response = await fetch(`${API_BASE_URL}/events`, {
        method: "GET",
    })

    if (!response.ok) {
        throw new Error("Failed to fetch event list")
    }    

    const events: Event[] = (await response.json()).events;
    
    events.forEach((event)=>{
        if (event.begin_time) {event.begin_time = new Date(event.begin_time); }
        if (event.end_time) {event.end_time = new Date(event.end_time);}
        if (event.stop_date) event.stop_date = new Date(event.stop_date);
    })

    return events;
};

// All events, clubs, rsvp of a user, followed clubs of a user
export const fetchEventListInfo = async (token: string): Promise<EventListInfo> => {

    const response = await fetch(`${API_BASE_URL}/eventlistinfo`, {
        method: "GET",
        headers: {
            "Authorization" : `Bearer ${token}`
        }
    })

    if (!response.ok) {
        throw new Error("Failed to fetch event list")
    }    

    const eventInfo: EventListInfo = await response.json();
    
    eventInfo.events.forEach((event)=>{
        if (event.begin_time) {event.begin_time = new Date(event.begin_time); }
        if (event.end_time) {event.end_time = new Date(event.end_time);}
    })
    eventInfo.rsvp.forEach((event)=>{
        if (event.begin_time) {event.begin_time = new Date(event.begin_time); }
        if (event.end_time) {event.end_time = new Date(event.end_time);}
    })

    return eventInfo;
};

// All events RSVPed by the user
export const fetchRSVPEvents = async (token: string): Promise<Event[]> => {

    const response = await fetch(`${API_BASE_URL}/user/myevents`, {
        method: "GET",
        headers: {
            "Authorization" : `Bearer ${token}`
        }
    })

    if (!response.ok) {
        throw new Error("Failed to fetch event list")
    }    

    const events: Event[] = (await response.json()).events;
    
    events.forEach((event)=>{
        if (event.begin_time) {event.begin_time = new Date(event.begin_time); }
        if (event.end_time) {event.end_time = new Date(event.end_time);}
        if (event.stop_date) event.stop_date = new Date(event.stop_date);
    })

    return events;
};


//get all events of a club
export const fetchClubEvents = async (club_id: String): Promise<Event[]>=>{
    const response = await fetch(`${API_BASE_URL}/club/${club_id}/events`, {
        method: "GET"
    })

    if (!response.ok) {
        throw new Error("Failed to fetch club events")
    }    

    const events: Event[] = (await response.json()).events;
    
    events.forEach((event)=>{
        if (event.begin_time) {event.begin_time = new Date(event.begin_time); }
        if (event.end_time) {event.end_time = new Date(event.end_time);}
        if (event.stop_date) event.stop_date = new Date(event.stop_date);
    })
    return events;

};
//Should implement backend to fit both user and club
export const fetchPastEvents = async (token: string, type:string): Promise<Event[]> => {

    const response = await fetch(`${API_BASE_URL}/${type}/events/past`, { //NOTICE THIS CHANGE
        method: "GET",
        headers: {
            "Authorization" : `Bearer ${token}`
        }
    })

    if (!response.ok) {
        throw new Error("Failed to fetch upcoming events")
    }    

    const events: Event[] = (await response.json()).events;
    
    events.forEach((event)=>{
        if (event.begin_time) {event.begin_time = new Date(event.begin_time); }
        if (event.end_time) {event.end_time = new Date(event.end_time);}
        if (event.stop_date) event.stop_date = new Date(event.stop_date);
    })

    return events;
};
// Function to create an event in the backend. Method: POST
export const createEvent = async (token: string,event: Event): Promise<string> => {
    const eventData = { ...event, id: Number(event.id) };
	const response = await fetch(`${API_BASE_URL}/club/event`, {
    	method: "POST",
    	headers: {
        	"Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
    	},
    	body: JSON.stringify(eventData),
	});
	if (!response.ok) {
    	throw new Error("Failed to create event");
	}
    const event_id:string = String(await response.json());
	return event_id;
};

export const updateEvent = async (token: string,event: Event): Promise<Event> => {
    const eventData = { ...event, id: Number(event.id) };
	const response = await fetch(`${API_BASE_URL}/club/event`, {
    	method: "PATCH",
    	headers: {
        	"Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
    	},
    	body: JSON.stringify(eventData),
	});
	if (!response.ok) {
    	throw new Error("Failed to update event");
	}
	return response.json();
};

export const deleteEvent = async (token: string,event_id: Number): Promise<Event> => {
	const response = await fetch(`${API_BASE_URL}/club/event/${event_id}`, { // url need to be changed 
    	method: "DELETE",
		headers:{
			"Authorization" : `Bearer ${token}`
		}
	});
	if (!response.ok) {
    	throw new Error("Failed to delete event");
	}
	return response.json();
};