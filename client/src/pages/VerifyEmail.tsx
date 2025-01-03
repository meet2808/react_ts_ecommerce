import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState<String>("");
    const [response, setResponse] = useState<String>("");

    const verifyToken = async () => {
        const response = await axios.post(`http://localhost:2008/api/v1/email/verifyUser`, {token});
        console.log("verify email", response)
        if(response)
            setResponse(response.data.message);
        if(response?.data.success) {
            setTimeout(() => { navigate("/auth/sign-in") }, 1000)
        }
    }

    useEffect(() => {
        setResponse("");
        const query = new URLSearchParams(window.location.search);
        // console.log("query",query)
        const token = query.get('token')!;
        // console.log(token)
        setToken(token)
    }, [])
    return(
        <>
            <h1>{response}</h1>
            <p>click below button for verify yourself</p>
            <button className="bg-slate-900 text-white font-bold py-3 px-6 cursor-pointer" onClick={verifyToken} disabled={token ? false : true}>Verify</button>
        </>
    )
}

export default VerifyEmail;