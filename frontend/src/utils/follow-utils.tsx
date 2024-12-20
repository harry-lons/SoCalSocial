import { API_BASE_URL } from "../constants/constants"
import { Follow ,User,Club} from "../types/types"
// Function to create an expense in the backend. Method: POST
export const createFollow = async (token: string,follow: Follow): Promise<boolean> => {
	console.log(`${API_BASE_URL}/Follow`)
	const response = await fetch(`${API_BASE_URL}/Follow`, {
    	method: "POST",
    	headers: {
        	"Content-Type": "application/json",
			"Authorization" : `Bearer ${token}`
    	},
    	body: JSON.stringify(follow),
	});
	if (!response.ok) {
    	throw new Error("Failed to create Follow");
	}
	return response.json();
};


// Function to delete a follow event in the backend. Method: DELETE
export const deleteFollow = async (token:string,club_id: string): Promise<boolean> => { 
	const response = await fetch(`${API_BASE_URL}/unfollow/${club_id}`, { 
    	method: "DELETE",
		headers:{
			"Authorization" : `Bearer ${token}`
		},
		body: JSON.stringify(club_id)
	});
	if (!response.ok) {
    	throw new Error("Failed to delete Follow");
	}
	return response.json();
};

// Function to load a user's followed clubs from the backend. Method: GET
export const getFollowed = async (token:string): Promise<string[]> => { 
	const response = await fetch(`${API_BASE_URL}/user/followed`, { 
    	method: "GET",
		headers:{
			"Authorization" : `Bearer ${token}`
		}
	});
	if (!response.ok) {
    	throw new Error("Failed to get followed clubs");
	}
	//const clubs: Club[] = (await response.json()).clubs;

	// Parsing the response to get the data
	let clubs = await response.json().then((jsonResponse) => {
		console.log("data in fetch attendees", jsonResponse);
		return jsonResponse.clubs;
	});
	console.log("data in fetchFollowers", clubs);
	return clubs;
};


// fetch if a user has followed this club
export const fetchFollowStatus = async (token:string, club_id: string): Promise<Boolean> => { 
	const response = await fetch(`${API_BASE_URL}/followed/${club_id}`, { //NOTICE CHANGE
        method: "GET",
        headers: {
            "Authorization" : `Bearer ${token}`
        }
    })
	if (!response.ok) {
    	throw new Error('Failed to fetch Follow Status');
	}

	const jsonResponse = await response.json();

    // Log and return the `data` property safely
    console.log("status in fetchFollowStatus", jsonResponse);
	return jsonResponse;

};

// fetch all users following a certain club
export const fetchFollowers = async (token:string): Promise<User[]> => { 
	const response = await fetch(`${API_BASE_URL}/club/followers`, { //NOTICE CHANGE
        method: "GET",
        headers: {
            "Authorization" : `Bearer ${token}`
        }
    })
	if (!response.ok) {
    	throw new Error('Failed to fetch RSVP');
	}

	//const followers: User[] = (await response.json()).users;
    // Log and return the `data` property safely

	//Parsing the response to get the data
	// let followers = response.json().then((jsonResponse) => {
	// 	console.log("data in fetch attendees", jsonResponse);
	// 	return jsonResponse.data;
	// });
    // console.log("data in fetchFollowers", followers);
	const followers = (await response.json()).users;
	console.log("data in fetchFollowers", followers);
    // Ensure `jsonResponse.data` is an array or return an empty array
    return followers;

};