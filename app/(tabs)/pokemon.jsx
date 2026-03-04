import { Audio } from 'expo-av'
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

export default function PokemonScreen() {
	const [nombre, setNombre] = useState('')
	const [pokemon, setPokemon] = useState(null)
	const [cargando, setCargando] = useState(false)
	const [error, setError] = useState('')

	const buscar = async () => {
		if (!nombre.trim()) return
		setCargando(true)
		setPokemon(null)
		setError('')
		try {
			const res = await fetch(
				`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`
			)
			if (!res.ok) throw new Error()
			const data = await res.json()
			setPokemon(data)
		} catch {
			setError('Pokémon no encontrado 😢')
		}
		setCargando(false)
	}

	const reproducirSonido = async () => {
		if (!pokemon?.cries?.latest) return
		try {
			await Audio.setAudioModeAsync({ playsInSilentModeIOS: true })
			const { sound } = await Audio.Sound.createAsync({
				uri: pokemon.cries.latest,
			})
			await sound.playAsync()
		} catch {}
	}

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.title}>⚡ Pokédex</Text>
			<TextInput
				style={styles.input}
				placeholder='Nombre del Pokémon (ej: pikachu)'
				placeholderTextColor='#888'
				value={nombre}
				onChangeText={setNombre}
				autoCapitalize='none'
			/>
			<TouchableOpacity style={styles.btn} onPress={buscar}>
				<Text style={styles.btnText}>Buscar</Text>
			</TouchableOpacity>

			{cargando && (
				<ActivityIndicator
					size='large'
					color='#f1c40f'
					style={{ marginTop: 30 }}
				/>
			)}
			{error && <Text style={styles.error}>{error}</Text>}

			{pokemon && (
				<View style={styles.card}>
					<Text style={styles.pkName}>{pokemon.name.toUpperCase()}</Text>
					<Image
						source={{
							uri: pokemon.sprites.other['official-artwork'].front_default,
						}}
						style={styles.image}
					/>
					<Text style={styles.statLabel}>⭐ Experiencia base</Text>
					<Text style={styles.statVal}>{pokemon.base_experience}</Text>
					<Text style={styles.statLabel}>🎯 Habilidades</Text>
					{pokemon.abilities.map((a, i) => (
						<Text key={i} style={styles.ability}>
							• {a.ability.name}
						</Text>
					))}
					{pokemon.cries?.latest && (
						<TouchableOpacity
							style={styles.soundBtn}
							onPress={reproducirSonido}
						>
							<Text style={styles.soundBtnText}>🔊 Escuchar sonido</Text>
						</TouchableOpacity>
					)}
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
	},
	title: {
		fontSize: 26,
		fontWeight: 'bold',
		color: '#f1c40f',
		marginBottom: 20,
	},
	input: {
		width: '100%',
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
		backgroundColor: '#f1c40f',
		borderRadius: 12,
		paddingVertical: 13,
		paddingHorizontal: 40,
	},
	btnText: { color: '#1a1a2e', fontWeight: 'bold', fontSize: 16 },
	card: {
		backgroundColor: '#16213e',
		borderRadius: 20,
		padding: 24,
		alignItems: 'center',
		marginTop: 20,
		width: '100%',
		borderWidth: 2,
		borderColor: '#f1c40f44',
	},
	pkName: {
		fontSize: 28,
		fontWeight: 'bold',
		color: '#f1c40f',
		marginBottom: 10,
	},
	image: { width: 200, height: 200 },
	statLabel: { color: '#aaa', fontSize: 14, marginTop: 16, fontWeight: '600' },
	statVal: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
	ability: { color: '#ddd', fontSize: 15, marginTop: 4 },
	soundBtn: {
		marginTop: 20,
		backgroundColor: '#e94560',
		borderRadius: 12,
		paddingVertical: 12,
		paddingHorizontal: 24,
	},
	soundBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
	error: { color: '#e94560', marginTop: 20, fontSize: 16 },
})
