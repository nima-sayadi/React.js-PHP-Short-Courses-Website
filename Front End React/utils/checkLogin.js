import axios from "axios";

export async function checkLogin() {
    const config = {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    const response = await axios.get("http://localhost/api/auth/check_login.php",config);
    return response.data;
}