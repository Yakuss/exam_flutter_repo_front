import React,{useState,useEffect} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import * as LocalAuthentication from 'expo-local-authentication';
import Icon from 'react-native-vector-icons/Feather';
import { useUserId } from './UserIdContext'; // Import useUserId hook

const Start = ({navigation,route}) => {
    const { userId } = useUserId(); // Use userId from context
    const [isBiometricSupported, setIsBiometricSupported] = React.useState(false);
    const [fingerprint, setFingerprint] = useState(false)

    useEffect(() => {
        (async () => {
            
            const compatible = await LocalAuthentication.hasHardwareAsync();
            setIsBiometricSupported(compatible);
            const enroll =await LocalAuthentication.isEnrolledAsync()
            if(enroll){
                setFingerprint(true)
            }
        })();
    },[]);

    const handle = async()=>{
        try {
            const biometricAuth = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Login with Biometrics',
                disableDeviceFallback: true,
                cancelLabel: 'Cancel'
            });
            if(biometricAuth.success){
                // If userId is null, use 5 as the default value
                const id = userId !== null ? userId : 10;
                navigation.navigate("HomeScreen",{userId: id})
            }
        } catch (error) {
            console.log(error) 
        }
    };

    const goBack = () => {
        navigation.goBack();
      };

    return (
        <View style={styles.start}>
            <TouchableOpacity onPress={goBack} style={styles.arrow}>
                <Icon name="arrow-left" size={30} color="black" />
            </TouchableOpacity>
            
            <View style={{justifyContent:"center",flex:1,alignItems:"center"}}>
                {isBiometricSupported && fingerprint?(
                    <TouchableOpacity onPress={handle}><Text style={styles.button}>Go To Main Menu</Text></TouchableOpacity>
                ):(<View><Text>fingerprint not supported/ allocated</Text></View>)}
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    heading:{
        height:300,
        alignItems:"center",
        justifyContent:"center",
    },
    emoji:{
        alignItems:"center",
        justifyContent:"center",
    },
    headingtext:{
        fontSize:40,
    },
    start:{
        flex:1,
        color:"black",
        backgroundColor:"#FFDFD3"
    },
    button:{
        borderColor:"grey",
        borderWidth:1,
        borderRadius:5,
        padding:10,
        fontSize:20
    },
    arrow: {
        marginLeft: 20,
        alignSelf: 'flex-start',
        marginBottom:10,
        marginTop:40,
        width:40
      },
})

export default Start
