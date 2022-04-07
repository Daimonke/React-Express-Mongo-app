import axios from 'axios';
import { useNavigate } from "react-router-dom";

    function VerifyToken() {
        const navigate = useNavigate()
        const token = localStorage.getItem('token')
        axios.post('/verify', { token: token })
            .then((res) => {
                if (res.status === 200) {
                    return res.data
                }
            })
            .catch((err) => {
                localStorage.removeItem("token");
                navigate("/login");
                console.log(err)
            });
    }

    export { VerifyToken }