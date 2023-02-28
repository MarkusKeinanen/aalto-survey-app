import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return initialProps;
	}

	render() {
		return (
			<Html>
				<Head>
					<link rel='preload' href='/fonts/nunito-v25-latin-ext_latin-regular.ttf' as='font' type='font/ttf' crossOrigin='anonymous' />
					<link rel='preload' href='/fonts/nunito-v25-latin-ext_latin-500.ttf' as='font' type='font/ttf' crossOrigin='anonymous' />
					<link rel='preload' href='/fonts/nunito-v25-latin-ext_latin-600.ttf' as='font' type='font/ttf' crossOrigin='anonymous' />
					<link rel='preload' href='/fonts/nunito-v25-latin-ext_latin-700.ttf' as='font' type='font/ttf' crossOrigin='anonymous' />
					<link rel='preload' href='/fonts/nunito-v25-latin-ext_latin-800.ttf' as='font' type='font/ttf' crossOrigin='anonymous' />
					<link rel='preload' href='/fonts/nunito-v25-latin-ext_latin-900.ttf' as='font' type='font/ttf' crossOrigin='anonymous' />
					<link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
					<link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
					<link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
					<link rel='manifest' href='/site.webmanifest'></link>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
