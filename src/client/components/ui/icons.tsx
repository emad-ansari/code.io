
// This component is used for the loading spinner
export const Icons = {
	spinner: (props: React.SVGProps<SVGSVGElement>) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="30"
			height="30"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			<path d="M21 12a9 9 0 1 1-6.219-8.56" />
		</svg>
	),
	logo: (props: React.SVGProps<SVGSVGElement>) => (
		<svg
			width="200"
			height="50"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<rect width="200" height="" fill="#111827" />
			<text
				x="20"
				y="35"
				font-family="Verdana, sans-serif"
				font-size="24"
				fill="white"
			>
				&lt;/&gt; Code.io
			</text>
		</svg>
	),
};
