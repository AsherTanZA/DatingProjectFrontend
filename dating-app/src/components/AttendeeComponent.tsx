import React, {useEffect, useState} from 'react'
import { createAttendee } from '../services/AttendeeService'
import { useNavigate, useParams} from 'react-router-dom';
import { getAttendee} from '../services/AttendeeService'

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

const AttendeeComponent = () => {

      const [firstName, setFirstName] = useState('')
      const [lastName, setLastName] = useState('')
      const [email, setEmail] = useState('')
      const [gender, setGender] = useState('')
      const [hobbies, setHobbies] = useState<string []>([]);
      const [hobbyInput, setHobbyInput] = useState<string>("");
      const [loveLanguage, setloveLanguage] = useState('');
      const [personalityType, setpersonalityType] = useState('');
      const [attendee, setAttendee] = useState<Attendee>();
      const [errors, setErrors] = useState({
              firstName: '',
              lastName: '',
              email: '',
              gender: '',
              loveLanguage: '',

      })

      useEffect(() => {
        if (id) {
            getAttendee(id)
                .then((response) => {
                    setAttendee(response.data);
                    setHobbies(response.data.hobbies);
                })
                .catch((error) => {
                    console.error("Error fetching attendee:", error);
                });
        }
      }, []);

      const {id} = useParams();
      const navigator = useNavigate();

      // Add hobby to the list
      const addHobby = (e : React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (hobbyInput.trim() !== "") {
        setHobbies([...hobbies, hobbyInput]); // Add new hobby
        console.log("Updated Hobbies:", [...hobbies, hobbyInput]);
        setHobbyInput(""); // Clear input field
      }
      };

      // Remove a hobby
      const removeHobby = (index: number) => {
      setHobbies(hobbies.filter((_, i) => i !== index));
      };

      function validateForm(){
        let valid = true;
        const errorsCopy = {... errors}

        if(firstName.trim()){
          errorsCopy.firstName = '';
        }else{
          errorsCopy.firstName = 'First name is required';
          valid = false;
        }
        if(lastName.trim()){
          errorsCopy.lastName = '';
        }else{
          errorsCopy.lastName = 'Last name is required';
          valid = false;
        }
        if(email.trim()){
          errorsCopy.email = '';
        }else{
          errorsCopy.email = 'Email is required';
          valid = false;
        }
        if(gender.trim()){
          errorsCopy.gender = '';
        }else{
          errorsCopy.gender = 'Gender is required';
          valid = false;
        }
        if(loveLanguage.trim()){
          errorsCopy.loveLanguage = '';
        }else{
          errorsCopy.loveLanguage = 'Love Language is required';
          valid = false;
        }

        setErrors(errorsCopy);
        return valid;
      }
 
     function saveAttendee(e : React.MouseEvent<HTMLButtonElement>){
        e.preventDefault();

        if(validateForm()){
          const attendee = {firstName, lastName, email, gender, hobbies, loveLanguage, personalityType}
          console.log(attendee);

          createAttendee(attendee).then((response) => {
          console.log(response.data);
          navigator('/attendees');
        })}
     }

     function pageTitle(){
        if(id){
          return <h2 className='text-center'>Update Attendee</h2>
        }else{
          return <h2 className='text-center'>Add Attendee</h2>
        }
     }

     function showAttendeetobeUpdated(data: String){
        if (!attendee) return "Loading..."; // Handle loading state
 
        if(id){
          switch (data){
            case "firstName":
              return attendee.firstName;
            case "lastName":
              return attendee.lastName;
            case "email":
              return attendee.email;
            case "gender":
              return attendee.gender;
            case "loveLanguage":
              return attendee.loveLanguage;
            case "personalityType":
              return attendee.personalityType;
          }
        }else{
          switch (data){
            case "firstName":
              return firstName;
            case "lastName":
              return lastName;
            case "email":
              return email;
            case "gender":
              return gender;
            case "loveLanguage":
              return loveLanguage;
            case "personalityType":
              return personalityType;
          }
        }
     }

    return (
      <div className = "container">
        <br></br>
        <div className='row justify-content-center'>
          <div className = 'card w-100'>
              {
                pageTitle()
              }
              <div className='card-body'>
                <form>
                  <div className='form-group mb-2'>
                      <label className='form-label'>First Name:</label>
                      <input
                        type='text'
                        placeholder='Enter First Name'
                        name='firstName'
                        value={showAttendeetobeUpdated("firstName")}
                        className={`form-control ${errors.firstName ? 'is-invalid': ''}`}
                        onChange={(e : React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
                      >
                      </input>
                      {<div className='invalid-feedback'>{errors.firstName}</div>}
                  </div>

                  <div className='form-group mb-2'>
                      <label className='form-label'>Last Name:</label>
                      <input
                        type='text'
                        placeholder='Enter last Name'
                        name='lastName'
                        value={showAttendeetobeUpdated("lastName")}
                        className={`form-control ${errors.lastName ? 'is-invalid': ''}`}
                        onChange={(e : React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
                      >
                      </input>
                      {<div className='invalid-feedback'>{errors.lastName}</div>}
                  </div>

                  <div className='form-group mb-2'>
                      <label className='form-label'>Email:</label>
                      <input
                        type='text'
                        placeholder='Enter Email Address'
                        name='email'
                        value={showAttendeetobeUpdated("email")}
                        className={`form-control ${errors.email ? 'is-invalid': ''}`}
                        onChange={(e : React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                      >
                      </input>
                      {<div className='invalid-feedback'>{errors.email}</div>}
                  </div>

                  <div className='form-group mb-2'>
                      <label className='form-label'>Gender:</label>
                      <input
                        type='text'
                        placeholder="Enter gender"
                        name='gender'
                        value={showAttendeetobeUpdated("gender")}
                        className={`form-control ${errors.gender ? 'is-invalid': ''}`}
                        onChange={(e : React.ChangeEvent<HTMLInputElement>) => setGender(e.target.value)}
                      >
                      </input> 
                      {<div className='invalid-feedback'>{errors.gender}</div>}
                  </div>

                  <div className='form-group mb-2'>
                      <label className='form-label'>Enter Attendee's hobbies:</label>
                      <input
                        type='text'
                        placeholder="Enter a hobby"
                        name='hobbies'
                        value={hobbyInput}
                        className='form-control'
                        onChange={(e : React.ChangeEvent<HTMLInputElement>) => setHobbyInput(e.target.value)}
                      >
                      </input>
                      <button onClick={addHobby}>Add Hobby</button>

                      <h3>Your Hobbies</h3>
                      <ul>
                        {hobbies.map((hobby, index) => (
                          <li key={index}>
                            {hobby} {<button onClick={() => removeHobby(index)}>Remove</button>}
                          </li>
                        ))}
                      </ul>
                  </div>

                  <div className='form-group mb-2'>
                      <label className='form-label'>Love Language:</label>
                      <input
                        type='text'
                        placeholder="Enter your love language"
                        name='lovelanguage'
                        value={showAttendeetobeUpdated("loveLanguage")}
                        className={`form-control ${errors.loveLanguage ? 'is-invalid': ''}`}
                        onChange={(e : React.ChangeEvent<HTMLInputElement>) => setloveLanguage(e.target.value)}
                      >
                      </input> 
                      {<div className='invalid-feedback'>{errors.loveLanguage}</div>}
                  </div>

                  <div className='form-group mb-2'>
                      <label className='form-label'>Personality Type:</label>
                      <input
                        type='text'
                        placeholder="Enter your Personality Type"
                        name='personalityType'
                        value={showAttendeetobeUpdated("personalityType")}
                        className='form-control'
                        onChange={(e : React.ChangeEvent<HTMLInputElement>) => setpersonalityType(e.target.value)}
                      >
                      </input> 
                  </div>

                  <button className='btn btn-success' onClick={saveAttendee}>Submit</button>
                </form>
              </div>
          </div>
        </div>
        
      </div>
  )
}

export default AttendeeComponent