import React from "react"
import { Box, Checkbox, useMediaQuery } from "@mui/material"

interface ProductsListHeaderProps {}

export const ProductsListHeader: React.FC<ProductsListHeaderProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    return (
        <Box
            sx={{
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    alignItems: "center",
                    width: "100%",
                    marginBottom: "1vw",
                }}
            >
                <Checkbox
                    inputProps={{
                        style: {
                            padding: "0",
                        },
                    }}
                />
                <Box
                    sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        flex: 1,
                        gap: isMobile ? "20vw" : "2vw",
                    }}
                >
                    <Box
                        sx={{
                            flex: 0.35,
                            minWidth: isMobile ? "25vw" : "",
                        }}
                    >
                        <h3>Nome do Produto</h3>
                    </Box>
                    <Box
                        sx={{
                            flex: 0.35,
                            minWidth: isMobile ? "25vw" : "",
                        }}
                    >
                        <h3>NCM - Classificação</h3>
                    </Box>
                    <Box
                        sx={{
                            flex: 0.25,
                            minWidth: isMobile ? "25vw" : "",
                        }}
                    >
                        <h3>Código de Origem do ICMS</h3>
                    </Box>
                    <Box
                        sx={{
                            flex: 0.05,
                            justifyContent: "center",
                        }}
                    >
                        <h3>Ações</h3>
                    </Box>
                </Box>
            </Box>
            <hr
                style={{
                    marginLeft: "1vw",
                    width: "100%",
                }}
            />
        </Box>
    )
}