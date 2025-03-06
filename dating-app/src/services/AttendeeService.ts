import axios from "axios";

interface Attendee {
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    hobbies: string[];
    loveLanguage: string;
    personalityType: string;
}
  


const REST_API_BASE_URL = 'http://localhost:8080/api/attendees';


export const listAttendees = () => axios.get(REST_API_BASE_URL);

export const createAttendee = (attendee: Attendee) => axios.post('http://localhost:8080/api/attendees/add-one', attendee);

export const getAttendee = (id: number | string) => axios.get(`http://localhost:8080/api/attendees/${id}`)
