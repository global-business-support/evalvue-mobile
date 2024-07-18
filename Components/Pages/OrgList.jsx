import { ScrollView, Text, TextInput, View } from 'react-native';
import React from 'react';
import logo from '../../assets/TCS.jpg';
import { Image } from 'react-native-elements';
import DotIcon from 'react-native-vector-icons/Entypo';
import { listStyle } from '../Styles/listStyle';

export default function OrgList() {
    return (
        <View style={listStyle.listMainContainer}>
            <View style={listStyle.listHeaderContainer}>
                <Text style={listStyle.listHeading}>Organization</Text>
                <TextInput
                    style={listStyle.searchInputStyle}
                    placeholder='Search by aadhar...'
                    placeholderTextColor="#592DA1"
                />
            </View>
            <ScrollView>
                <View style={listStyle.listFooterConatiner}>
                    <View style={listStyle.listContainer}>
                        <View style={listStyle.listSubContainer}>
                            <Image
                                source={logo}
                                style={listStyle.listLogoImg}
                            />
                            <View>
                                <Text style={listStyle.listTitleText}>Tata Counsultancy Services </Text>
                                <Text style={listStyle.listCityText}>Indore</Text>
                            </View>
                        </View>
                        <View style={listStyle.listBtnContainer}>
                            <Text style={listStyle.listBtn}>View</Text>
                            <DotIcon name='dots-three-vertical' size={16} color='#47535E' />
                        </View>
                    </View>
                </View>

                {/* ================copied list================ */}
                <View style={listStyle.listFooterConatiner}>
                    <View style={listStyle.listContainer}>
                        <View style={listStyle.listSubContainer}>
                            <Image
                                source={logo}
                                style={listStyle.listLogoImg}
                            />
                            <View>
                                <Text style={listStyle.listTitleText}>Tata Counsultancy Services </Text>
                                <Text style={listStyle.listCityText}>Indore</Text>
                            </View>
                        </View>
                        <View style={listStyle.listBtnContainer}>
                            <Text style={listStyle.listBtn}>View</Text>
                            <DotIcon name='dots-three-vertical' size={16} color='#47535E' />
                        </View>
                    </View>
                </View><View style={listStyle.listFooterConatiner}>
                    <View style={listStyle.listContainer}>
                        <View style={listStyle.listSubContainer}>
                            <Image
                                source={logo}
                                style={listStyle.listLogoImg}
                            />
                            <View>
                                <Text style={listStyle.listTitleText}>Tata Counsultancy Services </Text>
                                <Text style={listStyle.listCityText}>Indore</Text>
                            </View>
                        </View>
                        <View style={listStyle.listBtnContainer}>
                            <Text style={listStyle.listBtn}>View</Text>
                            <DotIcon name='dots-three-vertical' size={16} color='#47535E' />
                        </View>
                    </View>
                </View><View style={listStyle.listFooterConatiner}>
                    <View style={listStyle.listContainer}>
                        <View style={listStyle.listSubContainer}>
                            <Image
                                source={logo}
                                style={listStyle.listLogoImg}
                            />
                            <View>
                                <Text style={listStyle.listTitleText}>Tata Counsultancy Services </Text>
                                <Text style={listStyle.listCityText}>Indore</Text>
                            </View>
                        </View>
                        <View style={listStyle.listBtnContainer}>
                            <Text style={listStyle.listBtn}>View</Text>
                            <DotIcon name='dots-three-vertical' size={16} color='#47535E' />
                        </View>
                    </View>
                </View><View style={listStyle.listFooterConatiner}>
                    <View style={listStyle.listContainer}>
                        <View style={listStyle.listSubContainer}>
                            <Image
                                source={logo}
                                style={listStyle.listLogoImg}
                            />
                            <View>
                                <Text style={listStyle.listTitleText}>Tata Counsultancy Services </Text>
                                <Text style={listStyle.listCityText}>Indore</Text>
                            </View>
                        </View>
                        <View style={listStyle.listBtnContainer}>
                            <Text style={listStyle.listBtn}>View</Text>
                            <DotIcon name='dots-three-vertical' size={16} color='#47535E' />
                        </View>
                    </View>
                </View><View style={listStyle.listFooterConatiner}>
                    <View style={listStyle.listContainer}>
                        <View style={listStyle.listSubContainer}>
                            <Image
                                source={logo}
                                style={listStyle.listLogoImg}
                            />
                            <View>
                                <Text style={listStyle.listTitleText}>Tata Counsultancy Services </Text>
                                <Text style={listStyle.listCityText}>Indore</Text>
                            </View>
                        </View>
                        <View style={listStyle.listBtnContainer}>
                            <Text style={listStyle.listBtn}>View</Text>
                            <DotIcon name='dots-three-vertical' size={16} color='#47535E' />
                        </View>
                    </View>
                </View><View style={listStyle.listFooterConatiner}>
                    <View style={listStyle.listContainer}>
                        <View style={listStyle.listSubContainer}>
                            <Image
                                source={logo}
                                style={listStyle.listLogoImg}
                            />
                            <View>
                                <Text style={listStyle.listTitleText}>Tata Counsultancy Services </Text>
                                <Text style={listStyle.listCityText}>Indore</Text>
                            </View>
                        </View>
                        <View style={listStyle.listBtnContainer}>
                            <Text style={listStyle.listBtn}>View</Text>
                            <DotIcon name='dots-three-vertical' size={16} color='#47535E' />
                        </View>
                    </View>
                </View><View style={listStyle.listFooterConatiner}>
                    <View style={listStyle.listContainer}>
                        <View style={listStyle.listSubContainer}>
                            <Image
                                source={logo}
                                style={listStyle.listLogoImg}
                            />
                            <View>
                                <Text style={listStyle.listTitleText}>Tata Counsultancy Services </Text>
                                <Text style={listStyle.listCityText}>Indore</Text>
                            </View>
                        </View>
                        <View style={listStyle.listBtnContainer}>
                            <Text style={listStyle.listBtn}>View</Text>
                            <DotIcon name='dots-three-vertical' size={16} color='#47535E' />
                        </View>
                    </View>
                </View><View style={listStyle.listFooterConatiner}>
                    <View style={listStyle.listContainer}>
                        <View style={listStyle.listSubContainer}>
                            <Image
                                source={logo}
                                style={listStyle.listLogoImg}
                            />
                            <View>
                                <Text style={listStyle.listTitleText}>Tata Counsultancy Services </Text>
                                <Text style={listStyle.listCityText}>Indore</Text>
                            </View>
                        </View>
                        <View style={listStyle.listBtnContainer}>
                            <Text style={listStyle.listBtn}>View</Text>
                            <DotIcon name='dots-three-vertical' size={16} color='#47535E' />
                        </View>
                    </View>
                </View><View style={listStyle.listFooterConatiner}>
                    <View style={listStyle.listContainer}>
                        <View style={listStyle.listSubContainer}>
                            <Image
                                source={logo}
                                style={listStyle.listLogoImg}
                            />
                            <View>
                                <Text style={listStyle.listTitleText}>Tata Counsultancy Services </Text>
                                <Text style={listStyle.listCityText}>Indore</Text>
                            </View>
                        </View>
                        <View style={listStyle.listBtnContainer}>
                            <Text style={listStyle.listBtn}>View</Text>
                            <DotIcon name='dots-three-vertical' size={16} color='#47535E' />
                        </View>
                    </View>
                </View><View style={listStyle.listFooterConatiner}>
                    <View style={listStyle.listContainer}>
                        <View style={listStyle.listSubContainer}>
                            <Image
                                source={logo}
                                style={listStyle.listLogoImg}
                            />
                            <View>
                                <Text style={listStyle.listTitleText}>Tata Counsultancy Services </Text>
                                <Text style={listStyle.listCityText}>Indore</Text>
                            </View>
                        </View>
                        <View style={listStyle.listBtnContainer}>
                            <Text style={listStyle.listBtn}>View</Text>
                            <DotIcon name='dots-three-vertical' size={16} color='#47535E' />
                        </View>
                    </View>
                </View><View style={listStyle.listFooterConatiner}>
                    <View style={listStyle.listContainer}>
                        <View style={listStyle.listSubContainer}>
                            <Image
                                source={logo}
                                style={listStyle.listLogoImg}
                            />
                            <View>
                                <Text style={listStyle.listTitleText}>Tata Counsultancy Services </Text>
                                <Text style={listStyle.listCityText}>Indore</Text>
                            </View>
                        </View>
                        <View style={listStyle.listBtnContainer}>
                            <Text style={listStyle.listBtn}>View</Text>
                            <DotIcon name='dots-three-vertical' size={16} color='#47535E' />
                        </View>
                    </View>
                </View><View style={listStyle.listFooterConatiner}>
                    <View style={listStyle.listContainer}>
                        <View style={listStyle.listSubContainer}>
                            <Image
                                source={logo}
                                style={listStyle.listLogoImg}
                            />
                            <View>
                                <Text style={listStyle.listTitleText}>Tata Counsultancy Services </Text>
                                <Text style={listStyle.listCityText}>Indore</Text>
                            </View>
                        </View>
                        <View style={listStyle.listBtnContainer}>
                            <Text style={listStyle.listBtn}>View</Text>
                            <DotIcon name='dots-three-vertical' size={16} color='#47535E' />
                        </View>
                    </View>
                </View><View style={listStyle.listFooterConatiner}>
                    <View style={listStyle.listContainer}>
                        <View style={listStyle.listSubContainer}>
                            <Image
                                source={logo}
                                style={listStyle.listLogoImg}
                            />
                            <View>
                                <Text style={listStyle.listTitleText}>Tata Counsultancy Services </Text>
                                <Text style={listStyle.listCityText}>Indore</Text>
                            </View>
                        </View>
                        <View style={listStyle.listBtnContainer}>
                            <Text style={listStyle.listBtn}>View</Text>
                            <DotIcon name='dots-three-vertical' size={16} color='#47535E' />
                        </View>
                    </View>
                </View>
                {/* ============================================= */}
            </ScrollView>
        </View>
    )
};
