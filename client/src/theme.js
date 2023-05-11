const globalTheme = (mode) => {
    return {

        palette: {
            mode: mode,

            ...(mode === 'dark' ? {
                primary: {
                    // main: "#3AAFA9"
                    // main: "#07a7af"
                    main: "#008CDA"
                },
                secondary: {
                    main: "#ffef00"
                },

                background: {
                    default: "#222222",
                    alt: "#2a2a2a",
                    dif: "#0e1c2f",
                },

                white: {
                    main: "#FFFFFF"
                },

                
            } : {
                primary: {
                    // main: "#3AAFA9"
                    // main: "#07a7af"
                    main: "#1053A7"
                },
                secondary: {
                    main: "#ffef00"
                },

                background: {
                    default: "#edf1fa",
                    alt: "#FAFAFF",
                    dif: "#eafbfc",
                },

                white: {
                    main: "#FFFFFF"
                },

            })
        },
    }
}

export default globalTheme;