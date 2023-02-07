const globalTheme = (mode) => {
    return {

        palette: {
            mode: mode,

            ...(mode === 'dark' ? {
                primary: {
                    main: "#3AAFA9"
                },
                secondary: {
                    main: "#ffef00"
                },

                background: {
                    default: "#222222",
                    alt: "#555555",
                    dif: "#0e1c2f",
                },
                
            } : {
                primary: {
                    main: "#3AAFA9"
                },
                secondary: {
                    main: "#ffef00"
                },

                background: {
                    default: "#edf1fa",
                    alt: "#FFFFFF",
                    dif: "#eafbfc",
                },
            })
        },
    }
}

export default globalTheme;