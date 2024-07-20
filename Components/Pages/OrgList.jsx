import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import logo from '../../assets/TCS.jpg';
import { Image } from 'react-native-elements';
import DotIcon from 'react-native-vector-icons/Entypo';
import { listStyle } from '../Styles/listStyle';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AddIcon from 'react-native-vector-icons/MaterialIcons';

export default function OrgList({ navigation }) {
    return (
        <View style={listStyle.listMainContainer}>
            <View style={listStyle.listHeaderContainer}>
                <View style={styles.addStyle}>
                    <Text style={listStyle.listHeading}>Organization</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AddOrganization')}
                    >
                        <AddIcon name='add' size={28} color='#000' style={listStyle.listAddStyle} />
                    </TouchableOpacity>
                </View>
                <TextInput
                    style={listStyle.searchInputStyle}
                    placeholder='Search Organization...'
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
                                <Text style={listStyle.listSubTitleText}>Indore</Text>
                            </View>
                        </View>
                        <View style={listStyle.listBtnContainer}>
                            <TouchableOpacity
                                style={listStyle.btnStyle}
                                onPress={() => navigation.navigate('EmployeeList')}
                            >
                                <Text style={listStyle.listBtn}>View</Text>
                            </TouchableOpacity>
                            <DotIcon name='dots-three-vertical' size={18} color='#47535E' />
                        </View>
                    </View>
                </View>

                {/* ===================================== */}
                <View style={listStyle.listFooterConatiner}>
                    <View style={listStyle.listContainer}>
                        <View style={listStyle.listSubContainer}>
                            <Image
                                source={logo}
                                style={listStyle.listLogoImg}
                            />
                            <View>
                                <Text style={listStyle.listTitleText}>Tata Counsultancy Services </Text>
                                <Text style={listStyle.listSubTitleText}>Indore</Text>
                            </View>
                        </View>
                        <View style={listStyle.listBtnContainer}>
                            <TouchableOpacity
                                style={listStyle.btnStyle}
                                onPress={() => navigation.navigate('EmployeeList')}
                            >
                                <Text style={listStyle.listBtn}>View</Text>
                            </TouchableOpacity>
                            <DotIcon name='dots-three-vertical' size={18} color='#47535E' />
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
                                <Text style={listStyle.listSubTitleText}>Indore</Text>
                            </View>
                        </View>
                        <View style={listStyle.listBtnContainer}>
                            <TouchableOpacity
                                style={listStyle.btnStyle}
                                onPress={() => navigation.navigate('EmployeeList')}
                            >
                                <Text style={listStyle.listBtn}>View</Text>
                            </TouchableOpacity>
                            <DotIcon name='dots-three-vertical' size={18} color='#47535E' />
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
                                <Text style={listStyle.listSubTitleText}>Indore</Text>
                            </View>
                        </View>
                        <View style={listStyle.listBtnContainer}>
                            <TouchableOpacity
                                style={listStyle.btnStyle}
                                onPress={() => navigation.navigate('EmployeeList')}
                            >
                                <Text style={listStyle.listBtn}>View</Text>
                            </TouchableOpacity>
                            <DotIcon name='dots-three-vertical' size={18} color='#47535E' />
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
                                <Text style={listStyle.listSubTitleText}>Indore</Text>
                            </View>
                        </View>
                        <View style={listStyle.listBtnContainer}>
                            <TouchableOpacity
                                style={listStyle.btnStyle}
                                onPress={() => navigation.navigate('EmployeeList')}
                            >
                                <Text style={listStyle.listBtn}>View</Text>
                            </TouchableOpacity>
                            <DotIcon name='dots-three-vertical' size={18} color='#47535E' />
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
                                <Text style={listStyle.listSubTitleText}>Indore</Text>
                            </View>
                        </View>
                        <View style={listStyle.listBtnContainer}>
                            <TouchableOpacity
                                style={listStyle.btnStyle}
                                onPress={() => navigation.navigate('EmployeeList')}
                            >
                                <Text style={listStyle.listBtn}>View</Text>
                            </TouchableOpacity>
                            <DotIcon name='dots-three-vertical' size={18} color='#47535E' />
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
                                <Text style={listStyle.listSubTitleText}>Indore</Text>
                            </View>
                        </View>
                        <View style={listStyle.listBtnContainer}>
                            <TouchableOpacity
                                style={listStyle.btnStyle}
                                onPress={() => navigation.navigate('EmployeeList')}
                            >
                                <Text style={listStyle.listBtn}>View</Text>
                            </TouchableOpacity>
                            <DotIcon name='dots-three-vertical' size={18} color='#47535E' />
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
                                <Text style={listStyle.listSubTitleText}>Indore</Text>
                            </View>
                        </View>
                        <View style={listStyle.listBtnContainer}>
                            <TouchableOpacity
                                style={listStyle.btnStyle}
                                onPress={() => navigation.navigate('EmployeeList')}
                            >
                                <Text style={listStyle.listBtn}>View</Text>
                            </TouchableOpacity>
                            <DotIcon name='dots-three-vertical' size={18} color='#47535E' />
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
                                <Text style={listStyle.listSubTitleText}>Indore</Text>
                            </View>
                        </View>
                        <View style={listStyle.listBtnContainer}>
                            <TouchableOpacity
                                style={listStyle.btnStyle}
                                onPress={() => navigation.navigate('EmployeeList')}
                            >
                                <Text style={listStyle.listBtn}>View</Text>
                            </TouchableOpacity>
                            <DotIcon name='dots-three-vertical' size={18} color='#47535E' />
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
                                <Text style={listStyle.listSubTitleText}>Indore</Text>
                            </View>
                        </View>
                        <View style={listStyle.listBtnContainer}>
                            <TouchableOpacity
                                style={listStyle.btnStyle}
                                onPress={() => navigation.navigate('EmployeeList')}
                            >
                                <Text style={listStyle.listBtn}>View</Text>
                            </TouchableOpacity>
                            <DotIcon name='dots-three-vertical' size={18} color='#47535E' />
                        </View>
                    </View>
                </View>
                {/* ============================ */}

            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    addStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});