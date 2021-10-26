import React, { useState } from 'react'
import { useHistory } from 'react-router';

import Checkbox from "./Checkbox";
import { useAuth } from '../contexts/AuthContext';
import Form from "./Form";
import TextInput from "./TextInput";
import Button from './Button';



const SignupForm = () => {

    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [agree,setAgree] = useState("")
    const [ error , setError ] = useState("");
    const [loading, setLoading] = useState()

    const {signup} = useAuth();
    const history =   useHistory()

    async function handleSubmit(e){
      e.preventDefault();

      if(password !== confirmPassword){
        return setError("Password are not matched.")
      }

      try{
        setError("");
        setLoading(true)
        await signup(email,password,username);
        history.push("/")

      } catch(err){
        console.log(err)
        setLoading(false)
        setError("Failed to signUP")
      }

    }


    return (
        <Form style={{height:"500px"}} onSubmit={handleSubmit} >
        <TextInput type="text" placeholder="Enter Name" icon="person" 
        value={username}
        required
        onChange={(e)=> setUsername(e.target.value)}
        />
        <TextInput
          type="text"
          placeholder="Enter Email"
          icon="alternate_email"
          required
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
        />
        <TextInput type="password" placeholder="Enter Password" icon="lock"
        value={password}
        required
         onChange={(e)=> setPassword(e.target.value)}
        />
        <TextInput
          type="password"
          placeholder="Confirm Password"
          icon="lock_clock"
          required
          value={confirmPassword}
          onChange={(e)=> setConfirmPassword(e.target.value)}
        />
        <Checkbox text="I agree to the Terms and Conditions" 
        value={agree}
        required
         onChange={(e)=> setAgree(e.target.value)}
        />
        <Button disabled={loading} type="submit">
          <span>Submit Now</span>
        </Button>

        {error && <p className="error">{error}</p>}

        <div className="info">
          Already have an account? <a href="login.html">Login</a> instead.
        </div>
      </Form>
    )
}

export default SignupForm
