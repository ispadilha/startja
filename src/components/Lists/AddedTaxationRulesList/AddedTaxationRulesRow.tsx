import React from "react"
import { Box, Checkbox, IconButton, Menu, MenuItem, useMediaQuery } from "@mui/material"
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined"
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"
import { TaxRulesForm } from "../../../definitions/TaxRulesForm"
import { useProduct } from "../../../hooks/useProduct"

interface AddedTaxationRuleRowProps {
    tax_rule: TaxRulesForm
    deleteTaxRule: (rule: TaxRulesForm) => void
}

export const AddedTaxationRuleRow: React.FC<AddedTaxationRuleRowProps> = ({ tax_rule, deleteTaxRule }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const product = useProduct()

    const cellStyle = {
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center"
    }

    const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null)
    const menu_opened = Boolean(menuAnchorEl)

    const actions = [
        {
            id: 1,
            title: "Remover",
            icon: <RemoveCircleOutlineIcon />,
            onClick: () => {
                deleteTaxRule(tax_rule)
            }
        }
    ]

    return (
        <Box
            sx={{
                alignItems: "center",
                width: "100%"
            }}>
            <Checkbox
                inputProps={{
                    style: {
                        padding: "0"
                    }
                }}
            />
            <Box
                sx={{
                    justifyContent: "space-between",
                    flex: 1,
                    gap: isMobile ? "10vw" : ""
                }}>
                <Box
                    sx={{
                        alignItems: "center",
                        flex: 0.1
                    }}>
                    <p>{tax_rule.destino}</p>
                </Box>
                <Box
                    sx={{
                        ...cellStyle,
                        flex: 0.1
                    }}>
                    <p>{product.find(tax_rule.product_id)?.ncm}</p>
                </Box>
                <Box
                    sx={{
                        ...cellStyle,
                        flex: 0.25
                    }}>
                    <p>{product.find(tax_rule.product_id)?.name}</p>
                </Box>
                <Box
                    sx={{
                        ...cellStyle,
                        flex: 0.2
                    }}>
                    <p>{tax_rule.cfop}</p>
                </Box>
                <Box
                    sx={{
                        ...cellStyle,
                        flex: 0.25
                    }}>
                    <p>{tax_rule.icms_situacao_tributaria}</p>
                </Box>
                <Box
                    sx={{
                        ...cellStyle,
                        flex: 0.05
                    }}>
                    <IconButton onClick={(event) => setMenuAnchorEl(event.currentTarget)}>
                        <FormatListBulletedOutlinedIcon />
                    </IconButton>
                </Box>
                <Menu
                    anchorEl={menuAnchorEl}
                    open={menu_opened}
                    onClose={() => setMenuAnchorEl(null)}
                    slotProps={{ paper: { elevation: 3 } }}
                    MenuListProps={{ sx: { width: "100%" } }}>
                    {actions.map((action) => {
                        const Icon = () => action.icon
                        return (
                            <MenuItem sx={{ gap: isMobile ? "2vw" : "0.5vw" }} onClick={action.onClick} key={action.id}>
                                <Icon /> {action.title}
                            </MenuItem>
                        )
                    })}
                </Menu>
            </Box>
        </Box>
    )
}