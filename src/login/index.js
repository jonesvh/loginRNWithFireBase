import React, { Component } from 'react';

import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Animated, Easing } from 'react-native';
import firebase from 'react-native-firebase';

export default class login extends Component {

    state = {
        email: '',
        password: '',

        //animated
        h: new Animated.Value(0)
    }

    componentDidMount(){
        Animated.timing(
            this.state.h,
            {
                toValue:500,
                duration:2000,
                easing:Easing.bounce,
            }
        ).start()
    }

    render() {
        return (
            <>
                <View style={styles.container}>
                    <Animated.View style={[styles.title, {height:this.state.h}]}>
                        <Text style={styles.titleText}>Login Com FireBase</Text>
                    </Animated.View>
                    <View style={styles.campos}>
                        <TextInput
                            style={styles.input}
                            placeholder={'Digite seu e-mail'}
                            placeholderTextColor={'#708090'}
                            onChangeText={(email) => {
                                this.setState({ email })
                            }
                            }
                            value={this.state.email}
                        ></TextInput>
                        <TextInput
                            style={styles.input}
                            placeholder={'Digite sua senha'}
                            placeholderTextColor={'#708090'}
                            onChangeText={(password) => {
                                this.setState({ password })
                            }
                            }
                            value={this.state.password}
                            secureTextEntry={true}
                        ></TextInput>
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            this.login()
                        }}
                    >
                        <Text style={styles.buttonText}>Logar</Text>
                    </TouchableOpacity>
                </View>
            </>

        )
    }

    login = async () => {
        const { email, password } = this.state

        try {
            const user = await firebase.auth().signInWithEmailAndPassword(email, password)
            Alert.alert(user.user.email + ' está logado :)')
            //console.log(user)
        } catch (e) {
            Alert.alert(e.toString())
            this.setState({ password: '' })

            //console.log(e.toString())
        }
    }

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: '#FFE4E1'
    },
    title: {
        backgroundColor: '#111',
        justifyContent: "center",
        alignSelf: "stretch",
        borderBottomRightRadius: 1000,
        borderBottomLeftRadius: 1000,
        marginBottom: 100
    },
    titleText: {
        color: '#fff',
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 30,
    },
    campos: {
        textAlign: "center",
    },
    input: {
        width: 300,
        height: 45,
        backgroundColor: '#fff',
        borderRadius: 25,
        margin: 5,
        paddingLeft: 15,
        fontSize: 15
    },
    button: {
        width: 200,
        height: 45,
        marginTop: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#111',
        borderRadius: 25
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15
    }
})