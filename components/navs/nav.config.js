function getScreenOptions(theme)
{
  return {
    headerStyle: {
      backgroundColor: theme.colors.grey5,
    },
    tabBarStyle: {
      backgroundColor: theme.colors.grey5,
    },
    tabBarLabelStyle: {
      fontSize: 22,
      marginLeft: 25,
    },
    tabBarActiveTintColor: theme.colors.warning,
    tabBarInactiveTintColor: theme.colors.black,
    headerTintColor: '#fff',
  }
};


const hideTab = {
  headerShown: false,
  tabBarShowLabel: false,
  tabBarStyle: { display: 'none' },
  tabBarItemStyle: { display: 'none' },
  tabBarLabelStyle: { display: 'none' },
  lazy: true,
}


export default { getScreenOptions, hideTab };
