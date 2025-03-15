import axios from "axios";
import { getToken } from "./AuthService";

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

// Add a request interceptor
axios.interceptors.request.use(function (config) {

    config.headers['Authorization'] = getToken();
    
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });


export const listAttendees = () => axios.get(REST_API_BASE_URL);

export const createAttendee = (attendee: Attendee) => axios.post('http://localhost:8080/api/attendees/add-one', attendee);

export const getAttendee = (id: number | string) => axios.get(`http://localhost:8080/api/attendees/${id}`);

export const updateAttendee = (attendeeId: number | string, attendee: Attendee) => axios.put(REST_API_BASE_URL + '/' +attendeeId, attendee);

export const deleteAttendee = (attendeeId: number | string) => axios.delete(REST_API_BASE_URL + '/' +attendeeId);