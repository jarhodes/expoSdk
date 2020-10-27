import React from 'react';
import { Button, StatusBar, StyleSheet, Text, View } from 'react-native';
import * as Contacts from 'expo-contacts';
import * as SMS from 'expo-sms';

export default function MsgTest() {

    const [contact, setContact] = React.useState({});

    const getContacts = async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status == 'granted') {
            const { data } = await Contacts.getContactsAsync({
                fields: [Contacts.Fields.PhoneNumbers]
            });

            if (data.length > 0) {
                setContact(data[0]);
            }
        }
    }

    return (
        <View>
            <Text>{contact.name}</Text>
            <Button title="Get contact" onPress={getContacts} />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})