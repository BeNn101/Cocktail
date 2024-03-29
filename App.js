import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ImageBackground,Button,Image, View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


function HomeScreen() {
  const [cocktails, setCocktails] = React.useState([]);

  React.useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a')
      .then(response => response.json())
      .then(data => {
        setCocktails(data.drinks || []); 
      })
      .catch(error => {
        console.error('Error fetching cocktails:', error);
      });
  }, []);

  const renderCocktail = ({ item }) => (
    <View style={styles.card}>
      <Text>{item.strDrink}</Text>
    </View>
  );

  return (
    <ImageBackground
      source={require('./img/back.jpg')} 
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        <FlatList
          data={cocktails}
          renderItem={renderCocktail}
          keyExtractor={item => item.idDrink}
          numColumns={2}
        />
      </SafeAreaView>
    </ImageBackground>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
  card: {
    flex: 1,
    margin: 10,
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});

