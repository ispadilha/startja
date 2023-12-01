import React, { useEffect } from "react"
import { Box } from "@mui/material"
import { useHeader } from "../../../../../../hooks/useHeader"

interface ConfigLCDPRExportProps {
    user: User
}

export const ConfigLCDPRExport: React.FC<ConfigLCDPRExportProps> = ({ user }) => {
    const header = useHeader()
    useEffect(() => {
        header.setTitle("Configurações")
    }, [])

    return (
        <>
            <Box
                sx={{
                    flex: 1,
                    padding: "1vw",
                    boxShadow: "0 2px 2px 2px #d1d1d1",
                    backgroundColor: "white",
                    borderRadius: "30px",
                    flexDirection: "column",
                    width: "100%",
                }}
            >
                <h2>Exportar LCDPR</h2>
            </Box>
        </>
    )
}
