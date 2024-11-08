import { Event, Club,User } from "../types/types";
export const API_BASE_URL = "http://localhost:8000";
export const exampleEvent = {
	id: "001",
    title: "Creative Writing Workshop: Unleash Your Imagination!",
	club_id : "001",
	location: "Geisel",
	begin_time: new Date(2024, 11, 1, 10, 0, 0),
    end_time: new Date(2024, 11, 1, 11, 0, 0),
    recurrence: [false, 0, null] as [boolean, number, Date | null],
	summary: "Join us for an engaging and inspiring Creative Writing Workshop hosted by The Literary Society! Whether you're a seasoned writer or just starting your journey, this workshop is designed to spark your creativity and help you develop your writing skills. Participants will explore various writing prompts, learn about character development, and receive constructive feedback on their work. This is a fantastic opportunity to meet fellow writers, share ideas, and enhance your craft in a supportive environment. Bring your favorite notebook and pen, and let your imagination run wild! Refreshments will be provided. Reserve your spot today!",
	pictures: { image: "flyer.jpg" },
	type: "Social"
}

export const exampleClub =
{
	id : "001",
	name: "The Literary Society",
	board_members: ["Member 1"],
	contact_email: ["contact@example.com"]
};
export const exampleRSVPList = {

};
export const exampleEventList: Event[] = [
	{
		id: "001",
		title: "Creative Writing Workshop: Unleash Your Imagination!",
		club_id : "001",
		location: "Geisel",
		begin_time: new Date(2024, 11, 1, 10, 0, 0),
		end_time: new Date(2024, 11, 1, 11, 0, 0),
		recurrence: [false, 0, null] as [boolean, number, Date | null],
		summary: "Join us for an engaging and inspiring Creative Writing Workshop hosted by The Literary Society! Whether you're a seasoned writer or just starting your journey, this workshop is designed to spark your creativity and help you develop your writing skills. Participants will explore various writing prompts, learn about character development, and receive constructive feedback on their work. This is a fantastic opportunity to meet fellow writers, share ideas, and enhance your craft in a supportive environment. Bring your favorite notebook and pen, and let your imagination run wild! Refreshments will be provided. Reserve your spot today!",
		pictures: { image: "flyer.jpg" },
		type: "Social"
	},{
		id: "002",
		title: "Petting Car Club!",
		club_id : "001",
		location: "Geisel",
		begin_time: new Date(2024, 11, 1, 10, 0, 0),
		end_time: new Date(2024, 11, 1, 11, 0, 0),
		recurrence: [false, 0, null] as [boolean, number, Date | null],
		summary: "Cats are always so cute! Let's pet them!",
		pictures: { image: "" },
		type: "Social"
	},
	{
        id: "003",
        title: "Art & Chill: Paint Your Stress Away",
        club_id: "002",
        location: "Student Center",
        begin_time: new Date(2024, 11, 5, 14, 0, 0),
        end_time: new Date(2024, 11, 5, 16, 0, 0),
        recurrence: [false, 0, null] as [boolean, number, Date | null],
        summary: "Take a break from your busy schedule and join us for a relaxing painting session! Supplies will be provided, and no experience is necessary. Meet new friends, unleash your creativity, and paint away your stress.",
        pictures: { image: "" },
        type: "Creative"
    },
    {
        id: "004",
        title: "Yoga in the Park",
        club_id: "003",
        location: "Main Quad",
        begin_time: new Date(2024, 11, 10, 9, 0, 0),
        end_time: new Date(2024, 11, 10, 10, 0, 0),
        recurrence: [true, 1, null] as [boolean, number, Date | null], // Recurs weekly
        summary: "Start your morning with a rejuvenating yoga session led by experienced instructors. All skill levels are welcome! Bring your mat and experience the serenity of yoga in the great outdoors.",
        pictures: { image: "" },
        type: "Health & Wellness"
    },
    {
        id: "005",
        title: "Robotics Club Workshop: Build Your First Robot",
        club_id: "004",
        location: "Engineering Lab",
        begin_time: new Date(2024, 11, 15, 13, 0, 0),
        end_time: new Date(2024, 11, 15, 17, 0, 0),
        recurrence: [false, 0, null] as [boolean, number, Date | null],
        summary: "Join the Robotics Club for a hands-on workshop where you'll learn the basics of building and programming robots. No experience required. All materials will be provided. Come ready to create!",
        pictures: { image: "" },
        type: "Educational"
    },
    {
        id: "006",
        title: "Cooking Club: Italian Cuisine Night",
        club_id: "005",
        location: "Cafeteria Kitchen",
        begin_time: new Date(2024, 11, 20, 18, 0, 0),
        end_time: new Date(2024, 11, 20, 20, 0, 0),
        recurrence: [true, 2, null] as [boolean, number, Date | null],
        summary: "Explore the tastes of Italy with our Cooking Club! Learn how to make classic Italian dishes in a fun, hands-on cooking class. No cooking experience required. Spaces are limited, so sign up now!",
        pictures: { image: "" },
        type: "Culinary"
    },


];
export const exampleUser = {
	id : "001",
	username: "abababa",
	first_name: "Diana",
	last_name: "Wu",
	followed_clubs: ["001","002"]
};