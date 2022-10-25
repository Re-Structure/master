import { StatusBar } from "expo-status-bar";
import { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Alert,
  Image,
  Button,
  SafeAreaView,
  FlatList,
  ScrollView,
  TextInput,
  TouchableHighlight,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { Entypo, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';

/*
<SafeAreaView style={styles.container}>
        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
        <Button title="Share" onPress={sharePic} />
        {hasMediaLibraryPermission ? <Button title="Save" onPress={savePhoto} /> : undefined}
        <Button title="Discard" onPress={() => setPhoto(undefined)} />
      </SafeAreaView>
*/




// function MyTabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Map" options={{ 
//           headerShown: false,
//           tabBarLabel: "Map",
//           tabBarIcon: ({ color, size }) => (
//             <Entypo name="map" size={size} color={color} />
//           ),
//         }} component={MapScreen} />
//       <Tab.Screen name="report" options={{ 
//         headerShown: false,
//         tabBarLabel: "Report",
//           tabBarIcon: ({ color, size }) => (
//             <MaterialIcons name="report" size={size} color={color} />
//           ),
//          }} component={ReportScreen} />
//       <Tab.Screen name="history" options={{ 
//         headerShown: false,
//         tabBarLabel: "History",
//           tabBarIcon: ({ color, size }) => (
//             <AntDesign name="calendar" size={size} color={color} />
//           ), }} component={HistoryScreen} />
//     </Tab.Navigator>
//   );
// }

export default function App() {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const [screenNumber, setScreenNumber] = useState(1);
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();
  const [initialLat, setInitialLat] = useState(37.0902);
  const [initialLon, setInitialLon] = useState(-95.7129);
  const [initialLatDelta, setInitialLatDelta] = useState(30);
  const [initialLonDelta, setInitialLonDelta] = useState(60.0099);
  const [followUserLocationBoolean, setFollowUserLocationBoolean] = useState(true);
  const [coordinates, setCoordinates] = useState([]);
  const [navigatorColor1, setNavigatorColor1] = useState('black');
  const [navigatorColor2, setNavigatorColor2] = useState('#949494');
  const [navigatorColor3, setNavigatorColor3] = useState('#949494');
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();
  const [itemId, setItemId] = useState(1);
  const [description, setDescription] = useState();
  const [storedImages, setStoredImages] = useState([])
  const [data, setData] = useState([
    
  ])

  function changeScreens(x){
    if (x == 1){
      setScreenNumber(1);
      setNavigatorColor1('black')
      setNavigatorColor2('#949494')
      setNavigatorColor3('#949494')
    }
    if (x == 2){
      setScreenNumber(2);
      setNavigatorColor1('#949494')
      setNavigatorColor2('black')
      setNavigatorColor3('#949494')
    }
    if (x == 3){
      setScreenNumber(3);
      setNavigatorColor1('#949494')
      setNavigatorColor2('#949494')
      setNavigatorColor3('black')
    }
  }


  function setLocation(e) {
    setLatitude(e.nativeEvent.coordinate.latitude);
    setLongitude(e.nativeEvent.coordinate.longitude);
    var c = e.nativeEvent.coordinate;
    var temp = [];
    for (let i = 0; i < coordinates.length; i++) {
      temp.push(coordinates[i]);
    }
    temp.push({
      latitude: c.latitude,
      longitude: c.longitude,
    });
    setCoordinates(temp);
  }
  
  function changeMapView(region) {
    setInitialLat(region.latitude);
    setInitialLon(region.longitude);
    setInitialLatDelta(region.latitudeDelta);
    setInitialLonDelta(region.longitudeDelta);
  }

  function retakePhoto (){
    let temp = data;
    temp.pop();
    setData(temp);
    setPhoto(undefined);
  }

  let cameraRef = useRef();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text style={{top: 300, left: 10}}>Requesting permissions...</Text>
  } else if (!hasCameraPermission) {
    return <Text style={{top: 300, left: 10}}>Permission for camera not granted. Please change this in settings.</Text>
  }

  const takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
    let temp = storedImages;
    temp.push(newPhoto.uri);
    setStoredImages(temp);
    var adjust = {
      image: newPhoto.uri,
      longitude: longitude,
      latitude: latitude,
      key: itemId.toString()
    }
    setItemId(itemId + 1);
    let adding = data;
    adding.push(adjust)
    setData(adding);
    console.log(adding);
  };

  function addPhoto(){
    changeScreens(1);
    setPhoto(undefined)
  }

  const NavigatorCode = () => {
    return(
      <View style={{flex: 0.12}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <TouchableOpacity
            onPress={() => changeScreens(1)}
            style={{flex: 1, alignSelf: 'center'}}
            >
              <Entypo name="map" size={40} color={navigatorColor1} />
            </TouchableOpacity>
            <Text style={{textAlign: 'center', bottom: '25%', fontWeight: 'bold', color: navigatorColor1}}>
              Map
            </Text>
          </View>
          <View style={{flex: 1}}>
            <TouchableOpacity
            onPress={() => changeScreens(2)}
            style={{flex: 1, alignSelf: 'center'}}
            >
              <MaterialIcons name="report" size={40} color={navigatorColor2} />
            </TouchableOpacity>
            <Text style={{textAlign: 'center', bottom: '25%', fontWeight: 'bold', color: navigatorColor2}}>
              Report
            </Text>
          </View>
          <View style={{flex: 1}}>
            <TouchableOpacity
            onPress={() => changeScreens(3)}
            style={{flex: 1, alignSelf: 'center'}}
            >
              <AntDesign name="calendar" size={40} color={navigatorColor3} />
            </TouchableOpacity>
            <Text style={{textAlign: 'center', bottom: '25%', fontWeight: 'bold', color: navigatorColor3}}>
              History
            </Text>
          </View>
        </View>
      </View>
    )
  }



  //Map Screen
  if (screenNumber == 1){
    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            mapType="hybrid"
            showsUserLocation
            //followsUserLocation={followUserLocationBoolean}
            showsPointsOfInterest
            showsCompass
            onRegionChange={(region) => changeMapView(region)}
            onUserLocationChange={(e) => setLocation(e)}
            initialRegion={{
              latitude: initialLat,
              longitude: initialLon,
              latitudeDelta: initialLatDelta,
              longitudeDelta: initialLonDelta,
            }}
          >
            <Marker coordinate={{ latitude: 40.72886598967254, longitude: -73.99054946724266 }}>
              <View 
                style={{height: 100, width: 65, backgroundColor: 'black', alignSelf: 'center', justifyContent: 'center', alignItems: 'center'}}
              >
                <TouchableOpacity 
                  style={{flex: 1}}
                >
                  <Image source={{ uri: storedImages[0] }} style={{height: 95, width: 60, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', top: 2.5}} resizeMode={'fit'}/>
                </TouchableOpacity>
              </View>
            </Marker>
          </MapView>
        </View>
        <NavigatorCode/>
      </View>
    );
  }




  //Camera Screen
  else if (screenNumber == 2){
    if (photo) {
      let sharePic = () => {
        shareAsync(photo.uri).then(() => {
          setPhoto(undefined);
        });
      };
  
      let savePhoto = () => {
        MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
          setPhoto(undefined);
        });
      };
      
      //Report Details Screen
      return (
        <View style={{flex: 1}}>
          <SafeAreaView style={{flex: 1}}>
            <View style={{flex: 1, backgroundColor: 'green'}}>
              <TouchableOpacity
              onPress={() => retakePhoto()}
              style={{flex: 1, alignSelf: 'center', backgroundColor: 'red', }}
              >
                <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 40, top: '21%'}}>
                  Retake
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 3, backgroundColor: 'blue'}}>
              <TouchableOpacity
              style={{flex: 1}}
              onPress={() => setScreenNumber(2.5)}
              >
                <ImageBackground
                  style={{flex: 1}}
                  resizeMode={'contain'}
                  source={{ uri: storedImages[storedImages.length - 1] }}
                />
              </TouchableOpacity>
            </View>
            <View style={{flex: 0.5, backgroundColor: 'orange'}}>
              <TextInput 
                style={styles.input}
                placeholder="useless placeholder"
                onChangeText={(x) => setDescription(x)}
                keyboardType="default"
              />
            </View>
            <View style={{flex: 2.5, backgroundColor: 'green'}}>
               
            </View>
            <View style={{flex: 1, backgroundColor: 'yellow'}}>
              <TouchableOpacity
              onPress={() => addPhoto(photo)}
              style={{justifyContent: 'center', alignItems: 'center', alignSelf: 'center', width: '40%', height: '80%'}}
              >
                <Text style={{textAlign: 'center', fontSize: 30, fontWeight: 'bold'}}>Submit</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
          <NavigatorCode/>
        </View>
        
      );
    }
    

    //Image taking (camera) screen
    return (
      <Camera style={styles.container} ref={cameraRef}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{ alignSelf: 'center', justifyContent:'center', top: '86.69420%', backgroundColor: 'white', height: 80, width: 80, borderRadius: 160 }}
          >
            <View
            style={{ alignSelf: 'center', justifyContent:'center', backgroundColor: 'black', height: 75, width: 75, borderRadius: 150 }}
            >
              <TouchableOpacity
              style={{ alignSelf: 'center', justifyContent:'center', backgroundColor: 'white', height: 70, width: 70, borderRadius: 140 }}
              onPress={takePic}
              />
            </View>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </Camera>
    );
  }



  //Image Preview Screen
  else if (screenNumber == 2.5){
    return(
      <View style={{flex: 1}}>
        <ImageBackground
        style={{flex: 1}}
        resizeMode={'contain'}
        source={{ uri: storedImages[storedImages.length - 1] }}
        />
        <TouchableOpacity
        onPress={() => setScreenNumber(2)}
        style={{position: 'absolute', height: '7%', width: '35%', left: '5%', top: '7%'}}
        >
          <Text style={{fontWeight: 'bold', fontSize: 30}}>
            {'<-- Back'}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  
  //History Screen
  else if (screenNumber == 3){
    return(
      <View style={{flex: 1, width: '100%'}}>
        <SafeAreaView style={{flex: 1, width: '100%'}}>
          <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 30}}>
            History
          </Text>
          <FlatList
          data={data}
          renderItem={({ item }) => (
            <View
              style={{
              width: '90%',
              height: 300,
              alignSelf: 'center',
              marginVertical: 20,
              borderRadius: 20,
              borderColor: 'black',
              borderWidth: 4,
            }}
            >
              <View style={{flex: 1}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flex: 1.5, backgroundColor: 'green', paddingVertical: 5}}>
                    <ImageBackground
                    style={{flex: 1}}
                    resizeMode={'contain'}
                    source={{ uri: item.image }}
                    />
                  </View>
                  <View style={{flex: 2, backgroundColor: 'red'}}>
                    <View style={{flex: 1, flexDirection: 'column'}}>
                      <View style={{flex: 1, backgroundColor: 'orange'}}> 
                        <Text style={{fontWeight: 'bold', fontSize: 13}}>Lat: {item.latitude}</Text>
                      </View>
                      <View style={{flex: 1, backgroundColor: 'blue'}}> 
                        <Text style={{fontWeight: 'bold', fontSize: 13}}>Lon: {item.longitude}</Text>
                      </View>
                      <View style={{flex: 8, backgroundColor: 'pink'}}> 
                        
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}
          keyExtractor={({ id }) => {
            return id;
          }}
          />
        </SafeAreaView>
        <NavigatorCode/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  input: {
    height: 40,
    marginVertical: '0.8%',
    borderWidth: 1,
    width: '95%',
    alignSelf: 'center',
    padding: 10,
    backgroundColor: '#949494',
    borderRadius: 15
  },
});