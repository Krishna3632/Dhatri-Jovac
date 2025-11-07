import React from 'react'
import { Home, UserCircle2Icon, SettingsIcon } from 'lucide-react'

function UserBar() {
    // Set a default selected item (e.g., "home")
    const [selected, setSelected] = React.useState("home"); 

    // Base classes for all icons
    const iconBaseClasses = "cursor-pointer transition-colors duration-200 ease-in-out hover:text-blue-300";

    return (
        // This is the main glass bar. 
        // The parent UserLayout will handle centering it.
       <div className='w-fit m-4 flex justify-center items-center'>

            <div className='flex items-center gap-10 rounded-md border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-xs'>

                <Home size={32} onClick={() => setSelected("home")} className={selected === "home" ? "text-blue-900" : "text-white"} />

                <UserCircle2Icon size={32} onClick={() => setSelected("profile")} className={selected === "profile" ? "text-blue-900" : "text-white"} />

                <SettingsIcon size={32} onClick={() => setSelected("settings")} className={selected === "settings" ? "text-blue-900" : "text-white"} />

            </div>

        </div>
    )
}

export default UserBar