import Script from 'next/script'

export default function Head() {
	return (
		<head>
			<meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' />
			<link rel='manifest' href='/manifest.json' />

			<link rel='icon' href='/favicon.png' />

			{/* 字体已由 next/font 自托管，无需再外链 Google Fonts */}

			{/* 统计脚本延后到页面空闲再加载，不与首屏渲染抢资源 */}
			<Script src='https://www.googletagmanager.com/gtag/js?id=G-ZNSFR7C9PM' strategy='lazyOnload' />
			<Script id='google-analytics' strategy='lazyOnload'>
				{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-ZNSFR7C9PM');
        `}
			</Script>
		</head>
	)
}
