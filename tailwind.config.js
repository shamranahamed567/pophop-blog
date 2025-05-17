const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    './styles/**/*.{css}',
  ],
  darkMode: ["class", "class"], // or 'media' or 'class'
  theme: {
  	extend: {
  		colors: {
  			gray: 'colors.neutral',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
        "changelog-border": "#F0E5FF",
				"mobile-header": "#FFFFFFA1",
				"muted-foreg": "#64748B",
			  "error-bg": "#FFFFFFF5",
				"card-foreground": "#020617",
				"blog-btn": "#FAFAFA",
				"blog-not": "#EDEEF4",
				"btn-text": "#18181B",
				"blog-time": "#09090BBF",
				"blog-bd": "#F3EBFF",
				"mob-dialog": "#19101033",
				"com-tab": "#F9FAFB",
				"type-text": "#09090B",
				"menu-btn": "#E4E4E7",
				"future-card": "#F6F6F64D"
  		},
  		fontFamily: {
  			sans: [
  				'var(--font-inter)',
                    ...defaultTheme.fontFamily.sans
                ],
  			serif: [
  				'var(--font-lora)',
                    ...defaultTheme.fontFamily.serif
                ],
  			stock: [
  				'defaultTheme.fontFamily.sans'
  			],
        geistMedium: ['GeistMedium'],
        geistSemiBold: ['GeistSemiBold'],
        geistRegular: ['GeistRegular'],
				bonVivantSerif: ['BonVivantSerif'],
  		},
			fontSize: {
        '20': '5rem',
				'8': '2rem',
      },
  		aspectRatio: {
  			'4/3': '4 / 3',
  			'3/2': '3 / 2',
  			'2/3': '2 / 3',
  			'9/16': '9 / 16'
  		},
  		boxShadow: {
  			'btn-shadow': '0px 3px 8px 1px rgba(53, 17, 80, 0.64)',
				'mob-head': '0px 2px 8px 0px rgba(131, 13, 221, 0.16), 0px 1px 1px 0px rgba(53, 17, 80, 0.02)'
  		},
  		maxWidth: {
  	    '278.5': '69.625rem',
        '61': '15.25rem',
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
      lineHeight: {
        '16': '64px'
      },
      padding: {
       '17': '4.25rem',
       '100': '25rem',
      },
      margin: {
        "changelog": "11.32%",
				"changelog-left": "5.98%",
				"changelog-right": "6.55%"
      },
      height: {
        '106': '26.5rem',
				'5.5': '1.375rem',
      },
			spacing: {
				'7': '1.75rem',
				'5.25': '1.313rem',
				'5.5': '1.375rem',
				'17': '4.25rem',
				'108.5': '27.125rem',
				'15': '3.75rem',
				'18.5': '4.625rem',
				'69': '17.25rem',
			},
			backgroundImage: {
				'gradient-text': 'linear-gradient(69deg, #B759FF 37.47%, #FF5E96 54.81%, #FFB65B 66.46%)',
			},
			backdropBlur: {
				follow: "2px",
        '48': '12rem',
      },
  	}
  },
  variants: {
    extend: {}
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")]
};
