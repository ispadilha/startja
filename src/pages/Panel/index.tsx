import React from "react"
import { Box } from "@mui/material"
import { colors } from "../../style/colors"
import { Sidebar } from "../../components/Sidebar"
import { Route, Routes } from "react-router-dom"
import { Overview } from "./subpages/Overview"
import { Issuance } from "./subpages/Issuance"
import { Registry } from "./subpages/Registry"

interface PanelProps {
    user: User
}

export const Panel: React.FC<PanelProps> = ({ user }) => {
    return (
        <Box
            sx={{
                backgroundColor: colors.background,
                width: "100%",
                overflow: "hidden",
                height: "100%",
            }}
        >
            <Sidebar />
            <Box
                sx={{
                    flex: 1,
                    flexDirection: "column",
                    overflowY: "auto",
                    padding: "2rem",
                    gap: "2rem",
                    height: "100%",
                }}
            >
                <Routes>
                    <Route index element={<Overview user={user} />} />
                    <Route path="/visao-geral/" element={<Overview user={user} />} />
                    <Route path="/notas-fiscais/" element={<Issuance user={user} />} />
                    <Route path="/cadastros-gerais/" element={<Registry user={user} />} />
                </Routes>
            </Box>
        </Box>
    )
}
