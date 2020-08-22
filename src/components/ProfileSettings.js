import React, {useContext} from "react";
import UserContext from "../UserContext";
import DoerProfileSettings from "./DoerProfileSettings";


const ProfileSettings = (props) => {
    const {userInfo} = useContext(UserContext);
    console.log(userInfo)
    return (
        // {
        //     userInfo.doer === true ?
        <DoerProfileSettings/>
        //     :
        //     <EmployerProfileSettings/>
        // }
    )
}

export default ProfileSettings;
