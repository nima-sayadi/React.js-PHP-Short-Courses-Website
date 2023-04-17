import axios from "axios";

export async function getUserInfo() {
    const config = {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    const response = await axios.get("http://localhost/api/auth/get_sessions.php",config);
    return response.data;
}