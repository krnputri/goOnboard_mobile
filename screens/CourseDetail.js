import React from "react";
import {
    View,
    Text,
    useWindowDimensions,
    TouchableOpacity,
    Image,
    ScrollView,
    Animated
} from 'react-native';
import { FONTS, COLORS, SIZES, icons } from "../constants";
import RenderHtml from 'react-native-render-html';

const CourseDetail = ({ route, navigation }) => {

    const [itemCourse, setCourse] = React.useState(null);

    const [scrollViewWholeHeight, setScrollViewWholeHeight] = React.useState(1);
    const [scrollViewVisibleHeight, setScrollViewVisibleHeight] = React.useState(0);

    const indicator = new Animated.Value(0);

    React.useEffect(() => {
        let { itemCourse } = route.params;
        setCourse(itemCourse)
    }, [itemCourse])
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
                    <Text style={{ ...FONTS.h2, color: COLORS.white, marginBottom: SIZES.padding }}>{itemCourse.title}</Text>
                    {/* <RenderHtml
                        contentWidth={useWindowDimensions()}
                        source={sourceHTML}
                        style={{ ...FONTS.h2, color: COLORS.white, marginBottom: SIZES.padding }}
                    /> */}
                    <Text style={{ ...FONTS.body2, color: COLORS.lightGray }}>{itemCourse.content}</Text>
                </ScrollView>
            </View>
        )
    }

    function renderButton() {
        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                {/* Start Reading */}
                <TouchableOpacity
                    style={{
                        flex: 1,
                        backgroundColor: COLORS.primary,
                        marginHorizontal: 25,
                        borderRadius: SIZES.radius,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => console.log("Start Reading")}
                >
                    <Text style={{ ...FONTS.h3, color: COLORS.white }}>View Link</Text>
                </TouchableOpacity>
            </View>
        )
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