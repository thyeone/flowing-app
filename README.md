RN과 Webview 환경을 구축하면서 부딪혔던 문제들을 기록합니다. 지속적으로 업데이트 될 예정입니다.

## Trouble Shooting

### iOS Webview uri를 로컬호스트로 설정했을 때 발생하는 문제
#### 문제 상황
react-native-webview source에 `http://localhost:3000`을 연결하여 시뮬레이터를 띄우는 데는 문제가 없으나, http 환경에서 통신할 때 **에러**를 반환했다.
SSR로 페칭하는 상황에서는 정상적으로 데이터를 가져오는데 성공하나, CSR로 페칭하는 상황은 모두 에러가 발생했다.
이를 통해서 유추할 수 있는 사실은 이미 백엔드에서 오리진을 뚫어줬기 때문에 CORS는 아니지만, 유사한 무언가의 **정책**이 막고 있다고 생각했다.

iOS 자체의 내부 보안 정책 **ATS**(App Transport Security)때문에 http 컨텐츠의 로드를 막고 있던 것이였다.

#### 해결 방법
1. Xcode에서 `ios/info.plist` 파일을 연다.
2. 두 가지 항목을 추가한 후 YES로 설정한다.

<img width="772" alt="Untitled" src="https://github.com/thyeone/flowing-app/assets/48711263/ece99acf-db62-44e0-988c-003feea38ea1">

3. `cd ios && pod deintegrate && pod install`를 통해 새로 빌드한다.

### Android Webview 로컬 설정 과정

#### 문제 상황
Android 환경에서 Webview로 로컬호스트를 띄우질 못한다. (하지만, http://IP주소:port 는 가능..)

#### 해결 방법
1. `android/app/src/main/res/AndroidManifest.xml` 파일에 간다. 다음과 같이 수정한다.

``` xml
<application 
 ...
 android:usesCleartextTraffic="true"
 />
```
2. 터미널에서 `adb reverse tcp:3000 tcp:3000` 명령어를 실행한다.
