import { useEffect, useState } from 'react'
import {
	ActivityIndicator,
	Image,
	Linking,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'

const WP_API = 'https://kinsta.com/wp-json/wp/v2/posts?per_page=3&_embed'

export default function NoticiasScreen() {
	const [posts, setPosts] = useState([])
	const [cargando, setCargando] = useState(true)

	useEffect(() => {
		fetch(WP_API)
			.then((r) => r.json())
			.then((data) => {
				setPosts(data)
				setCargando(false)
			})
			.catch(() => setCargando(false))
	}, [])

	const getImg = (post) => post._embedded?.['wp:featuredmedia']?.[0]?.source_url
	const stripHtml = (html) => html?.replace(/<[^>]+>/g, '') ?? ''

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.title}>📰 Últimas Noticias</Text>
			<Text style={styles.site}>kinsta.com</Text>

			{cargando && <ActivityIndicator size='large' color='#e94560' />}

			{posts.map((post) => (
				<View key={post.id} style={styles.card}>
					{getImg(post) && (
						<Image source={{ uri: getImg(post) }} style={styles.thumbnail} />
					)}
					<View style={styles.content}>
						<Text style={styles.postTitle}>
							{stripHtml(post.title?.rendered)}
						</Text>
						<Text style={styles.excerpt} numberOfLines={3}>
							{stripHtml(post.excerpt?.rendered)}
						</Text>
						<TouchableOpacity
							style={styles.visitBtn}
							onPress={() => Linking.openURL(post.link)}
						>
							<Text style={styles.visitText}>🔗 Visitar noticia</Text>
						</TouchableOpacity>
					</View>
				</View>
			))}
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: { flexGrow: 1, backgroundColor: '#1a1a2e', padding: 20 },
	title: {
		fontSize: 22,
		fontWeight: 'bold',
		color: '#e94560',
		textAlign: 'center',
	},
	site: { color: '#888', fontSize: 13, textAlign: 'center', marginBottom: 20 },
	card: {
		backgroundColor: '#16213e',
		borderRadius: 16,
		marginBottom: 20,
		overflow: 'hidden',
		borderWidth: 1,
		borderColor: '#ffffff15',
	},
	thumbnail: { width: '100%', height: 160 },
	content: { padding: 14 },
	postTitle: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 16,
		marginBottom: 6,
	},
	excerpt: { color: '#aaa', fontSize: 13, lineHeight: 20 },
	visitBtn: {
		marginTop: 12,
		backgroundColor: '#e9456022',
		borderRadius: 10,
		padding: 12,
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#e94560',
	},
	visitText: { color: '#e94560', fontWeight: '600', fontSize: 14 },
})
