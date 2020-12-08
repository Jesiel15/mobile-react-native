import React from 'react';
import { WebView } from 'react-native-webview';

function Profile({ navigation }) {
    const githubUsername = navigation.getParam('github_username');
return <WebView style={{ flex:1 }} source ={{ uri:`https://github.com/${githubUsername}` }} />
}

export default Profile;



//PAREI EM 1:06:08 falta 29:09