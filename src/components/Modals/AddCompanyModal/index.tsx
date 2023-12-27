import React, { useState, useEffect } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid, CircularProgress, useMediaQuery } from "@mui/material"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import { useIo } from "../../../hooks/useIo"
import { useFormik } from "formik"
import { NewCompany } from "../../../definitions/userOperations"
import { useUser } from "../../../hooks/useUser"

interface AddCompanyModalProps {
    open: boolean
    onClose: () => void
}

const AddCompanyModal: React.FC<AddCompanyModalProps> = ({ open, onClose }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const io = useIo()
    const { user } = useUser()

    const formik = useFormik<NewCompany>({
        initialValues: {
            type: "nacional",
            name: "HENRIQUE DEL COLI BATISTA LIMA",
            document: "06117933932",
            inscricaoEstadual: "9586480810",
            indicadorEstadual: "1",
            city: "Curitiba",
            state: "Paraná",
            district: "Bacacheri",
            street: "Rua Canadá",
            adjunct: "",
            number: "185",
            cep: "82510-290",
            email: "fernando@agenciazop.com.br",
            phone: "41984556795",
            customerId: user?.id || 0
        },
        onSubmit: (values) => {
            console.log(values)
            setLoading(true)
            io.emit("company:create", values)
        }
    })

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        io.on("company:creation:success", (company: Company) => {
            console.log("Empresa criada com sucesso: ", company)
            io.emit("company:list")
            setLoading(false)
            onClose()
        })
        io.on("company:creation:error", ({ error }) => {
            setLoading(false)
            console.log(error)
        })

        return () => {
            io.off("company:creation:success")
            io.off("company:creation:error")
        }
    }, [])

    return (
        <Dialog
            open={open}
            onClose={onClose}
            sx={{
                justifyContent: "center"
            }}
            PaperProps={{
                sx: {
                    borderRadius: "20px",
                    minWidth: "90vw"
                }
            }}>
            <form style={{ display: "contents" }} onSubmit={formik.handleSubmit}>
                <DialogTitle>Adicionar Empresa</DialogTitle>
                <CloseOutlinedIcon
                    sx={{
                        position: "absolute",
                        top: isMobile ? "5vw" : "1vw",
                        right: isMobile ? "5vw" : "1vw",
                        cursor: "pointer"
                    }}
                    onClick={onClose}
                />
                <DialogContent
                    sx={{
                        paddingTop: 0
                    }}>
                    <Grid container spacing={2}>
                        <Grid item xs={isMobile ? 12 : 3}>
                            <TextField required label="Tipo" fullWidth value={formik.values.type} name="type" onChange={formik.handleChange} />
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 3}>
                            <TextField required label="Nome" fullWidth value={formik.values.name} name="name" onChange={formik.handleChange} />
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 3}>
                            <TextField
                                required
                                label="Documento"
                                fullWidth
                                value={formik.values.document}
                                name="document"
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 3}>
                            <TextField
                                required
                                label="inscricaoEstadual"
                                fullWidth
                                value={formik.values.inscricaoEstadual}
                                name="inscricaoEstadual"
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 3}>
                            <TextField
                                required
                                label="indicadorEstadual"
                                fullWidth
                                value={formik.values.indicadorEstadual}
                                name="indicadorEstadual"
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 3}>
                            <TextField required label="Cidade" fullWidth value={formik.values.city} name="city" onChange={formik.handleChange} />
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 3}>
                            <TextField required label="Estado" fullWidth value={formik.values.state} name="state" onChange={formik.handleChange} />
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 3}>
                            <TextField
                                required
                                label="Bairro"
                                fullWidth
                                value={formik.values.district}
                                name="district"
                                onChange={formik.handleChange}
                            />
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 3}>
                            <TextField required label="Rua" fullWidth value={formik.values.street} name="street" onChange={formik.handleChange} />
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 3}>
                            <TextField label="Complemento" fullWidth value={formik.values.adjunct} name="adjunct" onChange={formik.handleChange} />
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 3}>
                            <TextField required label="Número" fullWidth value={formik.values.number} name="number" onChange={formik.handleChange} />
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 3}>
                            <TextField required label="CEP" fullWidth value={formik.values.cep} name="cep" onChange={formik.handleChange} />
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 3}>
                            <TextField required label="E-mail" fullWidth value={formik.values.email} name="email" onChange={formik.handleChange} />
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 3}>
                            <TextField required label="Telefone" fullWidth value={formik.values.phone} name="phone" onChange={formik.handleChange} />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions
                    sx={{
                        margin: isMobile ? "0" : "0.5vw",
                        padding: isMobile ? "5vw" : ""
                    }}>
                    <Button
                        onClick={onClose}
                        color="secondary"
                        variant="contained"
                        sx={{
                            borderRadius: "20px",
                            color: "white",
                            textTransform: "unset"
                        }}>
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        sx={{
                            borderRadius: "20px",
                            color: "white",
                            textTransform: "unset"
                        }}>
                        {loading ? <CircularProgress size="1.5rem" color="inherit" /> : "Adicionar"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default AddCompanyModal
