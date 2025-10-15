import axios from 'axios';

export default async function checkToken() {
  try {
    const res = await axios.get('http://localhost:5000/api/auth/check-token', {
 withCredentials: true, // ✅ this is crucial for sending cookies
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res.data); 
    return res.data;
  } catch (err) {
    if (err.response) {
      console.log(err.response.data.error); // <--- changed here
      return { error: err.response.data.error };
    } else {
      console.log('Network error');
      return { error: 'Network error' };
    }
  }
}
