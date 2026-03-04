import { Tabs } from 'expo-router'
import { Text } from 'react-native'

const Icon = ({ emoji }) => <Text style={{ fontSize: 18 }}>{emoji}</Text>

export default function TabsLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarStyle: {
					backgroundColor: '#1a1a2e',
					borderTopColor: '#e94560',
					borderTopWidth: 2,
					height: 65,
					paddingBottom: 8,
				},
				tabBarActiveTintColor: '#e94560',
				tabBarInactiveTintColor: '#888',
				tabBarLabelStyle: { fontSize: 10 },
				headerStyle: { backgroundColor: '#1a1a2e' },
				headerTintColor: '#fff',
				headerTitleStyle: { fontWeight: 'bold' },
			}}
		>
			<Tabs.Screen
				name='index'
				options={{ title: 'Inicio', tabBarIcon: () => <Icon emoji='🧰' /> }}
			/>
			<Tabs.Screen
				name='genero'
				options={{ title: 'Género', tabBarIcon: () => <Icon emoji='👤' /> }}
			/>
			<Tabs.Screen
				name='edad'
				options={{ title: 'Edad', tabBarIcon: () => <Icon emoji='🎂' /> }}
			/>
			<Tabs.Screen
				name='universidad'
				options={{
					title: 'Universidad',
					tabBarIcon: () => <Icon emoji='🏫' />,
				}}
			/>
			<Tabs.Screen
				name='clima'
				options={{ title: 'Clima', tabBarIcon: () => <Icon emoji='🌤️' /> }}
			/>
			<Tabs.Screen
				name='pokemon'
				options={{ title: 'Pokémon', tabBarIcon: () => <Icon emoji='⚡' /> }}
			/>
			<Tabs.Screen
				name='noticias'
				options={{ title: 'Noticias', tabBarIcon: () => <Icon emoji='📰' /> }}
			/>
			<Tabs.Screen
				name='acerca'
				options={{ title: 'Acerca', tabBarIcon: () => <Icon emoji='🙋' /> }}
			/>
		</Tabs>
	)
}
