import React, { useState } from "react";
import * as Form from "@radix-ui/react-form";


const LandingPage = () => {
    const [userName, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [profile, setProfile] = useState(null);

const createProfile = async(event) =>  {
    event.preventDefault()
    const form = { //for user creation
        firstName,
        lastName,   
        userName,
        password,
        email
      };
    try{
        setError(false);
        setLoading(true);
        const response = await fetch(`http://127.0.0.1:8000/create_user/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        });
        if (!response.ok){
            setError(true);
            throw new Error("failed to create account");
        }

        const result = await response.json()
        setProfile(result);

    } catch(err){
        setError(err.message);
        console.log(err);
    } finally {
        setLoading(false);
    }

};

return (

    <Form.Root className="FormRoot" onSubmit={createProfile}>
        <Form.Field className="FormField" name="FirstName">
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
            <Form.Label className="FormLabel">First Name</Form.Label>
            <Form.Message className="FormMessage" match={"valueMissing"}>Please enter your first name</Form.Message>
        </div>

        <Form.Control asChild>
            <input className="Input" type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
        </Form.Control>
        </Form.Field> 
        <Form.Field className="FormField" name="LastName">
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>   
            <Form.Label className="FormLabel">Last Name</Form.Label>         
            <Form.Message className="FormMessage" match={"valueMissing"}>Please enter your last name</Form.Message>
        </div>
        <Form.Control asChild>
            <input className="Input" type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)}/>
        </Form.Control>
        </Form.Field>
        <Form.Field className="FormField" name="email">

        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}> 
            <Form.Label className="FormLabel">Email</Form.Label>
            <Form.Message className="FormMessage" match={"typeMismatch"}>Please enter a valid email</Form.Message>
            <Form.Message className="FormMessage" match={"valueMissing"}>Please enter your email</Form.Message>
        </div>
        
            <Form.Control asChild>
            <input className="Input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
            </Form.Control>
        </Form.Field>
        <Form.Field className="FormField" name="userName">
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>  
            <Form.Label className="FormLabel">Username</Form.Label>         
            <Form.Message className="FormMessage" match={"valueMissing"}>Please enter your Username</Form.Message>
            </div>
            <Form.Control asChild>
            <input className="Input" type="text" required value={userName} onChange={(e) => setUser(e.target.value)}/>
        </Form.Control>
        </Form.Field>
        <Form.Field className="FormField" name="password">
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>  
            <Form.Label className="FormLabel">Password</Form.Label>         
            <Form.Message className="FormMessage" match={"valueMissing"}>Please enter your password</Form.Message>
            </div>
            <Form.Control asChild>
            <input className="Input" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
        </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
            <button className="Radix-Button" style={{marginTop: 11}}>
                {loading? "Creating your profile!" : "Create Profile"}
            </button>
        </Form.Submit>
    </Form.Root>

);


}

export default LandingPage;
