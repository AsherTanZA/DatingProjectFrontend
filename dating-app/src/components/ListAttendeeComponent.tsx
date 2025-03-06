import React, {useEffect, useState} from 'react'
import { listAttendees } from '../services/AttendeeService'
import { useNavigate } from 'react-router-dom';

// ✅ Define the expected API response type
interface Attendee {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    hobbies: string[];
    loveLanguage: string;
    personalityType: string;
  }
  

const ListAttendeeComponent = () => {

    const [attendees, setAttendeees] = useState<Attendee[]>([])

    const navigator = useNavigate();

    useEffect(() => {
        listAttendees().then((response) => {
            setAttendeees(response.data);
        }).catch(error => {
            console.error(error);
        })
    }, [])

    function addNewAttendee(){
        navigator('/add-attendee');
    }

    function updateAttendee(id: number){
        navigator(`/edit-attendee/${id}`)
    }
    

  return (
    <div className='container'>
        <h2 className='text-center'>List of Attendees</h2>
        <button className='btn btn-primary mb-2' onClick={addNewAttendee}> Add Attendee </button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Attendee Id</th>
                    <th>Attendee First Name</th>
                    <th>Attendee Last Name</th>
                    <th>Attendee Email Id</th>
                    <th>Attendee Hobbies</th>
                    <th>Attendees Love Language</th>
                    <th>Attendees Personality Type</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    attendees.map(attendee =>
                        <tr key={attendee.id}>
                            <td>{attendee.id}</td>
                            <td><a href="http://localhost:5173/viewattendeeprofile">{attendee.firstName}</a></td>
                            <td>{attendee.lastName}</td>
                            <td>{attendee.email}</td>
                            <td>{attendee.hobbies.map(hobby => <>{hobby}, </>)}</td>
                            <td>{attendee.loveLanguage}</td>
                            <td>{attendee.personalityType}</td>
                            <td>
                                <button className='btn btn-info' onClick={() => updateAttendee(attendee.id)}>Update</button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListAttendeeComponent
