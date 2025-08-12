import React, { useState } from "react";
import * as Form from "@radix-ui/react-form";
import "./LandingPage.css"; // 👈 make sure you create this
import { Carousel } from 'antd';


const LandingPage = () => {
  const [userName, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [profile, setProfile] = useState(null);

  const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
  

  const createProfile = async (event) => {
    event.preventDefault();
    const form = { firstName, lastName, userName, password, email };

    try {
      setError(false);
      setLoading(true);
      const response = await fetch(`http://127.0.0.1:8000/users/create_user/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        setError(true);
        throw new Error("failed to create account");
      }

      const result = await response.json();
      setProfile(result);
    } catch (err) {
      setError(err.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Carousel autoplay>
        <div>
            <video src="/assets/video1.mp4" controls style={{ width: '100%', height: '100%'}}></video>
        </div>
        <div>
            <video src="/assets/video2.mp4" controls style={{ width: '100%', height: '100%'}}></video>
        </div>
        <div>
            <img src="assets/screenshot.jpeg" alt="Star Lord ranking" style={{ width: '100%', height: '100%'}}></img>
        </div>
    </Carousel>
//     <div className="form-container">
//       <Form.Root className="FormRoot" onSubmit={createProfile}>
//         <h2 className="form-title">Sign up</h2>

//         {/* First Name */}
//         <Form.Field className="FormField" name="FirstName">
//           <Form.Label className="FormLabel">First Name</Form.Label>
//           <Form.Message className="FormMessage" match="valueMissing">
//             Please enter your first name
//           </Form.Message>
//           <Form.Control asChild>
//             <input
//               className="Input"
//               type="text"
//               required
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//             />
//           </Form.Control>
//         </Form.Field>

//         {/* Last Name */}
//         <Form.Field className="FormField" name="LastName">
//           <Form.Label className="FormLabel">Last Name</Form.Label>
//           <Form.Message className="FormMessage" match="valueMissing">
//             Please enter your last name
//           </Form.Message>
//           <Form.Control asChild>
//             <input
//               className="Input"
//               type="text"
//               required
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//             />
//           </Form.Control>
//         </Form.Field>

//         {/* Email */}
//         <Form.Field className="FormField" name="email">
//           <Form.Label className="FormLabel">Email</Form.Label>
//           <Form.Message className="FormMessage" match="typeMismatch">
//             Please enter a valid email
//           </Form.Message>
//           <Form.Message className="FormMessage" match="valueMissing">
//             Please enter your email
//           </Form.Message>
//           <Form.Control asChild>
//             <input
//               className="Input"
//               type="email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </Form.Control>
//         </Form.Field>

//         {/* Username */}
//         <Form.Field className="FormField" name="userName">
//           <Form.Label className="FormLabel">Username</Form.Label>
//           <Form.Message className="FormMessage" match="valueMissing">
//             Please enter your Username
//           </Form.Message>
//           <Form.Control asChild>
//             <input
//               className="Input"
//               type="text"
//               required
//               value={userName}
//               onChange={(e) => setUser(e.target.value)}
//             />
//           </Form.Control>
//         </Form.Field>

//         {/* Password */}
//         <Form.Field className="FormField" name="password">
//           <Form.Label className="FormLabel">Password</Form.Label>
//           <Form.Message className="FormMessage" match="valueMissing">
//             Please enter your password
//           </Form.Message>
//           <Form.Control asChild>
//             <input
//               className="Input"
//               type="password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </Form.Control>
//         </Form.Field>

//         <Form.Submit asChild>
//           <button className="Radix-Button" style={{ marginTop: 11 }}>
//             {loading ? "Creating your profile!" : "Create Profile"}
//           </button>
//         </Form.Submit>
//       </Form.Root>
//     </div>
  );
};

export default LandingPage;
