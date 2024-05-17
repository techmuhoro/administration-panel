function getRegisteredStatuses(businessTypes) {
  return businessTypes?.map((businessType) => ({
    key: businessType?.id,
    value: businessType?.name
  }));
}

function getRegisteredBusinessTypes(businessTypes) {
  const registeredCategory = businessTypes.find(
    (businessType) => businessType.name === "Registered Business"
  );

  return (
    registeredCategory?.category?.map((type) => ({
      key: type?.id,
      value: type?.name
    })) || []
  );
}

function getNonRegisteredLongTermBusinessTypes(businessTypes) {
  const nonRegisteredCategory =
    businessTypes?.find(
      (businessType) => businessType.name === "Non Registered Business"
    ) || [];

  const longTermBusinessTypes = nonRegisteredCategory?.category?.find(
    (category) => category.name === "Long Term Business"
  );

  return (
    longTermBusinessTypes?.category?.map((type) => ({
      key: type?.id,
      value: type?.name
    })) || []
  );
}

function getNonRegisteredShortTermBusinessTypes(businessTypes) {
  const nonRegisteredCategory =
    businessTypes?.find(
      (businessType) => businessType.name === "Non Registered Business"
    ) || [];

  const shortTermBusinessTypes = nonRegisteredCategory?.category?.find(
    (category) => category.name === "Short Term Business"
  );

  return (
    shortTermBusinessTypes?.category?.map((type) => ({
      key: type?.id,
      value: type?.name
    })) || []
  );
}

// Applicable for Non Registered business
export function getBusinessDurations(businessTypes) {
  const nonRegisteredCategory =
    businessTypes?.find(
      (businessType) => businessType.name === "Non Registered Business"
    ) || [];

  return (
    nonRegisteredCategory?.category?.map((category) => ({
      key: category?.id,
      value: category?.name
    })) || []
  );
}

export function normalizeBusinessTypes(businessTypes) {
  return {
    registeredStatuses: getRegisteredStatuses(businessTypes),
    registeredBusinessTypes: getRegisteredBusinessTypes(businessTypes),
    businessDurations: getBusinessDurations(businessTypes),
    nonRegisteredLongTermBusinessTypes:
      getNonRegisteredLongTermBusinessTypes(businessTypes),
    nonRegisteredShortTermBusinessTypes:
      getNonRegisteredShortTermBusinessTypes(businessTypes)
  };
}

export function normalizeCountryCurrencies(countriesData) {
  return countriesData?.map((country) => ({
    country: country?.attributes?.name,
    currency: country?.attributes?.currencyCode
  }));
}
