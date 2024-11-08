export type Event =
{
	id: string;
	title: string;
	club_id : string;
	location: string;
	begin_time: Date;
	end_time: Date;
	recurrence: [ boolean, number, Date|null ];
	summary: string;
	pictures: { [key: string]: string };
	type: string;
};

export type RSVP = 
{
	user_id: string;
	event_id: string;
};

export type User = 
{
	id: string;
	username: string;
	first_name: string;
	last_name: string;
	followed_clubs: string[];
};

export type Club =
{
	id : string;
	name: string;
	board_members: string[];
	contact_email: string | string[];
};
