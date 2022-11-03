import React from "react";
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Image,
    ScrollView,
    Animated
} from 'react-native';
import { FONTS, COLORS, SIZES, icons } from "../constants";

const Profile = ({ route, navigation }) => {

    const [profile, setProfile] = React.useState(null);
    
    

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.black }}>
            {/* HEADER NEWS */}
            <View style={{ flex: 1 }}>
                {/* {renderNewsInfo()} */}
            </View>
        </View>
    )

}

export default Profile;