import React, {useContext} from "react";
import UserContext from "../UserContext";


const ProfileSettings = (props) => {
    const {userInfo} = useContext(UserContext);
    console.log(userInfo);
    return (
        // {
        //     userInfo.doer === true ?
        //     <DoerProfileSettings/>
        //     :
        //     <EmployerProfileSettings/>
        // }
        <h1>ha</h1>
    )
}

export default ProfileSettings;
