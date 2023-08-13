import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Screens/Home';
import Splash from './Screens/Splash'
import Notification from './Screens/Notification';
import CreateNote from './Screens/CreateNote';
import DetailNote from './Screens/DetailNote';
import Category from './Screens/Category';
import Search from './Screens/Search';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName='Spash' screenOptions={{ headerShown: false, drawerStyle: { backgroundColor: '#fff', paddingTop: 0 } }}
        drawerContent={(props) => {
          return (
            <SafeAreaView>
              <Image source={require('./assets/logoo.png')} style={{ width: 200, height: 150, marginLeft: 10 }} />
              <DrawerItemList {...props} />
            </SafeAreaView>
          )
        }}>

        <Drawer.Screen name="Home" component={Home} options={{
          drawerLabel: ({ focused }) => (
            <View>
              <Text style={{
                fontSize: 16,
                color: focused ? '#fff' : '#888888',
                fontStyle: 'italic',
              }}>Trang chủ</Text>
            </View>

          ),
          drawerIcon: ({ focused }) => (
            <View>
              <Image source={require('./assets/house.png')}
                resizeMode='contain'
                style={{
                  width: 25, height: 25,
                  tintColor: focused ? '#fff' : '#888888'
                }}
              ></Image>
            </View>
          ),
          drawerActiveBackgroundColor: '#5271ff',
        }} />
        <Drawer.Screen name="Search" component={Search} options={{
          drawerLabel: ({ focused }) => (
            <View>
              <Text style={{
                fontSize: 16,
                color: focused ? '#fff' : '#888888',
                fontStyle: 'italic',
              }}>Tìm kiếm</Text>
            </View>

          ),
          drawerIcon: ({ focused }) => (
            <View>
              <Image source={require('./assets/magnifying-glass.png')}
                resizeMode='contain'
                style={{
                  width: 25, height: 25,
                  tintColor: focused ? '#fff' : '#888888'
                }}
              ></Image>
            </View>
          ),
          drawerActiveBackgroundColor: '#5271ff',
        }} />
        <Drawer.Screen name="Notification" component={Notification} options={{
          drawerLabel: ({ focused }) => (
            <View>
              <Text style={{
                fontSize: 16,
                color: focused ? '#fff' : '#888888',
                fontStyle: 'italic',
              }}>Thông báo</Text>
            </View>

          ),
          drawerIcon: ({ focused }) => (
            <View>
              <Image source={require('./assets/bell.png')}
                resizeMode='contain'
                style={{
                  width: 25, height: 25,
                  tintColor: focused ? '#fff' : '#888888'
                }}
              ></Image>
            </View>
          ),
          drawerActiveBackgroundColor: '#5271ff',

        }} />
        <Drawer.Screen name="Category" component={Category} options={{
          drawerLabel: ({ focused }) => (
            <View>
              <Text style={{
                fontSize: 16,
                color: focused ? '#fff' : '#888888',
                fontStyle: 'italic',
              }}>Danh mục</Text>
            </View>

          ),
          drawerIcon: ({ focused }) => (
            <View>
              <Image source={require('./assets/category.png')}
                resizeMode='contain'
                style={{
                  width: 25, height: 25,
                  tintColor: focused ? '#fff' : '#888888'
                }}
              ></Image>
            </View>
          ),
          drawerActiveBackgroundColor: '#5271ff',

        }} />
        <Drawer.Screen name="Splash" component={Splash} options={{ drawerLabel: () => null }} />
        <Drawer.Screen name="CreateNote" component={CreateNote} options={{ drawerLabel: () => null }} />
        <Drawer.Screen name="DetailNote" component={DetailNote} options={{ drawerLabel: () => null }} />

      </Drawer.Navigator>

    </NavigationContainer>


  );
}

const styles = StyleSheet.create({
});
