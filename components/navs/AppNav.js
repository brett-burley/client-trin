import * as React from 'react';
import { StyleSheet, Text, Pressable, View } from 'react-native';
import {
  NavigationHelpersContext,
  useNavigationBuilder,
  TabRouter,
  TabActions,
  createNavigatorFactory,
} from '@react-navigation/native';
import ErrorBoundary from '../layout/ErrorBoundary';


const state = {
  type: 'tab',
  key: 'app-tabs',
  routeNames: ['Home', 'Webpage'],
  routes: [
    { key: 'Home', name: 'Home' },
    { key: 'Webpage', name: 'Webpage' },
  ],
  index: 1,
  stale: false,
};


function TabNavigator({
  initialRouteName,
  children,
  screenOptions,
  tabBarStyle,
  contentStyle,
}) {
  const { state, navigation, descriptors, NavigationContent } =
    useNavigationBuilder(TabRouter, {
      children,
      screenOptions,
      initialRouteName,
    });

  return (
    <NavigationContent>
      <View style={[{ flexDirection: 'row' }, tabBarStyle]}>
        {state.routes.map((route) => (
          <Pressable
            key={route.key}
            onPress={() => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!event.defaultPrevented) {
                navigation.dispatch({
                  ...TabActions.jumpTo(route.name),
                  target: state.key,
                });
              }
            }}
            style={{ flex: 1 }}
          >
            <Text>{descriptors[route.key].options.title || route.name}</Text>
          </Pressable>
        ))}
      </View>
      <View style={[{ flex: 1 }, contentStyle]}>
        {state.routes.map((route, i) => {
          return (
            <View
              key={route.key}
              style={[
                StyleSheet.absoluteFill,
                { display: i === state.index ? 'flex' : 'none' },
              ]}
            >
            <ErrorBoundary>
              {descriptors[route.key].render()}
            </ErrorBoundary>
            </View>
          );
        })}
      </View>
    </NavigationContent>
  );
}
export const createAppNavigator = createNavigatorFactory(TabNavigator);
