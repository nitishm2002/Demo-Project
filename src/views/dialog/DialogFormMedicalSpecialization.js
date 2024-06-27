import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, FormLabel, Grid, IconButton, InputAdornment, TextField } from "@mui/material"
import CloseIcon from "mdi-material-ui/Close";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CleaveNumberInput } from "src/@core/components/cleave-components";
import { axiosInstance } from "src/network/adapter";
import { ApiEndPoints } from "src/network/endpoints";
import * as yup from 'yup'
import { toastError, toastSuccess } from "src/utils/utils";

const validationSchema = yup.object().shape({
    title: yup.string().required("Required"),
    description: yup.string().nullable(),
    link: yup.string().nullable(),
    cost_per_unit: yup
        .number("Must be positive number only")
        .positive("Must be positive number only")
        .typeError("Must be positive number only")
        .nullable()
        .transform((curr, orig) => (orig === "" ? null : curr)),
})

const DialogFormMedicalSpecialization = (props) => {

    const { mode, open, toggle, dataToEdit, onSuccess } = props;

    const [loading, setLoading] = useState(false);
    const [dialogTitle, setDialogTitle] = useState('');

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            title: '',
            description: '',
            link: '',
            cost_per_unit: null
        },
        resolver: yupResolver(validationSchema),
        mode: 'onChange'
    })

    useEffect(() => {
        if (open) {
            setLoading(false);
            reset({
                title: dataToEdit?.title || '',
                description: dataToEdit?.description || '',
                link: dataToEdit?.link || '',
                cost_per_unit: dataToEdit?.cost_per_unit,
            })
            setDialogTitle(mode === "add" ? "Create Medical Specialization" : "Edit Medical Specialization")
        }
    }, [dataToEdit, mode, open, reset])

    const onSubmit = (data) => {
        let payload = {
            title: data.title,
            description: data.description,
            link: data.link,
            cost_per_unit: data.cost_per_unit
        }
        setLoading(true);

        let apiInstance = null;

        if (mode === "edit") {
            apiInstance = axiosInstance
                .patch(ApiEndPoints.MEDICAL_SPECIALIZATION.edit(dataToEdit._id), payload)
        } else {
            apiInstance = axiosInstance
                .post(ApiEndPoints.MEDICAL_SPECIALIZATION.create, payload)
        }
        apiInstance
            .then((response) => response.data)
            .then((response) => {
                onSuccess();
                toastSuccess(response.message);
                toggle();
            })
            .catch((error) => {
                toastError(error)
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return <>
        <Dialog open={open} onClose={toggle} fullWidth maxWidth='sm' scroll="paper">
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>{dialogTitle}</Box>
                <IconButton
                    aria-label="close"
                    onClick={toggle}
                    sx={{ color: (theme) => theme.palette.grey[500] }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ pb: 8, px: { sx: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 } }}>
                <form id="medical-specialization-form" onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <FormLabel htmlFor='title' error={Boolean(errors.title)}>Title</FormLabel>
                                <Controller
                                    name='title'
                                    control={control}
                                    render={({ field: { value, onChange } }) => (
                                        <TextField
                                            value={value}
                                            onChange={onChange}
                                            type="text"
                                            placeholder='Enter Title'
                                            error={Boolean(errors.title)}
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    )}
                                />
                                {errors.title && (
                                    <FormHelperText sx={{ color: 'error.main' }}>
                                        {errors.title.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <FormLabel htmlFor='description' error={Boolean(errors.description)}>Description</FormLabel>
                                <Controller
                                    name='description'
                                    control={control}
                                    render={({ field: { value, onChange } }) => (
                                        <TextField
                                            value={value}
                                            onChange={onChange}
                                            type="text"
                                            placeholder='Enter Description'
                                            error={Boolean(errors.description)}
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    )}
                                />
                                {errors.description && (
                                    <FormHelperText sx={{ color: 'error.main' }}>
                                        {errors.description.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <FormLabel htmlFor='link' error={Boolean(errors.link)}>Link</FormLabel>
                                <Controller
                                    name='link'
                                    control={control}
                                    render={({ field: { value, onChange } }) => (
                                        <TextField
                                            value={value}
                                            onChange={onChange}
                                            type="text"
                                            inputMode="url"
                                            placeholder='Enter Link'
                                            error={Boolean(errors.link)}
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    )}
                                />
                                {errors.link && (
                                    <FormHelperText sx={{ color: 'error.main' }}>
                                        {errors.link.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <FormLabel htmlFor='cost_per_unit' error={Boolean(errors.cost_per_unit)}>
                                    Cost Per Unit
                                </FormLabel>
                                <Controller
                                    name='cost_per_unit'
                                    control={control}
                                    rules={{ required: true, pattern: /^[0-9]*$/ }}
                                    render={({ field: { value, onChange } }) => (
                                        <TextField
                                            type="text"
                                            inputMode="numeric"
                                            value={value}
                                            autoComplete='off'
                                            onChange={(e, newValue) => onChange(newValue)}
                                            error={Boolean(errors.cost_per_unit)}
                                            InputLabelProps={{ shrink: true }}
                                            InputProps={{
                                                inputComponent: CleaveNumberInput,
                                                endAdornment: (
                                                    <InputAdornment position='end'>
                                                        Francs CFA
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    )}
                                />
                                {errors.cost_per_unit && (
                                    <FormHelperText sx={{ color: 'error.main' }}>
                                        {errors.cost_per_unit.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
            <DialogActions>
                <LoadingButton
                    size="large"
                    type="submit"
                    form="medical-specialization-form"
                    variant="contained"
                    loading={loading}
                >
                    Submit
                </LoadingButton>
                <Button size="large" variant="outlined" onClick={toggle}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog >
    </>
}

export default DialogFormMedicalSpecialization