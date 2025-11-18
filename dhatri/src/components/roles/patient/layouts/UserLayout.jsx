import UserProfile from "../../doctor/Pages/PatientProfile";
import UserBar from "../../../UI/UserBar";

function UserLayout({ children }) {
    return (
        <div className="relative min-h-screen flex flex-col">
            <div className="pb-16"> {/* Add padding equal to or larger than UserBar height */}
                {children}
            </div>
            <div className="fixed bottom-0 w-full flex justify-center items-center z-50 bg-none shadow-lg">
                <UserBar />
            </div>
        </div>
    );
}

export default UserLayout;
