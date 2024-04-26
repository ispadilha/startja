import React, { useEffect, useState } from "react"
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Grid,
    TextField,
    FormControlLabel,
    Checkbox,
    CircularProgress,
    useMediaQuery,
    MenuItem,
} from "@mui/material"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import { useFormik } from "formik"
import { NewUser } from "../../../definitions/userOperations"
import { useIo } from "../../../hooks/useIo"
import { PermissionsContainer } from "./PermissionsContainer"
import { InfoContainer } from "./InfoContainer"
import { ExtFile } from "@files-ui/react"
import { useSnackbar } from "burgos-snackbar"

interface UpdateCustomerModalProps {
    open: boolean
    onClose: () => void
    customer: User
}

const UpdateCustomerModal: React.FC<UpdateCustomerModalProps> = ({ customer, open, onClose }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const { snackbar } = useSnackbar()
    const io = useIo()
    const todayDate = new Date()
    const formattedDate = todayDate.toISOString().split("T")[0]

    const [certificateFile, setCertificateFile] = React.useState<ExtFile>(customer.certificate)

    const handleClose = () => {
        formik.resetForm()
        onClose()
    }

    const formik = useFormik<Partial<NewUser>>({
        initialValues: {
            name: customer.name || "",
            email: customer.email || "",
            password: customer.password || "",
            register_date: customer.register_date || formattedDate,
            phone: customer.phone || "",
            document: customer.document || "",
            city: customer.city || "",
            state: customer.state || "",
            district: customer.district || "",
            number: customer.number || 0,
            adjunct: customer.adjunct || "",
            street: customer.street || "",
            cep: customer.cep || "",
            regimeTributario: customer.regimeTributario || 0,
            inscricaoEstadual: customer.inscricaoEstadual || "",
            isento: customer.isento || false,
            businessName: customer.businessName || "",
            discrimina_impostos: true,
            enviar_email_destinatario: true,
            habilita_nfce: false,
            habilita_nfe: true,
            inscricao_municipal: "",
            proximo_numero_nfe: 1,
            serie_nfe: 1,
            certificate: null,
            certificate_password: "",
            recolhimento: customer.recolhimento || 1,
            show_funrural_on_invoices: customer.show_funrural_on_invoices || true,
        },
        onSubmit: (values) => {
            if (!certificateFile) {
                alert("Anexar certificado")
                return
            }

            const data = {
                ...values,
                number: Number(values.number),
                proximo_numero_nfe: Number(values.proximo_numero_nfe),
                serie_nfe: Number(values.serie_nfe),
            }

            console.log({ dataAtualizado: data })
            setLoading(true)
            // io.emit("user:update",customer.id, data)
        },
    })

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (certificateFile) {
            console.log(certificateFile)
            formik.setFieldValue("certificate", certificateFile.file)
        }
    }, [certificateFile])

    // useEffect(() => {
    //     io.on("user:update:success", (customer: User) => {
    //         io.emit("user:list")
    //         setLoading(false)
    //         handleClose()
    //     })
    //     io.on("user:update:failed", ({ error }) => {
    //         setLoading(false)
    //         console.log(error)
    //         snackbar({ severity: "error", text: `Erro ao atualizar cliente: ${error}` })
    //     })

    //     return () => {
    //         io.off("user:update:success")
    //         io.off("user:update:failed")
    //     }
    // }, [])

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            sx={{
                justifyContent: "center",
            }}
            PaperProps={{
                sx: {
                    borderRadius: "20px",
                    minWidth: "90vw",
                    width: "fit-content",
                },
            }}
        >
            <form style={{ display: "contents" }} onSubmit={formik.handleSubmit}>
                <DialogTitle>Atualizar Cliente</DialogTitle>
                <CloseOutlinedIcon
                    sx={{
                        position: "absolute",
                        top: isMobile ? "5vw" : "1vw",
                        right: isMobile ? "5vw" : "1vw",
                        cursor: "pointer",
                    }}
                    onClick={handleClose}
                />

                <DialogContent>
                    <Box
                        sx={{
                            flex: 1,
                            height: "fit-content",
                            gap: isMobile ? "10vw" : "2vw",
                            flexDirection: isMobile ? "column" : "",
                        }}
                    >
                        <InfoContainer formik={formik} file={certificateFile} setFile={setCertificateFile} />

                        <Box>
                            <hr
                                style={{
                                    flex: 1,
                                }}
                            />
                        </Box>

                        <PermissionsContainer />
                    </Box>
                </DialogContent>

                <DialogActions
                    sx={{
                        margin: isMobile ? "0" : "0.5vw",
                        padding: isMobile ? "5vw" : "",
                    }}
                >
                    <Button
                        onClick={handleClose}
                        color="secondary"
                        variant="contained"
                        sx={{
                            borderRadius: "20px",
                            color: "white",
                            textTransform: "unset",
                            marginRight: isMobile ? "" : "auto",
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                        sx={{
                            borderRadius: "20px",
                            color: "white",
                            textTransform: "unset",
                        }}
                    >
                        {loading ? <CircularProgress size="1.5rem" color="inherit" /> : "Atualizar"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default UpdateCustomerModal
