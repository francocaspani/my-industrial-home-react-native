import { View, Text,StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

function SignUpScreen() {
    return (
        <WebView 
        style={styles.container}
        source={{ uri: 'https://my-industrial-home-challange-mind-hub.vercel.app/signup' }}
      />
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });


export default SignUpScreen