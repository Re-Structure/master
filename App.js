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
  SafeAreaView
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { Entypo, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
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



function MapScreen() {
  const [initialLat, setInitialLat] = useState(37.0902);
  const [initialLon, setInitialLon] = useState(-95.7129);
  const [initialLatDelta, setInitialLatDelta] = useState(30);
  const [initialLonDelta, setInitialLonDelta] = useState(60.0099);
  const [followUserLocationBoolean, setFollowUserLocationBoolean] = useState(true);
  const [coordinates, setCoordinates] = useState([]);
  const [running, setRunning] = useState(false);
  const [imageKeys, setImageKeys] = useState(0);
  const [data, setData] = useState(
    [
      {
        longitude: -74.5747,
        latitude: 40.8478,
        id: null,
      }
    ]
  )

  useEffect(() => {
    let temp = data;
    temp.id = imageKeys;
    setImageKeys(imageKeys + 1);
    setData(temp);
  }, [])

  function setLocation(e) {
    if (running) {
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
      console.log(temp)
    }
  }
  
  function changeMapView(region) {
    setInitialLat(region.latitude);
    setInitialLon(region.longitude);
    setInitialLatDelta(region.latitudeDelta);
    setInitialLonDelta(region.longitudeDelta);
  }

  return(
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
          <Marker coordinate={{latitude: 40.72886598967254, longitude: -73.99054946724266}}>
            <View 
              style={{height: 65, width: 65, backgroundColor: 'black', alignSelf: 'center', justifyContent: 'center', alignItems: 'center'}}
            >
              <TouchableOpacity 
                style={{flex: 1}}
              >
                <Image source={require("./Images/OkIPullUp.jpeg")} style={{height: 60, width: 60, alignSelf: 'center', justifyContent: 'center', alignItems: 'center'}}/>
              </TouchableOpacity>
            </View>
          </Marker>
        </MapView>
      </View>
  )
}

function ReportScreen() {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();

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

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    console.log(photo)
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

    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <TouchableOpacity
          onPress={() => setPhoto(undefined)}
          >
            
          </TouchableOpacity>
        </View>
        <View style={{flex: 3}}>

        </View>
        <View style={{flex: 1}}>

        </View>
        <View style={{flex: 2}}>

        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity
          onPress={() => addPhoto(photo)}
          >

          </TouchableOpacity>
        </View>
      </View>
    );
  }

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

function HistoryScreen() {
  return(
    <View style={styles.container}>
      <Text>Test3</Text>
    </View>
  )
}

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Map" options={{ 
          headerShown: false,
          tabBarLabel: "Map",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="map" size={size} color={color} />
          ),
        }} component={MapScreen} />
      <Tab.Screen name="report" options={{ 
        headerShown: false,
        tabBarLabel: "Report",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="report" size={size} color={color} />
          ),
         }} component={ReportScreen} />
      <Tab.Screen name="history" options={{ 
        headerShown: false,
        tabBarLabel: "History",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="calendar" size={size} color={color} />
          ), }} component={HistoryScreen} />
    </Tab.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
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
});
