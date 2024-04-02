import { RefObject } from 'react';
import { WebView } from 'react-native-webview';

export const sendMessageToWebview = (webviewRef: RefObject<WebView>, message: MessageType) => {
  if (webviewRef.current) {
    webviewRef.current.postMessage(JSON.stringify(message));
  }
};
