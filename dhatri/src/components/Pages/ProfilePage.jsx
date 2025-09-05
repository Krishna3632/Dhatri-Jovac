import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";

function ProfilePage(){
    const{id} = useParams();
    const[user, setUser] = useState(null);
}

useEffect(() => {
    const fetchUser = async () => {
        try{
            const res = await fetch();
            const data = await res.json();
            setUser(data);
        }
        catch(err){
            console.error("failed to fetch user=",err);
        }
    };
    fetchUser();
}, [id]
);
if(!user)
    return <p className="text-center mt-10">Loading profile...</p>;

<div className>

</div>