"use client";

import { useParams } from "next/navigation";
import { useMemo } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionActions
} from "@/components/merchants/detail/ui";
import http from "@/http";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LoadingButton from "@/atoms/loading-button";
import MenuItem from "@mui/material/MenuItem";
import { useNotifyAlertCtx } from "@/components/notify-alert/notify-alert-context";
import TextField from "@mui/material/TextField";
import { Formik, Form } from "formik";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Input, Select } from "@/atoms/form";
import Autocomplete from "@mui/material/Autocomplete";
import { normalizeBusinessTypes } from "./utils";

const countryCurrencies = ["KES", "USD", "EUR"];

export default function BusinessInformation({
  expanded,
  handleExpandedChange,
  data,
  utils
}) {
  const { id: merchantId } = useParams();
  const setAlertMessage = useNotifyAlertCtx();
  /**
   * Normalized the business types data return by backend into key value pairs for ease of use in
   * dropdowns and memoize to reduce number of computations
   */
  const businessTypes = useMemo(
    () => normalizeBusinessTypes(utils.businessTypes),
    [utils.businessTypes]
  );

  /**
   * Simplified list of objects {country, currency} that is cached
   * // @typedef {country: string; currency: string}[] CurrencyList
   *
   * // @param {CurrencyList} currencies
   */

  // const currencies = useMemo(
  //   () => normalizeCountryCurrencies(utils.countries),
  //   [utils.countries]
  // );

  const industryCategories = useMemo(
    () =>
      utils?.industries?.map((industry) => ({
        key: industry?.value,
        value: industry?.attributes?.name
      })),

    [utils?.industries]
  );

  // const industrySubCategories = useMemo(() => {
  //   const subCategories = [];

  //   utils?.industries?.forEach((industry) => {
  //     subCategories.push(...(industry?.attributes?.subCategories || []));
  //   });

  //   return subCategories.map((subCategory) => ({
  //     key: subCategory?.id || "",
  //     value: subCategory?.attributes?.name || ""
  //   }));
  // }, [utils?.industries]);

  const getSubCategories = (categoryId) => {
    const categoryItem = utils?.industries?.find(
      (category) => category?.value === categoryId
    );

    if (!categoryItem) return [];

    return categoryItem?.attributes?.subCategories?.map((subCategory) => ({
      key: subCategory?.id || "",
      value: subCategory?.attributes?.name || ""
    }));
  };

  /**
   * Determines which dropdown options to show on the `businessType` field depending
   * on the selected value for registeredStatus and duration
   *
   * @type {import('formik').FormikProps} formikProps
   */
  const typesToShow = (formikProps) => {
    // Registered Business types
    if (formikProps.values.registeredStatus === 1) {
      return businessTypes?.registeredBusinessTypes;
    }

    // Non registered long term business types
    if (
      formikProps.values.registeredStatus === 2 &&
      formikProps.values.duration === 1
    ) {
      return businessTypes?.nonRegisteredLongTermBusinessTypes;
    }

    // Non registered short type business types
    if (
      formikProps.values.registeredStatus === 2 &&
      formikProps.values.duration === 2
    ) {
      return businessTypes?.nonRegisteredShortTermBusinessTypes;
    }

    // default to empty array to avoid type error
    return [];
  };

  /**
   * Determines if businessType field is disabled
   *
   * businessType is disabled when registeredStatus is not selected or
   * registeredStatus is Non Registered business and no duration is selected
   *
   * @param {import('formik').FormikProps} formikProps
   */

  const isBisabledBusinessType = (formikProps) =>
    !formikProps.values.registeredStatus ||
    (formikProps.values.registeredStatus === 2 && !formikProps.values.duration);

  const merchantStatusList = ["LIVE", "TEST", "DORMANT", "SUSPENDED"];

  /**
   * Handles posting of the form
   */

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      // Todo. Add request for business
      await http({
        url: `/merchants/${merchantId}/kyc/business`,
        method: "PATCH",
        data: values,
        includeAuthorization: true
      });
    } catch (error) {
      if (error?.response?.status === 406) {
        setErrors(error?.response?.data?.error || {});
      }
      const msg =
        error?.httpMessage || "Error! Could not updated business details";

      setAlertMessage(msg, { openDuration: 3000, type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Accordion expanded={expanded} onChange={handleExpandedChange}>
      <AccordionSummary aria-controls="panel1-content" id="panel1-header">
        <Stack direction="row" columnGap={2}>
          <Typography>Business Information</Typography>
        </Stack>
      </AccordionSummary>

      <Box>
        <Formik
          initialValues={{
            businessName: data?.attributes?.businessName || "",
            businessBrandName: data?.attributes?.brandName || "",
            businessRegistrationNumber:
              data?.attributes?.businessRegistrationNumber || "",
            businessCategory: "",
            businessSubCategory: data?.attributes?.businessSubCategory || "",
            businessTaxPin: data?.attributes?.businessTaxPin || "",
            businessTelephone: data?.attributes?.businessPhoneNumber || "",
            businessEmail: data?.attributes?.businessEmail || "",
            businessDescription: data?.attributes?.businessDescription || "",
            // businessCurrencies: [], // ? multpile values allow

            businessStatus: data?.attributes?.businessType || "",
            registeredStatus: "",
            businessOldVid: "",
            agreedCommissionRate: data?.attributes?.businessRate || "",
            businessType: data?.attributes?.businessType || "",
            duration: data?.attributes?.signUpDuration || "",
            referenceId: ""
          }}
          onSubmit={handleSubmit}
        >
          {(formikProps) => (
            <Form>
              <AccordionDetails>
                <Grid container rowSpacing={2} columnSpacing={2}>
                  <Grid xs={12} md={6}>
                    <Input name="businessName" label="Business Name" />
                  </Grid>
                  <Grid xs={12} md={6}>
                    <Input name="businessBrandName" label="BrandName" />
                  </Grid>
                  <Grid xs={12} md={6}>
                    <Select name="businessCategory" label="Category">
                      <MenuItem value="">Select Category</MenuItem>
                      {industryCategories?.map((category) => (
                        <MenuItem key={category?.key} value={category?.key}>
                          {category?.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid xs={12} md={6}>
                    <Select name="businessSubCategory" label="Sub Category">
                      <MenuItem value="">Select Subcategory</MenuItem>
                      {getSubCategories(
                        formikProps.values.businessCategory
                      )?.map((subCategory) => (
                        <MenuItem
                          key={subCategory?.key}
                          value={subCategory?.key}
                        >
                          {subCategory?.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid xs={12} md={6}>
                    <Input
                      name="businessRegistrationNumber"
                      label="Registration Number"
                    />
                  </Grid>
                  <Grid xs={12} md={6}>
                    <Input name="businessTaxPin" label="Business Tax Pin" />
                  </Grid>
                  <Grid xs={12} md={6}>
                    <Input
                      name="businessTelephone"
                      label="Business Telephone"
                    />
                  </Grid>
                  <Grid xs={12} md={6}>
                    <Input name="businessEmail" label="Business Email" />
                  </Grid>
                  <Grid xs={12} md={6}>
                    <Input
                      name="businessDescription"
                      label="Business Description"
                    />
                  </Grid>

                  <Grid xs={12} md={6}>
                    <Autocomplete
                      multiple
                      name="businessCurrencies"
                      value={formikProps.values.businessCurrencies}
                      onChange={(_, newValue) => {
                        formikProps.setFieldValue(
                          "businessCurrencies",
                          newValue
                        );
                      }}
                      id="businessCurrencies"
                      options={countryCurrencies}
                      getOptionLabel={(option) => option}
                      defaultValue={[]}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Currencies"
                        />
                      )}
                    />
                  </Grid>
                  <Grid xs={12} md={6}>
                    <Select name="businessStatus" label="Business Status">
                      <MenuItem value="">Select Status</MenuItem>
                      {merchantStatusList.map((status) => (
                        <MenuItem key={status} value={status}>
                          {status}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid xs={12} md={6}>
                    <Select name="registeredStatus" label="Registration Status">
                      <MenuItem value="">Select Registration Status</MenuItem>
                      {businessTypes?.registeredStatuses?.map((type) => (
                        <MenuItem key={type?.key} value={type?.key}>
                          {type?.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>

                  {formikProps.values.registeredStatus === 2 && (
                    <Grid xs={12} md={6}>
                      <Select name="duration" label="Duration">
                        <MenuItem value="">Select Duration</MenuItem>
                        {businessTypes?.businessDurations?.map((type) => (
                          <MenuItem key={type?.key} value={type?.key}>
                            {type?.value}
                          </MenuItem>
                        ))}
                      </Select>
                    </Grid>
                  )}
                  <Grid xs={12} md={6}>
                    <Select
                      name="businessType"
                      label="Business Type"
                      disabled={isBisabledBusinessType(formikProps)}
                    >
                      <MenuItem value="">Select Business Type</MenuItem>
                      {typesToShow(formikProps)?.map((type) => (
                        <MenuItem key={type?.key} value={type?.key}>
                          {type?.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>

                  <Grid xs={12} md={6}>
                    <Input name="businessOldVid" label="Business Old Vid" />
                  </Grid>
                  <Grid xs={12} md={6}>
                    <Input
                      name="agreedCommissionRate"
                      label="Agreed Commission"
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>

              <AccordionActions>
                <LoadingButton
                  color="primary"
                  variant="contained"
                  type="submit"
                  loading={formikProps.isSubmitting}
                >
                  Save
                </LoadingButton>
              </AccordionActions>
            </Form>
          )}
        </Formik>
      </Box>
    </Accordion>
  );
}
