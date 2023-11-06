import React from "react"
import { Box, Checkbox } from "@mui/material"
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined'

interface ProductRowProps {
    product : Product
}

export const ProductRow: React.FC<ProductRowProps> = ({product}) => {

return (
    <Box
    sx={{
        alignItems: "center",
        width: "100%",
    }}
    >
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
            }}
        >
            <Box
                sx={{
                    width: "45%"
                }}
            >
                <p>{product.name}</p>
                {/* <p>Elementum senectus diam neque aliquet</p> */}
            </Box>
            <Box
                sx={{
                    width: "45%"
                }}
            >
                <p>{product.ncm}</p>
                {/* <p>Cras lobortis sollicitudin consectetur aliquet</p> */}
            </Box>
            <Box
                sx={{
                    width: "10%",
                    justifyContent: "end"
                }}
            >
                <FormatListBulletedOutlinedIcon />
            </Box>
        </Box>
    </Box>
)}