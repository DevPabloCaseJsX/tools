import { useEffect, useState } from 'react'
import {
	ActivityIndicator,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native'

const LAT = 18.4861
const LON = -69.9312

function getDescripcion(code) {
	if (code === 0) return '☀️ Despejado'
	if (code <= 3) return '⛅ Parcialmente nublado'
	if (code <= 48) return '🌫️ Niebla'
	if (code <= 67) return '🌧️ Lluvia'
	if (code <= 77) return '❄️ Nieve'
	if (code <= 82) return '🌦️ Chubascos'
	return '⛈️ Tormenta'
}

export default function ClimaScreen() {
	const [clima, setClima] = useState(null)
	const [cargando, setCargando] = useState(true)

	useEffect(() => {
		fetch(
			`https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current_weather=true&timezone=America/Santo_Domingo`
		)
			.then((r) => r.json())
			.then((d) => {
				setClima(d)
				setCargando(false)
			})
			.catch(() => setCargando(false))
	}, [])

	const cw = clima?.current_weather

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.title}>🌤️ Clima en Santo Domingo, RD</Text>
			{cargando && <ActivityIndicator size='large' color='#e94560' />}
			{cw && (
				<View style={styles.card}>
					<Text style={styles.emoji}>
						{getDescripcion(cw.weathercode).split(' ')[0]}
					</Text>
					<Text style={styles.temp}>{cw.temperature}°C</Text>
					<Text style={styles.desc}>{getDescripcion(cw.weathercode)}</Text>
					<View style={styles.row}>
						<View style={styles.dato}>
							<Text style={styles.datoLabel}>💨 Viento</Text>
							<Text style={styles.datoVal}>{cw.windspeed} km/h</Text>
						</View>
						<View style={styles.dato}>
							<Text style={styles.datoLabel}>🧭 Dirección</Text>
							<Text style={styles.datoVal}>{cw.winddirection}°</Text>
						</View>
					</View>
					<Text style={styles.fecha}>
						📅{' '}
						{new Date(cw.time).toLocaleDateString('es-DO', {
							weekday: 'long',
							year: 'numeric',
							month: 'long',
							day: 'numeric',
						})}
					</Text>
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
		justifyContent: 'center',
		padding: 24,
	},
	title: {
		fontSize: 22,
		fontWeight: 'bold',
		color: '#e94560',
		textAlign: 'center',
		marginBottom: 30,
	},
	card: {
		backgroundColor: '#16213e',
		borderRadius: 24,
		padding: 32,
		alignItems: 'center',
		width: '100%',
		borderWidth: 2,
		borderColor: '#e9456033',
	},
	emoji: { fontSize: 80 },
	temp: { fontSize: 64, fontWeight: 'bold', color: '#fff', marginTop: 8 },
	desc: { fontSize: 20, color: '#aaa', marginTop: 6 },
	row: { flexDirection: 'row', marginTop: 24, gap: 30 },
	dato: { alignItems: 'center' },
	datoLabel: { color: '#888', fontSize: 13 },
	datoVal: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
	fecha: { color: '#5dade2', marginTop: 24, fontSize: 14 },
})
