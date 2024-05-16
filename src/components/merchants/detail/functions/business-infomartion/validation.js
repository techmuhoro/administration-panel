import * as Yup from "yup";

const validationShema = Yup.object().shape({
  businessName: Yup.string().required("Required"),
  businessBrandName: Yup.string().required("Required"),
  businessRegistrationNumber: Yup.string().required("Required"),
  businessTaxPin: Yup.string().required("Required"),
  businessTelephone: Yup.string().required("Required"),
  businessEmail: Yup.string().required("Required"),
  businessDescription: Yup.string().required("Required"),
  businessCurrencies: Yup.string().optional(),
  acceptUSD: Yup.string().required("Required"),

  businessStatus: Yup.string().required("Required"),

  businessCategory: Yup.string().required("Required"),
  businessSubCategory: Yup.string().required("Required"),

  registeredStatus: Yup.string().required("Required"),
  duration: Yup.string().required("Required"),
  businessType: Yup.string().required("Required"),

  businessOldVid: Yup.string().optional(),
  agreedCommissionRate: Yup.string().optional(),
  referenceId: Yup.string().optional()
});

export default validationShema;
