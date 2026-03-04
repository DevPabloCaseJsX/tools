import { useState } from 'react'
import {
	ActivityIndicator,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'

export default function GeneroScreen() {
	const [nombre, setNombre] = useState('')
	const [resultado, setResultado] = useState(null)
	const [cargando, setCargando] = useState(false)

	const buscar = async () => {
		if (!nombre.trim()) return
		setCargando(true)
		setResultado(null)
		try {
			const res = await fetch(`https://api.genderize.io/?name=${nombre}`)
			const data = await res.json()
			setResultado(data)
		} catch {
			setResultado({ error: true })
		}
		setCargando(false)
	}

	const esMasculino = resultado?.gender === 'male'
	const bgColor = resultado ? (esMasculino ? '#0d2b5e' : '#5e0d3a') : '#1a1a2e'

	return (
		<View style={[styles.container, { backgroundColor: bgColor }]}>
			<Text style={styles.title}>Predice el Género</Text>
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
					color='#fff'
					style={{ marginTop: 30 }}
				/>
			)}

			{resultado && !resultado.error && (
				<View style={styles.result}>
					<Text style={styles.emoji}>{esMasculino ? '♂️' : '♀️'}</Text>
					<Text style={styles.resultText}>
						{esMasculino ? 'Masculino' : 'Femenino'}
					</Text>
					<Text style={styles.prob}>
						Probabilidad: {Math.round((resultado.probability || 0) * 100)}%
					</Text>
				</View>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 24,
	},
	title: { fontSize: 26, fontWeight: 'bold', color: '#fff', marginBottom: 30 },
	input: {
		width: '100%',
		backgroundColor: '#ffffff22',
		borderRadius: 12,
		padding: 14,
		color: '#fff',
		fontSize: 16,
		borderWidth: 1,
		borderColor: '#ffffff44',
		marginBottom: 16,
	},
	btn: {
		backgroundColor: '#e94560',
		borderRadius: 12,
		paddingVertical: 14,
		paddingHorizontal: 40,
	},
	btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
	result: { alignItems: 'center', marginTop: 40 },
	emoji: { fontSize: 80 },
	resultText: {
		fontSize: 32,
		color: '#fff',
		fontWeight: 'bold',
		marginTop: 10,
	},
	prob: { fontSize: 16, color: '#ddd', marginTop: 8 },
})
