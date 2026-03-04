import { Image, ScrollView, StyleSheet, Text } from 'react-native'

export default function HomeScreen() {
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.title}>🧰 Caja de Herramientas</Text>
			<Image
				source={require('../../assets/images/caja.png')}
				style={styles.image}
			/>
			<Text style={styles.subtitle}>Tu app todo-en-uno</Text>
			<Text style={styles.desc}>
				Predice género y edad, busca universidades, consulta el clima, explora
				Pokémon y más.
			</Text>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		backgroundColor: '#1a1a2e',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 24,
	},
	title: {
		fontSize: 28,
		fontWeight: 'bold',
		color: '#e94560',
		marginBottom: 24,
	},
	image: {
		width: 260,
		height: 260,
		borderRadius: 20,
		borderWidth: 3,
		borderColor: '#e94560',
	},
	subtitle: { fontSize: 20, color: '#fff', marginTop: 20, fontWeight: '600' },
	desc: {
		fontSize: 14,
		color: '#aaa',
		textAlign: 'center',
		marginTop: 10,
		lineHeight: 22,
	},
})
