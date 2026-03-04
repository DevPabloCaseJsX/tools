import { useState } from 'react'
import {
	ActivityIndicator,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'

const ETAPAS = {
	joven: {
		label: 'Joven 🧑',
		color: '#27ae60',
		img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400',
	},
	adulto: {
		label: 'Adulto 👨',
		color: '#e67e22',
		img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
	},
	anciano: {
		label: 'Anciano 👴',
		color: '#8e44ad',
		img: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=400',
	},
}

function getEtapa(age) {
	if (age < 30) return 'joven'
	if (age < 60) return 'adulto'
	return 'anciano'
}

export default function EdadScreen() {
	const [nombre, setNombre] = useState('')
	const [resultado, setResultado] = useState(null)
	const [cargando, setCargando] = useState(false)

	const buscar = async () => {
		if (!nombre.trim()) return
		setCargando(true)
		setResultado(null)
		try {
			const res = await fetch(`https://api.agify.io/?name=${nombre}`)
			const data = await res.json()
			setResultado(data)
		} catch {}
		setCargando(false)
	}

	const etapa = resultado?.age ? ETAPAS[getEtapa(resultado.age)] : null

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.title}>Predice la Edad</Text>
			<TextInput
				style={styles.input}
				placeholder='Escribe un nombre...'
				placeholderTextColor='#888'
				value={nombre}
				onChangeText={setNombre}
			/>
			<TouchableOpacity style={styles.btn} onPress={buscar}>
				<Text style={styles.btnText}>Predecir</Text>
			</TouchableOpacity>

			{cargando && (
				<ActivityIndicator
					size='large'
					color='#e94560'
					style={{ marginTop: 30 }}
				/>
			)}

			{etapa && (
				<View style={[styles.card, { borderColor: etapa.color }]}>
					<Image source={{ uri: etapa.img }} style={styles.image} />
					<Text style={[styles.etapaLabel, { color: etapa.color }]}>
						{etapa.label}
					</Text>
					<Text style={styles.edadNum}>{resultado.age} años</Text>
				</View>
			)}
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		backgroundColor: '#1a1a2e',
		alignItems: 'center',
		padding: 24,
		paddingTop: 40,
	},
	title: { fontSize: 26, fontWeight: 'bold', color: '#fff', marginBottom: 24 },
	input: {
		width: '100%',
		backgroundColor: '#ffffff15',
		borderRadius: 12,
		padding: 14,
		color: '#fff',
		fontSize: 16,
		borderWidth: 1,
		borderColor: '#ffffff33',
		marginBottom: 16,
	},
	btn: {
		backgroundColor: '#e94560',
		borderRadius: 12,
		paddingVertical: 14,
		paddingHorizontal: 40,
	},
	btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
	card: {
		marginTop: 30,
		alignItems: 'center',
		borderWidth: 3,
		borderRadius: 20,
		padding: 20,
		width: '100%',
	},
	image: { width: 200, height: 200, borderRadius: 100 },
	etapaLabel: { fontSize: 28, fontWeight: 'bold', marginTop: 16 },
	edadNum: { fontSize: 22, color: '#fff', marginTop: 6 },
})
