import React, {useContext} from "react";
import UserContext from "../UserContext";
import DoerProfileSettings from "../components/DoerProfileSettings";
import EmployerProfileSettings from "../components/EmployerProfileSettings";


const ProfileSettings = (props) => {
    const {userInfo} = useContext(UserContext);

    return (
        <div>
            {
                userInfo.doer === true ?
                    <DoerProfileSettings/>
                    :
                    <EmployerProfileSettings/>
            }
        </div>
    )
}

export default ProfileSettings;
