import React, { useState, useEffect } from "react";
import axios from "axios";

const Form = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [goals, setGoals] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "https://jwt-auth-eight-neon.vercel.app/login",
                { email, password },
            );

            console.log(response.data);
            localStorage.setItem("token", response.data.refreshToken);
            
            fetchGoals(); 
        } catch (error) {
            console.error(error);
        }
    };

    const fetchGoals = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.get("https://jwt-auth-eight-neon.vercel.app/goals", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(response.data);
            if (response.data && response.data.data && response.data.data.length > 0) {
                setGoals(response.data.data[0]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchGoals();
    }, []); 

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit}>
                Email :
                <input
                    type="text"
                    id="email"
                    name="email"
                    className="border"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                Password :
                <input
                    type="password" 
                    id="password"
                    name="password"
                    className="border"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <input type="submit" value="send" className="bg-gray-200 p-2" />
            </form>
            <hr className="py-4" />
            Present amount : {goals.present_amount || 0} 
            <br />
            Target Amount : {goals.target_amount || 0}
        </div>
    );
};

export default Form;