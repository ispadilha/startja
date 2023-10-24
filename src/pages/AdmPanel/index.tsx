import React from "react"
import { Box } from "@mui/material"
import { colors } from "../../style/colors"
import { Sidebar } from "../../components/Sidebar"
import { Header } from "../../components/Header"

interface AdmPanelProps {
    user: User
}

export const AdmPanel: React.FC<AdmPanelProps> = ({ user }) => {
    return (
        <Box
            sx={{
                backgroundColor: colors.background,
                width: "100%"
            }}
        >
            <Sidebar />
            <Box
                sx={{
                    width: "90%"
                }}
            >
                <Header />
            </Box>
        </Box>
    )
}