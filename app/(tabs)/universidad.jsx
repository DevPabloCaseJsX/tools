import { useState } from 'react'
import {
	ActivityIndicator,
	FlatList,
	Linking,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'

export default function UniversidadesScreen() {
	const [pais, setPais] = useState('')
	const [lista, setLista] = useState([])
	const [cargando, setCargando] = useState(false)
	const [buscado, setBuscado] = useState('')

	const buscar = async () => {
		if (!pais.trim()) return
		setCargando(true)
		setLista([])
		try {
			const res = await fetch(
				`https://adamix.net/proxy.php?country=${encodeURIComponent(pais)}`
			)
			const data = await res.json()
			setLista(data || [])
			setBuscado(pais)
		} catch {}
		setCargando(false)
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>🎓 Universidades</Text>
			<TextInput
				style={styles.input}
				placeholder='País en inglés (ej: Mexico)'
				placeholderTextColor='#888'
				value={pais}
				onChangeText={setPais}
			/>
			<TouchableOpacity style={styles.btn} onPress={buscar}>
				<Text style={styles.btnText}>Buscar</Text>
			</TouchableOpacity>

			{cargando && (
				<ActivityIndicator
					size='large'
					color='#e94560'
					style={{ marginTop: 20 }}
				/>
			)}
			{!cargando && buscado && lista.length === 0 && (
				<Text style={styles.noResult}>No se encontraron universidades</Text>
			)}

			<FlatList
				data={lista}
				keyExtractor={(_, i) => i.toString()}
				style={{ marginTop: 16, width: '100%' }}
				renderItem={({ item }) => (
					<View style={styles.card}>
						<Text style={styles.uniName}>{item.name}</Text>
						{item.domains?.[0] && (
							<Text style={styles.domain}>🌐 {item.domains[0]}</Text>
						)}
						{item.web_pages?.[0] && (
							<TouchableOpacity
								onPress={() => Linking.openURL(item.web_pages[0])}
							>
								<Text style={styles.link}>🔗 Visitar sitio web</Text>
							</TouchableOpacity>
						)}
					</View>
				)}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#1a1a2e', padding: 20 },
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#e94560',
		marginBottom: 16,
		textAlign: 'center',
	},
	input: {
		backgroundColor: '#ffffff15',
		borderRadius: 12,
		padding: 14,
		color: '#fff',
		fontSize: 15,
		borderWidth: 1,
		borderColor: '#ffffff33',
		marginBottom: 12,
	},
	btn: {
		backgroundColor: '#e94560',
		borderRadius: 12,
		paddingVertical: 13,
		alignItems: 'center',
	},
	btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
	card: {
		backgroundColor: '#16213e',
		borderRadius: 14,
		padding: 16,
		marginBottom: 12,
		borderLeftWidth: 4,
		borderLeftColor: '#e94560',
	},
	uniName: { color: '#fff', fontWeight: 'bold', fontSize: 15, marginBottom: 6 },
	domain: { color: '#aaa', fontSize: 13, marginBottom: 4 },
	link: { color: '#5dade2', fontSize: 13, fontWeight: '600' },
	noResult: { color: '#aaa', textAlign: 'center', marginTop: 30, fontSize: 16 },
})
