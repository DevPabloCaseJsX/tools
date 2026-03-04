import {
	Image,
	Linking,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'

export default function AcercaScreen() {
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Image
				source={require('../../assets/images/pablo.jpg')}
				style={styles.foto}
			/>
			<Text style={styles.nombre}>Pablo Canario</Text>
			<Text style={styles.rol}>Desarrollador Mobile</Text>

			<View style={styles.card}>
				<Text style={styles.cardTitle}>📬 Contacto</Text>
				{[
					{
						icon: '✉️',
						text: 'pablodejesuscanariotejeda4@gmail.com',
						url: 'mailto:pablodejesuscanariotejeda4@gmail.com',
					},
					{
						icon: '💻',
						text: 'github.com/DevPabloCaseJsX',
						url: 'https://github.com/tDevPabloCaseJsX',
					},
					{
						icon: '🔗',
						text: 'linkedin.com/in/pablo-canario',
						url: 'https://www.linkedin.com/in/pablo-canario-5b8419242',
					},
					{ icon: '📞', text: '+1 (809) 123-4567', url: 'tel:+18091234567' },
				].map((item, i) => (
					<TouchableOpacity
						key={i}
						style={styles.contactRow}
						onPress={() => Linking.openURL(item.url)}
					>
						<Text style={styles.contactIcon}>{item.icon}</Text>
						<Text style={styles.contactText}>{item.text}</Text>
					</TouchableOpacity>
				))}
			</View>

			<Text style={styles.bio}>
				Apasionado por crear aplicaciones móviles funcionales y bien diseñadas.
				Disponible para proyectos freelance.
			</Text>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		backgroundColor: '#1a1a2e',
		alignItems: 'center',
		padding: 30,
	},
	foto: {
		width: 130,
		height: 130,
		borderRadius: 65,
		borderWidth: 4,
		borderColor: '#e94560',
		marginBottom: 16,
	},
	nombre: { fontSize: 26, fontWeight: 'bold', color: '#fff' },
	rol: { fontSize: 16, color: '#e94560', marginTop: 4, marginBottom: 24 },
	card: {
		backgroundColor: '#16213e',
		borderRadius: 20,
		padding: 20,
		width: '100%',
		marginBottom: 20,
		borderWidth: 1,
		borderColor: '#ffffff15',
	},
	cardTitle: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 18,
		marginBottom: 16,
	},
	contactRow: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#ffffff10',
	},
	contactIcon: { fontSize: 20, width: 36 },
	contactText: { color: '#5dade2', fontSize: 14 },
	bio: { color: '#aaa', textAlign: 'center', lineHeight: 22, fontSize: 14 },
})
