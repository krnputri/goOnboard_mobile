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

import { COLORS, FONTS, SIZES, icons, images } from '../constants';

const LineDivider = () => {
    return (
        <View style={{ width: 1, height: 70, paddingVertical: 12 }}>
            <View style={{ flex: 1, borderLeftColor: COLORS.lightGray, borderLeftWidth: 1 }}></View>
        </View>
    )
}

const Home = ({ navigation }) => {

    const profileData = {
        name: 'Username'
    }

    const bookOtherWordsForHome = {
        id: 1,
        bookName: "Other Words For Home",
        bookCover: images.otherWordsForHome,
        rating: 4.5,
        language: "Eng",
        pageNo: 341,
        author: "Jasmine Warga",
        genre: [
            "Romance", "Adventure", "Drama"
        ],
        readed: "12k",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer fringilla libero a turpis viverra vehicula. Sed ac pellentesque ligula, ac pharetra justo. Donec ut erat vitae tortor accumsan convallis. Aenean ornare commodo purus sed semper. Sed fermentum et mi ac condimentum. Etiam sed sagittis ex, in imperdiet urna. Cras iaculis ante et purus molestie lacinia. Mauris id dolor et velit tempus imperdiet sit amet vel arcu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus interdum venenatis quam. Fusce ullamcorper at arcu ut placerat. Nulla facilisi.",
        backgroundColor: "rgba(240,240,232,0.9)",
        navTintColor: "#000"
    }

    const bookTheMetropolis = {
        id: 2,
        bookName: "The Metropolis",
        bookCover: images.theMetropolist,
        rating: 4.1,
        language: "Eng",
        pageNo: 272,
        author: "Seith Fried",
        genre: [
            "Adventure", "Drama"
        ],
        readed: "13k",
        description: "In Metropolis, the gleaming city of tomorrow, the dream of the great American city has been achieved. But all that is about to change, unless a neurotic, rule-following bureaucrat and an irreverent, freewheeling artificial intelligence can save the city from a mysterious terrorist plot that threatens its very existence. Henry Thompson has dedicated his life to improving America's infrastructure as a proud employee of the United States Municipal Survey. So when the agency comes under attack, he dutifully accepts his unexpected mission to visit Metropolis looking for answers. But his plans to investigate quietly, quickly, and carefully are interrupted by his new partner: a day-drinking know-it-all named OWEN, who also turns out to be the projected embodiment of the agency's supercomputer. Soon, Henry and OWEN are fighting to save not only their own lives and those of the city's millions of inhabitants, but also the soul of Metropolis. The Municipalists is a thrilling, funny, and touching adventure story, a tour-de-force of imagination that trenchantly explores our relationships to the cities around us and the technologies guiding us into the future.",
        backgroundColor: "rgba(247,239,219,0.9)",
        navTintColor: "#000"
    }

    const bookTheTinyDragon = {
        id: 3,
        bookName: "The Tiny Dragon",
        bookCover: images.theTinyDragon,
        rating: 3.5,
        language: "Eng",
        pageNo: 110,
        author: "Ana C Bouvier",
        genre: [
            "Drama", "Adventure", "Romance"
        ],
        readed: "13k",
        description: "This sketchbook for kids is the perfect tool to improve your drawing skills! Designed to encourage kids around the world to express their uniqueness through drawing, sketching or doodling, this sketch book is filled with 110 high quality blank pages for creations. Add some fun markers, crayons, and art supplies and you have the perfect, easy gift for kids!",
        backgroundColor: "rgba(119,77,143,0.9)",
        navTintColor: "#FFF"
    }

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

    const myBooksData = [
        {
            ...bookOtherWordsForHome,
            completion: "75%",
            lastRead: "3d 5h",

        },
        {
            ...bookTheMetropolis,
            completion: "23%",
            lastRead: "10d 5h",

        },
        {
            ...bookTheTinyDragon,
            completion: "10%",
            lastRead: "1d 2h",

        }
    ]

    const categoriesData = [
        {
            id: 1,
            categoryName: "General",
            books: [
                bookOtherWordsForHome, bookTheMetropolis, bookTheTinyDragon
            ]
        },
        {
            id: 2,
            categoryName: "IT",
            books: [
                bookTheMetropolis
            ]
        },
        {
            id: 3,
            categoryName: "PMO",
            books: [
                bookTheTinyDragon
            ]
        },
    ]

    const [listNews, setNews] = React.useState(list_news);
    const [listCourse, setCourse] = React.useState(listCourse);
    const [profile, setProfile] = React.useState(profileData);
    const [myBooks, setMyBooks] = React.useState(myBooksData);
    const [categories, setCategories] = React.useState(categoriesData);
    const [selectedCategory, setSelectedCategory] = React.useState(1);

    const getData = async () => {
        const resp = await fetch("https://api.agify.io?name=kirana");
        const data = await resp.json();
        setCourse(data.name);
      };

      useEffect(() => {
        getData();
      }, []);

    function renderHeader(listCourse) {
        return (
            <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: SIZES.padding, alignItems: 'center' }}>
                {/* Greetings */}
                <View style={{ flex: 1 }}>
                    <View style={{ marginRight: SIZES.padding }}>
                        <Text style={{ ...FONTS.h3, color: COLORS.white }}>Hallo,</Text>
                        <Text style={{ ...FONTS.h2, color: COLORS.white }}>{listCourse}</Text>
                    </View>
                </View>

                {/* Points */}
                {/* <TouchableOpacity
                    style={{
                        backgroundColor: COLORS.primary,
                        height: 40,
                        paddingLeft: 3,
                        paddingRight: SIZES.radius,
                        borderRadius: 20
                    }}
                    onPress={() => { console.log("Point") }}
                >
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 25, backgroundColor: 'rgba(0,0,0,0.5)' }}>
                            <Image
                                source={icons.plus_icon}
                                resizeMode="contain"
                                style={{
                                    width: 20,
                                    height: 20
                                }}
                            />
                        </View>

                        <Text style={{ marginLeft: SIZES.base, color: COLORS.white, ...FONTS.body3 }}>point</Text>
                    </View>
                </TouchableOpacity> */}
            </View>
        )
    }

    function renderButtonSection() {
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

    function renderCategoryData() {
        var books = []

        let selectedCategoryBooks = categories.filter(a => a.id == selectedCategory)

        if (selectedCategoryBooks.length > 0) {
            books = selectedCategoryBooks[0].books
        }

        const renderItem = ({ item }) => {
            return (
                <View style={{ marginVertical: SIZES.base }}>
                    <TouchableOpacity
                        style={{ flex: 1, flexDirection: 'row' }}
                        onPress={() => navigation.navigate("CourseDetail", {
                            book: item
                        })}
                    >
                        {/* Book Cover */}
                        <Image
                            source={item.bookCover}
                            resizeMode="cover"
                            style={{ width: 100, height: 100, borderRadius: 10 }}
                        />

                        <View style={{ flex: 1, marginLeft: SIZES.radius }}>
                            {/* Book name and author */}
                            <View>
                                <Text style={{ paddingRight: SIZES.padding, ...FONTS.h2, color: COLORS.white }}>{item.bookName}</Text>
                                <Text style={{ ...FONTS.h3, color: COLORS.lightGray }}>{item.author}</Text>
                            </View>

                            {/* Genre */}
                            <View style={{ flexDirection: 'row', marginTop: SIZES.base }}>
                                {
                                    item.genre.includes("Adventure") &&
                                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: SIZES.base, marginRight: SIZES.base, backgroundColor: COLORS.darkGreen, height: 40, borderRadius: SIZES.radius }}>
                                        <Text style={{ ...FONTS.body3, color: COLORS.lightGreen }}>Adventure</Text>
                                    </View>
                                }
                                {
                                    item.genre.includes("Romance") &&
                                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: SIZES.base, marginRight: SIZES.base, backgroundColor: COLORS.darkRed, height: 40, borderRadius: SIZES.radius }}>
                                        <Text style={{ ...FONTS.body3, color: COLORS.lightRed }}>Romance</Text>
                                    </View>
                                }
                                {
                                    item.genre.includes("Drama") &&
                                    <View style={{ justifyContent: 'center', alignItems: 'center', padding: SIZES.base, marginRight: SIZES.base, backgroundColor: COLORS.darkBlue, height: 40, borderRadius: SIZES.radius }}>
                                        <Text style={{ ...FONTS.body3, color: COLORS.lightBlue }}>Drama</Text>
                                    </View>
                                }
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }

        return (
            <View style={{ flex: 1, marginTop: SIZES.radius, paddingLeft: SIZES.padding }}>
                <FlatList
                    data={books}
                    renderItem={renderItem}
                    keyExtractor={item => `${item.id}`}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
            {/* Header Section */}
            <View style={{ height: 200, marginTop: 20 }}>
                {renderHeader(listCourse)}
                {renderButtonSection()}
            </View>

            {/* Body Section */}
            <ScrollView>
                {/* News */}
                <View>
                    {renderNews(listNews)}
                </View>

                {/* Categories Section */}
                <View style={{ marginTop: SIZES.padding }}>
                    {renderCategoryData()}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home;