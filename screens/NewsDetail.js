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

const NewsDetail = ({ route, navigation }) => {

    const [news, setNews] = React.useState(null);
    const [scrollViewWholeHeight, setScrollViewWholeHeight] = React.useState(1);
    const [scrollViewVisibleHeight, setScrollViewVisibleHeight] = React.useState(0);

    const indicator = new Animated.Value(0);

    React.useEffect(() => {
        let { news } = route.params;
        setNews(news)
    }, [news])

    function renderNewsInfo() {
        return (
            <View style={{ flex: 1 }}>
                <ImageBackground
                    source={news.newsCover}
                    resizeMode="cover"
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    }}
                />

                {/* Color Overlay */}
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        backgroundColor: news.backgroundColor
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
                                tintColor: news.navTintColor
                            }}
                        />
                    </TouchableOpacity>
                    
                </View>


                {/* News Name and Author */}
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingStart: SIZES.font }}>
                    <Text style={{ ...FONTS.h2, color: news.navTintColor }}>{news.newsName}</Text>
                </View>
            </View>
        )
    }

    function renderNewsDetail() {

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
                    <Text style={{ ...FONTS.h2, color: COLORS.white, marginBottom: SIZES.padding }}>News Info</Text>
                    <Text style={{ ...FONTS.body2, color: COLORS.lightGray }}>{news.description}</Text>
                </ScrollView>
            </View>
        )
    }

    if (news) {
        return (
            <View style={{ flex: 1, backgroundColor: COLORS.black }}>
                {/* HEADER NEWS */}
                <View style={{ flex: 1 }}>
                    {renderNewsInfo()}
                </View>
                {/* NEWS INFO */}
                <View style={{ flex: 3 }}>
                    {renderNewsDetail()}
                </View>
            </View>
        )
    } else {
        return (<></>)
    }

}

export default NewsDetail;