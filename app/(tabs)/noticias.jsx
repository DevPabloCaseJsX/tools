import { useEffect, useState } from 'react'
import {
	ActivityIndicator,
	FlatList,
	Image,
	Linking,
	RefreshControl,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'

const API_URL = 'https://eldinero.com.do/wp-json/wp/v2/posts?per_page=15&_embed'
const COLOR = '#f0a500'

function limpiarHTML(texto) {
	if (!texto) return ''
	return texto
		.replace(/<[^>]+>/g, '')
		.replace(/&nbsp;/g, ' ')
		.replace(/&amp;/g, '&')
		.replace(/&quot;/g, '"')
		.replace(/&#8217;/g, "'")
		.replace(/&#8216;/g, "'")
		.replace(/&#8220;/g, '"')
		.replace(/&#8221;/g, '"')
		.replace(/\n/g, ' ')
		.trim()
}

function formatearFecha(fechaISO) {
	if (!fechaISO) return ''
	try {
		return new Date(fechaISO).toLocaleDateString('es-DO', {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		})
	} catch {
		return ''
	}
}

function obtenerImagen(post) {
	try {
		const media = post._embedded?.['wp:featuredmedia']
		const sizes = media?.[0]?.media_details?.sizes
		return (
			sizes?.large?.source_url ||
			sizes?.medium?.source_url ||
			media?.[0]?.source_url ||
			null
		)
	} catch {
		return null
	}
}

function obtenerCategoria(post) {
	try {
		return post._embedded?.['wp:term']?.[0]?.[0]?.name || ''
	} catch {
		return ''
	}
}

// ── Tarjeta ──────────────────────────────────────────────
function Tarjeta({ post }) {
	const imagen = obtenerImagen(post)
	const titulo = limpiarHTML(post.title?.rendered)
	const resumen = limpiarHTML(post.excerpt?.rendered)
	const fecha = formatearFecha(post.date)
	const categoria = obtenerCategoria(post)

	return (
		<TouchableOpacity
			style={styles.card}
			onPress={() => Linking.openURL(post.link)}
			activeOpacity={0.85}
		>
			{imagen ? (
				<Image
					source={{ uri: imagen }}
					style={styles.imagen}
					resizeMode='cover'
				/>
			) : (
				<View style={styles.placeholder}>
					<Text style={{ fontSize: 40 }}>💰</Text>
				</View>
			)}

			{categoria !== '' && (
				<View style={styles.badge}>
					<Text style={styles.badgeTexto}>{categoria.toUpperCase()}</Text>
				</View>
			)}

			<View style={styles.cuerpo}>
				<Text style={styles.fecha}>📅 {fecha}</Text>
				<Text style={styles.titulo} numberOfLines={3}>
					{titulo}
				</Text>
				{resumen.length > 10 && (
					<Text style={styles.resumen} numberOfLines={2}>
						{resumen}
					</Text>
				)}
				<Text style={styles.leerMas}>Leer noticia completa →</Text>
			</View>
		</TouchableOpacity>
	)
}

// ── Pantalla principal ───────────────────────────────────
export default function NoticiasScreen() {
	const [posts, setPosts] = useState([])
	const [cargando, setCargando] = useState(true)
	const [refrescando, setRefrescando] = useState(false)
	const [error, setError] = useState('')

	useEffect(() => {
		cargar()
	}, [])

	const cargar = async (esRefresco = false) => {
		esRefresco ? setRefrescando(true) : setCargando(true)
		setError('')
		try {
			const res = await fetch(API_URL)
			if (!res.ok) throw new Error(`Error ${res.status}`)
			const data = await res.json()
			if (!Array.isArray(data)) throw new Error('Formato inválido')
			setPosts(data.filter((p) => p.title?.rendered))
		} catch (e) {
			setError(e.message)
		} finally {
			setCargando(false)
			setRefrescando(false)
		}
	}

	if (cargando)
		return (
			<View style={styles.centrado}>
				<ActivityIndicator size='large' color={COLOR} />
				<Text style={styles.cargandoTexto}>Cargando noticias...</Text>
			</View>
		)

	if (error)
		return (
			<View style={styles.centrado}>
				<Text style={{ fontSize: 48, marginBottom: 12 }}>📡</Text>
				<Text style={styles.errorTexto}>{error}</Text>
				<TouchableOpacity style={styles.btnReintentar} onPress={() => cargar()}>
					<Text style={styles.btnReintentarTexto}>Reintentar</Text>
				</TouchableOpacity>
			</View>
		)

	return (
		<View style={styles.container}>
			<FlatList
				data={posts}
				keyExtractor={(item) => item.id.toString()}
				contentContainerStyle={styles.lista}
				showsVerticalScrollIndicator={false}
				ListHeaderComponent={
					<View style={styles.header}>
						<Text style={styles.headerNombre}>El Dinero</Text>
						<Text style={styles.headerSlogan}>
							Economía · Negocios · Finanzas
						</Text>
						<View style={styles.lineaHeader} />
						<Text style={styles.headerSub}>
							🇩🇴 {posts.length} noticias recientes
						</Text>
					</View>
				}
				renderItem={({ item }) => <Tarjeta post={item} />}
				refreshControl={
					<RefreshControl
						refreshing={refrescando}
						onRefresh={() => cargar(true)}
						colors={[COLOR]}
						tintColor={COLOR}
					/>
				}
			/>
		</View>
	)
}

// ── Estilos ──────────────────────────────────────────────
const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#0a0a0a' },
	centrado: {
		flex: 1,
		backgroundColor: '#0a0a0a',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 24,
	},
	lista: { padding: 14, paddingBottom: 32 },

	header: { alignItems: 'center', paddingVertical: 28, marginBottom: 4 },
	headerNombre: {
		fontSize: 36,
		fontWeight: '900',
		color: '#f0a500',
		letterSpacing: 1,
	},
	headerSlogan: { color: '#555', fontSize: 13, marginTop: 4 },
	lineaHeader: {
		width: '30%',
		height: 3,
		backgroundColor: '#f0a500',
		marginVertical: 12,
		borderRadius: 2,
	},
	headerSub: { color: '#444', fontSize: 12 },

	card: {
		backgroundColor: '#141414',
		borderRadius: 16,
		marginBottom: 18,
		overflow: 'hidden',
		borderWidth: 1,
		borderColor: '#1f1f1f',
	},
	imagen: { width: '100%', height: 200 },
	placeholder: {
		width: '100%',
		height: 120,
		backgroundColor: '#1a1a1a',
		alignItems: 'center',
		justifyContent: 'center',
	},
	badge: {
		position: 'absolute',
		top: 12,
		left: 12,
		backgroundColor: '#f0a500',
		borderRadius: 6,
		paddingHorizontal: 10,
		paddingVertical: 4,
	},
	badgeTexto: {
		color: '#000',
		fontSize: 10,
		fontWeight: '800',
		letterSpacing: 0.5,
	},
	cuerpo: { padding: 16 },
	fecha: { color: '#f0a500', fontSize: 12, fontWeight: '600', marginBottom: 8 },
	titulo: {
		color: '#f0f0f0',
		fontSize: 17,
		fontWeight: 'bold',
		lineHeight: 24,
		marginBottom: 8,
	},
	resumen: { color: '#666', fontSize: 13, lineHeight: 20, marginBottom: 12 },
	leerMas: {
		color: '#f0a500',
		fontWeight: '700',
		fontSize: 13,
		textAlign: 'right',
	},

	cargandoTexto: { color: '#555', marginTop: 14, fontSize: 15 },
	errorTexto: {
		color: '#aaa',
		textAlign: 'center',
		fontSize: 14,
		marginBottom: 20,
	},
	btnReintentar: {
		backgroundColor: '#f0a500',
		borderRadius: 12,
		paddingVertical: 13,
		paddingHorizontal: 30,
	},
	btnReintentarTexto: { color: '#000', fontWeight: 'bold', fontSize: 15 },
})
