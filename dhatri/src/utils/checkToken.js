import axios from 'axios';

export default async function checkToken() {
  try {
    const res = await axios.get('http://localhost:5000/api/check-token', {
      withCredentials: true, 
    });
    console.log(res.data); 
    return res.data;
  } catch (err) {
    if (err.response) {
      console.log(err.response.data.message);
      return { error: err.response.data.message };
    } else {
      console.log('Network error');
      return { error: 'Network error' };
    }
  }
}
