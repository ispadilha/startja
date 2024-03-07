import React from "react"
import { Box, Grid, MenuItem, TextField, useMediaQuery } from "@mui/material"
import { FormikErrors } from "formik"

interface TransportBoxProps {
    formik: {
        values: FocusNFeInvoiceForm
        handleChange: (e: React.ChangeEvent<any>) => void
        setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<FocusNFeInvoiceForm>>
    }
}

export const TransportBox: React.FC<TransportBoxProps> = ({ formik }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    return (
        <Box
            sx={{
                flexDirection: "column",
                gap: "1vw",
            }}
        >
            <h3>Detalhes do frete</h3>

            <Grid container spacing={2}>
                <Grid item xs={isMobile ? 12 : 6}>
                    <TextField
                        fullWidth
                        label="Modalidade do frete"
                        name="transporte.modalidade_frete"
                        value={formik.values.transporte.modalidade_frete}
                        onChange={formik.handleChange}
                        required
                        select
                    >
                        <MenuItem value={0}>0 - Frete por conta do remetente</MenuItem>
                        <MenuItem value={1}>1 - Frete por conta do destinatário</MenuItem>
                        <MenuItem value={2}>2 - Frete por conta de terceiros</MenuItem>
                        <MenuItem value={3}>3 - Transporte próprio por conta do remetente</MenuItem>
                        <MenuItem value={4}>4 - Transporte próprio por conta do destinatário</MenuItem>
                        <MenuItem value={9}>9 - Sem frete</MenuItem>
                    </TextField>
                </Grid>
                {formik.values.transporte.modalidade_frete == 0 && (
                    <Grid item xs={isMobile ? 12 : 6}>
                        <TextField
                            fullWidth
                            label="Transportadora"
                            name="transporte.transportadora"
                            value={formik.values.transporte.transportadora}
                            onChange={formik.handleChange}
                            required
                        />
                    </Grid>
                )}
                {formik.values.transporte.modalidade_frete == 0 && (
                    <Grid item xs={isMobile ? 12 : 6}>
                        <TextField
                            fullWidth
                            label="Valor do frete"
                            name="transporte.valor_frete"
                            value={formik.values.transporte.valor_frete}
                            onChange={formik.handleChange}
                            required
                            type="number"
                        />
                    </Grid>
                )}
                {formik.values.transporte.modalidade_frete == 0 && (
                    <Grid item xs={isMobile ? 12 : 6}>
                        <TextField
                            fullWidth
                            label="Valor do seguro"
                            name="transporte.valor_seguro"
                            value={formik.values.transporte.valor_seguro}
                            onChange={formik.handleChange}
                            required
                            type="number"
                        />
                    </Grid>
                )}
            </Grid>

            {formik.values.transporte.modalidade_frete == 0 &&
                (formik.values.emitente.uf == formik.values.destinatario.uf ? (
                    <Box
                        sx={{
                            flexDirection: "column",
                            gap: "1vw",
                        }}
                    >
                        <h3>Dados do Veículo</h3>
                        <Grid container spacing={2}>
                            <Grid item xs={isMobile ? 12 : 6}>
                                <TextField
                                    fullWidth
                                    label="Placa do veículo"
                                    name="transporte.veiculo_placa"
                                    value={formik.values.transporte.veiculo_placa}
                                    onChange={formik.handleChange}
                                    required
                                />
                            </Grid>
                            <Grid item xs={isMobile ? 12 : 6}>
                                <TextField
                                    fullWidth
                                    label="UF do veículo"
                                    name="transporte.veiculo_uf"
                                    value={formik.values.transporte.veiculo_uf}
                                    onChange={formik.handleChange}
                                    required
                                />
                            </Grid>
                        </Grid>
                    </Box>
                ) : (
                    <p>
                        Os campos para dados do veículo (placa e UF) foram ocultados nesta nota, pois só são incluidos quando a UF da propriedade
                        emitente é a mesma UF do destinatário.
                    </p>
                ))}

            {formik.values.transporte.modalidade_frete == 0 && (
                <Box
                    sx={{
                        flexDirection: "column",
                        gap: "1vw",
                    }}
                >
                    <h3>Volumes do transporte</h3>
                    <Grid container spacing={2}>
                        <Grid item xs={isMobile ? 12 : 6}>
                            <TextField
                                fullWidth
                                label="Quantidade dos produtos transportados"
                                name="transporte.volumes.quantidade"
                                value={formik.values.transporte.volumes.volumes_quantidade}
                                onChange={formik.handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 6}>
                            <TextField
                                fullWidth
                                label="Espécie dos produtos transportados"
                                name="transporte.volumes.especie"
                                value={formik.values.transporte.volumes.volumes_especie}
                                onChange={formik.handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 6}>
                            <TextField
                                fullWidth
                                label="Peso bruto (kg)"
                                name="transporte.volumes.peso_bruto"
                                value={formik.values.transporte.volumes.peso_bruto}
                                onChange={formik.handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 6}>
                            <TextField
                                fullWidth
                                label="Peso líquido (kg)"
                                name="transporte.volumes.peso_liquido"
                                value={formik.values.transporte.volumes.peso_liquido}
                                onChange={formik.handleChange}
                                required
                            />
                        </Grid>
                    </Grid>
                </Box>
            )}
        </Box>
    )
}
