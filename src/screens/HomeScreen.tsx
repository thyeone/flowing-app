import { useRef } from 'react';
import WebView from 'react-native-webview';
import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const webviewRef = useRef<WebView>(null);

  // const windowWidth = Dimensions.get('window').width;
  // const windowHeight = Dimensions.get('window').height;

  // const handleMessage = async ({ nativeEvent }: WebViewMessageEvent) => {
  //   try {
  //     const { type, data } = JSON.parse(nativeEvent.data);
  //     console.log(type, data);
  //   } catch (error) {}
  // };

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}
      >
        <WebView
          source={{ uri: 'http://localhost:3000' }}
          style={{ flex: 1 }}
          ref={webviewRef}
          originWhitelist={['*']}
          allowsBackForwardNavigationGestures
          javaScriptEnabled
        />
      </SafeAreaView>
    </>
  );
}
