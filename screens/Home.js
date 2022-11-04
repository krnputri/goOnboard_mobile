import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, FONTS, SIZES, icons, images } from '../constants';

const LineDivider = () => {
    return (
        <View style={{ width: 1, height: 70, paddingVertical: 12 }}>
            <View style={{ flex: 1, borderLeftColor: COLORS.lightGray, borderLeftWidth: 1 }}></View>
        </View>
    )
}

const Home = ({ navigation }) => {

    const news_1 ={
        id: 1,
        newsName: "CLEAR Meluncurkan Edisi Spesial TinyTAN untuk Menginspirasi Generasi Muda",
        newsCover: images.news1,
        description: "CLEAR sebagai brand Sampo Anti Ketombe No.11 pilihan masyarakat Indonesia berkolaborasi dengan karakter TinyTAN yang merupakan cerminan animasi dari ikon musik pop abad ke-21, BTS, dengan menghadirkan delapan kemasan special TinyTAN | CLEAR. Dengan kolaborasi ini, CLEAR percaya dapat mendukung lebih banyak anak muda untuk dapat meningkatkan kepercayaan diri dan membuka peluang lebih banyak dalam perjuangan mereka meraih impian.",
        backgroundColor: "rgba(123, 182, 238, 0.75)",
        navTintColor: "#FFF"
    }
    const news_2 ={
        id: 1,
        newsName: "BKGN Kembali Hadir Dukung Masyarakat Makassar demi Senyum Sehat Indonesia",
        newsCover: images.news2,
        author: "Author 2",
        readed: "15k",
        description: "Bulan Kesehatan Gigi Nasional (BKGN) 2022, program tahunan kerja sama PT Unilever Indonesia, Tbk. melalui brand Pepsodent dengan Persatuan Dokter Gigi Indonesia (PDGI), Asosiasi Fakultas Kedokteran Gigi Indonesia (AFDOKGI), Asosiasi Rumah Sakit Gigi dan Mulut Pendidikan Indonesia (ARSGMPI) serta Kementerian Kesehatan Republik Indonesia kembali hadir di RSGM Pendidikan – FKG Universitas Hasanuddin, Makassar.",
        backgroundColor: "rgba(123, 182, 238, 0.75)",
        navTintColor: "#FFF"
    }
    const news_3 ={
        id: 1,
        newsName: "BKGN Ajak Masyarakat Pulihkan Kebiasaan Merawat Kesehatan Gigi dan Mulut",
        newsCover: images.news3,
        author: "Author 3",
        readed: "13k",
        description: "Bertepatan dengan peringatan Hari Kesehatan Gigi Nasional, hari ini PT Unilever Indonesia Tbk. meresmikan Bulan Kesehatan Gigi Nasional (BKGN) 2022 di Gelora Bung Karno. Mengangkat tema “Pulih Bersama dengan Senyum Sehat Indonesia”,BKGN 2022 menyoroti isu pentingnya memulihkan kebiasaan menyikat gigi pagi dan malam hari, serta rutin berkonsultasi ke dokter gigi, yang mengalami penurunan selama pandemi. Dengan demikian, diharapkan masyarakat dapat kembali bangkit, hidup lebih sehat dan produktif dengan senyum Indonesia.",
        backgroundColor: "rgba(123, 182, 238, 0.75)",
        navTintColor: "#FFF"
    }

    const list_news = [
        { ...news_1 },
        { ...news_2 },
        { ...news_3 }
    ]

    const [listNews, setNews] = React.useState(list_news);
    const [listCourse, setCourse] = useState([]);
    const [profile, setProfile] = React.useState(profile);

    const getData = async () => {
        const link = await AsyncStorage.getItem('linkApi')
        const token = await AsyncStorage.getItem('token')
        const id = await AsyncStorage.getItem('userId')
        setProfile(await AsyncStorage.getItem('name'))
        try{
            const resp = await fetch(link+'/api/courses/?userId='+ id, {
                method: 'GET',
                headers: {
                    Authorization : 'Bearer '+ token
                }
                });
            const data =  await resp.json();
            console.log("get API Course : "+ data)
            setCourse(data)
        } catch (error) {
            console.log("error : " +error);
        }
      };

      useEffect(() => {
        getData();
      }, []);

      const getLogout = async () => {
        try{
            await AsyncStorage.removeItem('token')
            console.log("Logout Success")
            navigation.goBack()
        } catch(error){
            console.log("error : " +error);
        }
       
      };

    function renderHeader() {
        return (
            <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: SIZES.padding, alignItems: 'center' }}>
                {/* Hallo Text */}
                <View style={{ flex: 1 }}>
                    <View style={{ marginRight: SIZES.padding }}>
                        <Text style={{ ...FONTS.h3, color: COLORS.white }}>Hallo,</Text>
                        <Text style={{ ...FONTS.h2, color: COLORS.white }}>{profile}</Text>
                    </View>
                </View>

                {/* SignOut Button */}
                <TouchableOpacity
                    style={{
                        backgroundColor: COLORS.primary,
                        height: 40,
                        paddingLeft: 3,
                        paddingRight: SIZES.radius,
                        borderRadius: 20
                    }}
                    
                    onPress={ getLogout }
                >
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 25, backgroundColor: 'rgba(0,0,0,0.5)' }}>
                            <Image
                                source={icons.logout}
                                resizeMode="contain"
                                style={{
                                    width: 20,
                                    height: 20
                                }}
                            />
                        </View>

                        <Text style={{ marginLeft: SIZES.base, color: COLORS.black, ...FONTS.body3 }}>SignOut</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    function renderTotalCourse() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', padding: SIZES.padding }}>
                <View style={{ flexDirection: 'row', height: 70, backgroundColor: COLORS.secondary, borderRadius: SIZES.radius }}>
                    {/* Claim */}
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() => console.log("Total Course")}
                    >
                        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ marginLeft: SIZES.base, ...FONTS.h2, color: COLORS.white }}>5</Text>
                            <Text style={{ marginLeft: SIZES.base, ...FONTS.body3, color: COLORS.white }}>Course Total</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Divider */}
                    <LineDivider />

                    {/* Get Point */}
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() => console.log("Get Point")}
                    >
                        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ marginLeft: SIZES.base, ...FONTS.h2, color: COLORS.white }}>1</Text>
                            <Text style={{ marginLeft: SIZES.base, ...FONTS.body3, color: COLORS.white }}>Course Done</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    function renderNews(listNews) {
        const renderItem = ({item, index}) => {
            return (
                <TouchableOpacity
                    style={{
                        flex: 1,
                        marginLeft: index == 0 ? SIZES.padding : 0,
                        marginRight: SIZES.radius
                    }}
                    onPress={() => navigation.navigate("NewsDetail", {
                        news: item
                    })}
                >
                    {/* News Cover */}
                    <Image
                        source={item.newsCover}
                        resizeMode="cover"
                        style={{
                            width: 180,
                            height: 250,
                            borderRadius: 20
                        }}
                    />
                </TouchableOpacity>
            )
        }
        return (
            <View style={{ flex: 1 }}>
                {/* Header */}
                <View style={{ paddingHorizontal: SIZES.padding, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ ...FONTS.h3, color: COLORS.white }}>Company News</Text>
                </View>

                {/* Item News */}
                <View style={{ flex: 1, marginTop: SIZES.padding }}>
                    <FlatList
                        data={listNews}
                        renderItem={renderItem}
                        keyExtractor={item => `${item.id}`}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>
        )
    }

    function renderListData() {
        const renderItem = ({ item }) => {
            return (
                <View style={{ marginVertical: SIZES.base }}>
                    <TouchableOpacity
                        style={{ flex: 1, flexDirection: 'row' }}
                        onPress={() => navigation.navigate("CourseDetail", {
                            itemCourse: item
                        })}
                    >
                        <View style={{ width: 70, height: 70, borderRadius: 10, backgroundColor: COLORS.white }}/>

                        <View style={{ flex: 1, marginLeft: SIZES.radius }}>
                            {/* List Course */}
                            <View>
                                <Text style={{ paddingRight: SIZES.padding, ...FONTS.h3, color: COLORS.white }}>{item.title}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }

        return (
            <View style={{ flex: 1, marginTop: SIZES.radius, paddingLeft: SIZES.padding }}>
                <FlatList
                    data={listCourse}
                    renderItem={renderItem}
                    keyExtractor={item => `${item.id}`}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
            {/* Header */}
            <View style={{ height: 200, marginTop: 20 }}>
                {renderHeader()}
                {renderTotalCourse()}
            </View>

            {/* Content */}
            <ScrollView>
                {/* News */}
                <View>
                    {renderNews(listNews)}
                </View>

                {/* List */}
                <View style={{ marginTop: SIZES.padding }}>
                    {renderListData()}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home;