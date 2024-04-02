import { useRef } from 'react';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getPermissions } from '@/utils/getPermissions';

export default function HomeScreen() {
  const webviewRef = useRef<WebView>(null);

  const handleMessage = async ({ nativeEvent }: WebViewMessageEvent) => {
    const { type, payload } = JSON.parse(nativeEvent.data);

    switch (type) {
      case 'PERMISSION': {
        await getPermissions('camera');
        await getPermissions('photoLibrary');
        break;
      }
    }
  };

  return (
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
        onMessage={handleMessage}
        originWhitelist={['*']}
        allowsBackForwardNavigationGestures
        javaScriptEnabled
      />
    </SafeAreaView>
  );
}
