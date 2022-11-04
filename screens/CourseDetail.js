import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    Animated
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FONTS, COLORS, SIZES, icons } from "../constants";

const CourseDetail = ({ route, navigation }) => {

    const [itemCourse, setCourse] = React.useState(null);
    const [button, setButton] = React.useState(false);
    const [scrollViewWholeHeight, setScrollViewWholeHeight] = React.useState(1);
    const [scrollViewVisibleHeight, setScrollViewVisibleHeight] = React.useState(0);
    const indicator = new Animated.Value(0);

    React.useEffect(() => {
        let { itemCourse } = route.params;
        setCourse(itemCourse)
    }, [itemCourse])
    
    const getComplete = async () => {
        const link = await AsyncStorage.getItem('linkApi')
        const token = await AsyncStorage.getItem('token')
        const id = await AsyncStorage.getItem('userId')
        try{
            const resp = await fetch(link+'/api/user-courses/', {
                method: 'POST',
                headers: {
                    Authorization : 'Bearer '+ token,
                    Accept: 'application/json',
                        'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: id,
                    courseId: itemCourse.id
                  })
                });
            const data =  await resp.json();
            console.log("DATAA : "+ data.status)
            if (data.status = 1) {
                navigation.navigate("Home", {})
                setButton(false)
                console.log('Course Done')
            }
        } catch (error) {
            console.log("error : " +error);
        }
      };

    function renderHeader() {
        return (
            <View style={{ flex: 1 }}>
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        backgroundColor: COLORS.primary
                    }}
                >
                </View>

                {/* Navigation header */}
                <View style={{ flexDirection: 'row', paddingHorizontal: SIZES.radius, height: 50, alignItems: 'flex-end' }}>
                    <TouchableOpacity
                        style={{ marginLeft: SIZES.base }}
                        onPress={() => navigation.goBack()}
                    >
                        <Image
                            source={icons.back_arrow_icon}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: "#000"
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    
    function renderContent() {

        const indicatorSize = scrollViewWholeHeight > scrollViewVisibleHeight ? scrollViewVisibleHeight * scrollViewVisibleHeight / scrollViewWholeHeight : scrollViewVisibleHeight

        const difference = scrollViewVisibleHeight > indicatorSize ? scrollViewVisibleHeight - indicatorSize : 1

        return (
            <View style={{ flex: 1, flexDirection: 'row', padding: SIZES.padding }}>
                {/* Custom Scrollbar */}
                <View style={{ width: 4, height: "100%", backgroundColor: COLORS.gray1 }}>
                    <Animated.View
                        style={{
                            width: 4,
                            height: indicatorSize,
                            backgroundColor: COLORS.lightGray4,
                            transform: [{
                                translateY: Animated.multiply(indicator, scrollViewVisibleHeight / scrollViewWholeHeight).interpolate({
                                    inputRange: [0, difference],
                                    outputRange: [0, difference],
                                    extrapolate: 'clamp'
                                })
                            }]
                        }}
                    />
                </View>

                {/* Description */}
                <ScrollView
                    contentContainerStyle={{ paddingLeft: SIZES.padding2 }}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onContentSizeChange={(width, height) => {
                        setScrollViewWholeHeight(height)
                    }}
                    onLayout={({ nativeEvent: { layout: { x, y, width, height } } }) => {
                        setScrollViewVisibleHeight(height)
                    }}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: indicator } } }],
                        { useNativeDriver: false }
                    )}
                >
                    {/* Title Content */}
                    <Text style={{ ...FONTS.h2, color: COLORS.white, marginBottom: SIZES.padding }}>{itemCourse.title}</Text>
                    {/* Content */}
                    <Text style={{ ...FONTS.body2, color: COLORS.lightGray }}>{itemCourse.content}</Text>
                </ScrollView>
            </View>
        )
    }

    function renderButtonEnable() {
        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                {/* Start Reading */}
                <TouchableOpacity
                    disabled={false}
                    style={{
                        flex: 1,
                        backgroundColor: COLORS.primary,
                        marginHorizontal: 25,
                        borderRadius: SIZES.radius,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={ getComplete }
                >
                    <Text style={{ ...FONTS.h3, color: COLORS.white }}>Finish</Text>
                </TouchableOpacity>
            </View>
        )
    }
    function renderButtonDisable() {
        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                {/* Start Reading */}
                <TouchableOpacity
                    disabled={true}
                    style={{
                        flex: 1,
                        backgroundColor: COLORS.lightGray,
                        marginHorizontal: 25,
                        borderRadius: SIZES.radius,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Text style={{ ...FONTS.h3, color: COLORS.white }}>Done</Text>
                </TouchableOpacity>
            </View>
        )
    }

    function renderButton(){
        if (itemCourse.userId) {
            return renderButtonDisable()
        } else {
            return renderButtonEnable()
        }
    }

    if (itemCourse) {
        return (
            <View style={{ flex: 1, backgroundColor: COLORS.black }}>
                {/* Header */}
                <View style={{ flex: 1 }}>
                    {renderHeader()}
                </View>

                {/* Description */}
                <View style={{ flex: 8 }}>
                    {renderContent()}
                </View>

                {/* Buttons */}
                <View style={{ height: 50, marginBottom: 30 }}>
                    {renderButton()}
                </View>
            </View>
        )
    } else {
        return (<></>)
    }

}

export default CourseDetail;