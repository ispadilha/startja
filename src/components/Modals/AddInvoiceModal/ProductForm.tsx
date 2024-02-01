import React, { useEffect, useMemo, useState } from "react"
import { Autocomplete, Box, Button, Grid, MenuItem, Radio, Tab, Tabs, TextField, useMediaQuery } from "@mui/material"
import { useProduct } from "../../../hooks/useProduct"
import { FormikErrors, useFormik } from "formik"
import { colors } from "../../../style/colors"
import { useCurrencyMask, useNumberMask } from "burgos-masks"
import MaskedInput from "../../MaskedInput"
import { unmaskCurrency, unmaskNumber } from "../../../tools/unmaskNumber"
import { TaxValues } from "../../TaxValues"
import { useSnackbar } from "burgos-snackbar"
import icms_situacao_tributaria_values from "./icms_situacao_tributaria"

interface ProductFormProps {
    addProduct: (product: InvoiceProduct) => void
    focusNFEInvoiceFormik: {
        values: FocusNFeInvoiceForm
        handleChange: (e: React.ChangeEvent<any>) => void
        setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<FocusNFeInvoiceForm>>
    }
    nature: Natureza | null
}

export const ProductForm: React.FC<ProductFormProps> = ({ addProduct, focusNFEInvoiceFormik, nature }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const number_mask = useNumberMask({})
    const { list } = useProduct()
    const { snackbar } = useSnackbar()

    const [productFormDisplay, setProductFormDisplay] = useState("produto")
    const [currentProduct, setCurrentProduct] = useState<Product>(list[0])

    const formik = useFormik<InvoiceProduct>({
        initialValues: {
            cfop: 1101,
            cofins_situacao_tributaria: "01",
            icms_modalidade_base_calculo: 0,
            icms_origem: list[0].icmsOrigin,
            icms_situacao_tributaria: "00",
            id: list[0].id.toString(),
            codigo_externo: list[0].codigo_externo,
            name: list[0].name,
            ncm: list[0].ncm,
            pis_situacao_tributaria: "01",
            // @ts-ignore
            quantidade: "",
            unidade_comercial: "un",
            unidade_tributavel: "un",
            // @ts-ignore
            valor_unitario_comercial: "",
            valor_unitario_tributavel: 0,
            informacoes_adicionais_item: ""
        },
        onSubmit: (values) => {
            if (!values.quantidade) {
                snackbar({ severity: "error", text: "insira a quantidade" })
                return
            }
            if (!values.quantidade) {
                snackbar({ severity: "error", text: "insira o valor unitário" })
                return
            }
            const data = {
                ...values,
                unidade_tributavel: values.unidade_comercial,
                cfop: unmaskCurrency(values.cfop.toString()),
                quantidade: unmaskNumber(values.quantidade),
                valor_unitario_comercial: unmaskCurrency(values.valor_unitario_comercial.toString()),
                valor_unitario_tributavel: unmaskCurrency(values.valor_unitario_comercial.toString())
            }
            console.log(data)
            addProduct(data)
            formik.resetForm()
            setProductFormDisplay("produto")
            setCurrentProduct(list[0])
        },
        enableReinitialize: true
    })

    const tax_formik = useMemo(
        () => ({
            ...formik,
            values: {
                ...formik.values,
                product_id: 0,
                origem: focusNFEInvoiceFormik.values.emitente.uf,
                destino: focusNFEInvoiceFormik.values.destinatario.uf
            }
        }),
        [formik]
    )
    const tabLabelBoxStyles = { alignItems: "center" }

    const activeTabStyle = {
        textTransform: "unset",
        flex: 1,
        borderBottom: `2px solid ${colors.primary}`,
        color: `${colors.primary}`,
        fontWeight: "bold"
    }
    const inactiveTabStyle = {
        textTransform: "unset",
        flex: 1,
        borderTopLeftRadius: "15px",
        borderTopRightRadius: "15px",
        backgroundColor: `${colors.background}`
    }

    const changeProduct = (product: Product | null) => {
        if (!product) return

        setCurrentProduct(product)
        formik.setFieldValue("id", product.id)
        formik.setFieldValue("name", product.name)
        formik.setFieldValue("ncm", product.ncm)
        formik.setFieldValue("codigo_externo", product.codigo_externo)
    }

    const checkTaxRules = () => {
        const tax_rule = nature?.rules.find(
            (rule) =>
                rule.origem == focusNFEInvoiceFormik.values.emitente.uf &&
                rule.destino == focusNFEInvoiceFormik.values.destinatario.uf &&
                rule.product_id == currentProduct.id
        )

        if (tax_rule) {
            Object.entries(tax_rule).map(([param, value]) => {
                if (["id", "product", "product_id", "origem", "destino"].includes(param)) return
                formik.setFieldValue(param, value)
            })
        }
    }

    useEffect(() => {
        const fields = icms_situacao_tributaria_values
            .find((st) => st.value == formik.values.icms_situacao_tributaria)!
            .fields?.map((field) => field.field)

        icms_situacao_tributaria_values
            .map((item) => item.fields?.map((item) => item.field))
            .flatMap((item) => item)
            .map((item) => {
                if (!item) return
                if (fields?.includes(item)) return

                formik.setFieldValue(item, null)
            })
    }, [formik.values.icms_situacao_tributaria])

    useEffect(() => {
        checkTaxRules()
    }, [currentProduct, nature, focusNFEInvoiceFormik.values.emitente.uf, focusNFEInvoiceFormik.values.destinatario.uf])

    return (
        <Box
            sx={{
                flex: 1,
                flexDirection: "column",
                gap: isMobile ? "5vw" : "1vw",
                height: "100%",
                maxWidth: isMobile ? "100%" : "49%",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                }}
            >
                <Tabs
                    variant="fullWidth"
                    textColor="primary"
                    indicatorColor="primary"
                    sx={{ width: "100%" }}
                    onChange={(_, value) => setProductFormDisplay(value)}
                    value={productFormDisplay}
                >
                    <Tab
                        value={"produto"}
                        label={
                            <Box sx={tabLabelBoxStyles}>
                                {!isMobile && <Radio checked={productFormDisplay === "produto"} />}
                                <p>Produto</p>
                            </Box>
                        }
                        sx={productFormDisplay === "produto" ? activeTabStyle : inactiveTabStyle}
                    />
                    <Tab
                        value={"tributação"}
                        label={
                            <Box sx={tabLabelBoxStyles}>
                                {!isMobile && <Radio checked={productFormDisplay === "tributação"} />}
                                <p>Tributação</p>
                            </Box>
                        }
                        sx={productFormDisplay === "tributação" ? activeTabStyle : inactiveTabStyle}
                    />
                </Tabs>
            </Box>
            {productFormDisplay === "produto" && (
                <Box
                    sx={{
                        flexDirection: "column",
                        gap: isMobile ? "5vw" : "1vw",
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Autocomplete
                                disablePortal
                                options={list}
                                getOptionLabel={(option) => `${option.codigo_externo} - ${option.name}`}
                                renderInput={(params) => <TextField {...params} label="Produto" />}
                                value={currentProduct}
                                onChange={(_, value) => changeProduct(value)}
                            />
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 6}>
                            <TextField
                                label="Quantidade"
                                fullWidth
                                name="quantidade"
                                value={formik.values.quantidade}
                                onChange={formik.handleChange}
                                // @ts-ignore
                                InputProps={{ inputComponent: MaskedInput, inputProps: { mask: useNumberMask({}), inputMode: "numeric" } }}
                                required
                            />
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 6}>
                            <TextField
                                label="Unidade"
                                fullWidth
                                name="unidade_comercial"
                                value={formik.values.unidade_comercial}
                                onChange={formik.handleChange}
                                select
                            >
                                <MenuItem value="un">unidade(s)</MenuItem>
                                <MenuItem value="bdj">bandeja(s)</MenuItem>
                                <MenuItem value="cx">caixa(s)</MenuItem>
                                <MenuItem value="dz">dúzia(s)</MenuItem>
                                <MenuItem value="g">grama(s)</MenuItem>
                                <MenuItem value="L">litro(s)</MenuItem>
                                <MenuItem value="saca">saca(s)</MenuItem>
                                <MenuItem value="Kg">Kg</MenuItem>
                                <MenuItem value="Ton">Ton</MenuItem>
                                <MenuItem value="Cb">Cb</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 6}>
                            <TextField
                                label="Valor unitário"
                                fullWidth
                                name="valor_unitario_comercial"
                                value={formik.values.valor_unitario_comercial}
                                onChange={formik.handleChange}
                                // @ts-ignore
                                InputProps={{ inputComponent: MaskedInput, inputProps: { mask: useCurrencyMask(), inputMode: "numeric" } }}
                                required
                            />
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 6}>
                            <TextField
                                label="Valor total"
                                fullWidth
                                value={Number(
                                    (unmaskNumber(formik.values.quantidade) * unmaskCurrency(formik.values.valor_unitario_comercial)).toFixed(2)
                                )}
                                InputProps={{ startAdornment: <>R$</>, sx: { gap: "0.3rem" } }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Informações adicionais do produto"
                                fullWidth
                                name="informacoes_adicionais_item"
                                value={formik.values.informacoes_adicionais_item}
                                onChange={formik.handleChange}
                            />
                        </Grid>
                    </Grid>
                    {/* <h4>Integração com pedido de compra</h4>
                    <Grid container spacing={2}>
                        <Grid item xs={isMobile ? 12 : 6}>
                            <TextField label="Ordem de compra" fullWidth />
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 6}>
                            <TextField label="Nº do item" fullWidth />
                        </Grid>
                    </Grid> */}
                </Box>
            )}
            {productFormDisplay === "tributação" && (
                <Box
                    sx={{
                        flexDirection: "column",
                        gap: isMobile ? "5vw" : "1vw",
                    }}
                >
                    <TaxValues formik={tax_formik} isInvoice />
                </Box>
            )}
            <Button
                variant="contained"
                onClick={formik.submitForm}
                sx={{
                    alignSelf: "end",
                    borderRadius: "20px",
                    textTransform: "unset",
                    marginTop: "auto",
                }}
            >
                Adicionar produto
            </Button>
        </Box>
    )
}
