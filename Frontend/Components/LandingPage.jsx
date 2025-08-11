import React, { useState } from "react";
import { Form } from "radix-ui";


const LandingPage = () => {
    const [userName, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [profile, setProfile] = useState(null);

const createProfile = async(event) =>  {
    event.preventDefault()
    const form = { //each of these fields would be set by their respective setters
        firstName,
        LastName,
        userName,
        password,
        email,
    }
    try{
        setError(false);
        setLoading(true);
        const response = await fetch(`http://127.0.0.1:8000/create_user/${firstName} ${LastName }${userName} ${password} ${email}`, {
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

    <Form.Root className="FormRoot">
        <Form.Field className="FormField" name="email">
            <div style={{display: flex}}>

            </div>
        </Form.Field>
    </Form.Root>

);


}

export default LandingPage;
