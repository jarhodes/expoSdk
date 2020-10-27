import React, { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function ContactList() {

    const [contacts, setContacts] = useState({});

    const getContacts = async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status == 'granted') {
            const { data } = await Contacts.getContactsAsync({
                fields: [Contacts.Fields.PhoneNumbers],
            });

            if (data.length > 0) {
                setContacts(data);
                console.log(data);
            }
        }
    }


    return (
        <View style={styles.container}>
            <FlatList data={contacts} keyExtractor={item => item.id.toString()}
                        renderItem={({item}) => <View style={styles.numberItems}>
                            <Text>{item.name}</Text>
                            {item.hasOwnProperty('phoneNumbers') ? ( 
                                <Text>{item.phoneNumbers[0].number}</Text> ) : ( 
                                <Text> </Text> )}
                            </View>} />
            <View>
                <Button title="Get contacts" onPress={getContacts} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    numberItems: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
}); 