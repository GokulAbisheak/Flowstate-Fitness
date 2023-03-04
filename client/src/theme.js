const globalTheme = (mode) => {
    return {

        palette: {
            mode: mode,

            ...(mode === 'dark' ? {
                primary: {
                    // main: "#3AAFA9"
                    main: "#07a7af"
                },
                secondary: {
                    main: "#ffef00"
                },

                background: {
                    default: "#121212",
                    alt: "#222222",
                    dif: "#0e1c2f",
                },

                
            } : {
                primary: {
                    // main: "#3AAFA9"
                    main: "#07a7af"
                },
                secondary: {
                    main: "#ffef00"
                },

                background: {
                    default: "#edf1fa",
                    alt: "#FAFAFF",
                    dif: "#eafbfc",
                },

            })
        },
    }
}

export default globalTheme;