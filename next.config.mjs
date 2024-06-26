/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack(config) {
		// Grab the existing rule that handles SVG imports
		const fileLoaderRule = config.module.rules.find((rule) =>
			rule.test?.test?.(".svg")
		);

		config.module.rules.push(
			// Reapply the existing rule, but only for svg imports ending in ?url
			{
				...fileLoaderRule,
				test: /\.svg$/i,
				resourceQuery: /url/, // *.svg?url
			},
			// Convert all other *.svg imports to React components
			{
				test: /\.svg$/i,
				issuer: fileLoaderRule.issuer,
				resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
				use: [
					{
						loader: "@svgr/webpack",
						options: {
							dimensions: true,
							svgoConfig: {
								plugins: [
									{
										name: "preset-default",
										params: {
											overrides: {
												removeViewBox: false,
											},
										},
									},
								],
							},
						},
					},
				],
			}
		);

		// Modify the file loader rule to ignore *.svg, since we have it handled now.
		fileLoaderRule.exclude = /\.svg$/i;
		config.externals.push("pino-pretty", "lokijs", "encoding");

		return config;
	},
	transpilePackages: ["antd"],
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cryptologos.cc",
				port: "",
				pathname: "/logos/**",
			},
			{
				protocol: "https",
				hostname: "pbs.twimg.com",
				port: "",
				pathname: "/profile_images/**",
			},
			{
				protocol: "https",
				hostname: "scanglobal.oss-cn-hongkong.aliyuncs.com",
				port: "",
				pathname: "/mainnet/**",
			},
		],
		// output: 'standalone',
	},
};

export default nextConfig;

// import withBundleAnalyzer from '@next/bundle-analyzer';

// export default process.env.ANALYZE ? withBundleAnalyzer(nextConfig) : nextConfig;
