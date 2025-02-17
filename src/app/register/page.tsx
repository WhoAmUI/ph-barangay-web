"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import Combobox from "@/components/ui/combobox";
import ConfirmationModal from "@/components/confirmation-modal";
import useLocalStorage from "../hooks/useLocalStorage";
import ErrorMessage from "@/components/error-message";
import { FormData, schema, StoredFormData } from "@/schema/register";
import { ProgressIndicator } from "@/components/progress-indicator";
import { ACCEPTED_FILE_TYPES } from "@/schema/register";
import Image from "next/image";
import { cn } from "@/lib/utils";
import SuccessModal from "./success-modal";
import ErrorModal from "./error-modal";
import { useRouter } from "next/navigation";

const Page = () => {
  const [step, setStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<"success" | "error" | "">("");
  const router = useRouter();

  const { saveData, loadData, clearData } = useLocalStorage("formProgress");
  const savedData = loadData();

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  function onReset() {
    setStep(1);
    setIsModalOpen(false);
    setIsSubmitting(false);
    setIsLoading(false);
    setStatus("");

    router.push("/register");
    window.location.reload();
  }

  const { handleSubmit, trigger, getValues } = methods;

  const validateFields = () => {
    // this is for zod to validate each assign fields
    let fields: (keyof FormData)[] = [];

    if (step === 1) {
      fields = ["firstName", "lastName", "role", "emailAddress", "phoneNumber"];
    } else if (step === 2) {
      fields = ["barangay", "cityMunicipality", "province"];
    } else if (step === 3) {
      fields = ["officialId", "authorizationLetter", "supportingDocuments"];
    }

    return fields;
  };

  const convertFileToBase64 = (file: File | undefined) =>
    new Promise<string | null>((resolve, reject) => {
      if (!file) return resolve(null);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const toggleModal = async () => {
    const fields = validateFields();
    const isStepValid = await trigger(fields);

    if (isStepValid) {
      setIsModalOpen(!isModalOpen);
      const values = getValues();

      try {
        const storedData: Partial<StoredFormData> = {
          ...values,
          officialId: await convertFileToBase64(values.officialId),
          authorizationLetter: await convertFileToBase64(
            values.authorizationLetter
          ),
          supportingDocuments: await convertFileToBase64(
            values.supportingDocuments
          ),
        };
        saveData(storedData);
      } catch (error) {
        console.error("Error converting files to base64", error);
      }
    }
  };

  const nextStep = async () => {
    const fields = validateFields();
    const isStepValid = await trigger(fields);

    if (isStepValid) {
      setStep(step + 1);
      const values = { ...getValues(), ...savedData };

      saveData({
        ...values,
        officialId:
          values.officialId instanceof File ? values.officialId.name : null,
        authorizationLetter:
          values.authorizationLetter instanceof File
            ? values.authorizationLetter.name
            : null,
        supportingDocuments:
          values.supportingDocuments instanceof File
            ? values.supportingDocuments.name
            : null,
      } as Partial<StoredFormData>);
    }
  };

  const prevStep = () => setStep(step - 1);

  useEffect(() => {
    if (!savedData) {
      setIsLoading(false);
      return;
    }

    if (!savedData.firstName) {
      setStep(1);
      setIsLoading(false);
    } else if (!savedData.cityMunicipality) {
      setStep(2);
      setIsLoading(false);
    } else if (!savedData.officialId) {
      setStep(3);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [savedData]);

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);

      console.log(data);
      const response = await Promise.resolve({ ok: true });

      if (!response.ok) {
        throw new Error("Submission failed");
      }
      clearData();
      setStatus("success");
    } catch (e) {
      console.error(e);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "success") return <SuccessModal onReset={onReset} />;

  if (status === "error") return <ErrorModal />;

  return (
    <div className="max-w-xl mx-2 sm:mx-auto border bg-card text-card-foreground shadow min-h-96 my-4 rounded-xl p-4">
      <h1 className="font-bold text-2xl mb-4">Registration</h1>
      {isLoading ? (
        <div
          role="status"
          className="flex justify-center items-center h-60 w-full"
        >
          <svg
            aria-hidden="true"
            className="w-8 h-8 animate-spin text-white dark:text-gray-600"
            viewBox="0 0 100 101"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              className="fill-gray-900"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="white"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <FormProvider {...methods}>
          <ProgressIndicator className="mb-4" currentIndex={step} />
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
            {step === 1 && <PersonalInformation />}
            {step === 2 && <BarangayInformation />}
            {step === 3 && <DocumentUpload />}

            <div className="flex gap-2 justify-end mt-8">
              {step > 1 && (
                <Button variant="outline" onClick={prevStep}>
                  Previous
                </Button>
              )}

              {step <= 3 && (
                <Button
                  type="button"
                  onClick={() => (step === 3 ? toggleModal() : nextStep())}
                >
                  Next
                </Button>
              )}
            </div>
          </form>

          {isModalOpen && (
            <ConfirmationModal
              isOpen={isModalOpen}
              onClose={toggleModal}
              onConfirm={handleSubmit(onSubmit)}
              isSubmitting={isSubmitting}
            />
          )}
        </FormProvider>
      )}
    </div>
  );
};

export default Page;

// Step 1
export function PersonalInformation() {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>();

  const { loadData } = useLocalStorage("formProgress");
  const savedData = loadData();

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
        <div className="w-full">
          <Label>First Name</Label>
          <Input
            defaultValue={savedData?.firstName}
            {...register("firstName")}
          />
          {errors.firstName && (
            <ErrorMessage>{errors.firstName.message}</ErrorMessage>
          )}
        </div>

        <div className="w-full">
          <Label>Last Name</Label>
          <Input defaultValue={savedData?.lastName} {...register("lastName")} />
          {errors.lastName && (
            <ErrorMessage>{errors.lastName.message}</ErrorMessage>
          )}
        </div>
      </div>

      <div className="mb-4">
        <Label>Role</Label>
        <Input defaultValue={savedData?.role} {...register("role")} />
        {errors.role && <ErrorMessage>{errors.role.message}</ErrorMessage>}
      </div>

      <div className="mb-4">
        <Label>Email Address</Label>
        <Input
          defaultValue={savedData?.emailAddress}
          {...register("emailAddress")}
        />
        {errors.emailAddress && (
          <ErrorMessage>{errors.emailAddress.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-4">
        <Label>Phone Number</Label>
        <Input
          defaultValue={savedData?.phoneNumber}
          {...register("phoneNumber")}
        />
        {errors.phoneNumber && (
          <ErrorMessage>{errors.phoneNumber.message}</ErrorMessage>
        )}
      </div>
    </div>
  );
}

// Step 2

interface ILocation {
  code: string;
  name: string;
}

const fetchLocations = async (query: string): Promise<ILocation[]> => {
  const getProvince = await fetch(query);
  return await getProvince.json();
};

const API_URL = "https://psgc.gitlab.io/api";

export function BarangayInformation() {
  const {
    formState: { errors },
    setValue,
  } = useFormContext<FormData>();

  const { loadData } = useLocalStorage("formProgress");
  const savedData = loadData();

  const [locationProvince, setLocationProvince] = useState<ILocation[]>([]);
  const [locationMunicipality, setLocationMunicipality] = useState<ILocation[]>(
    []
  );
  const [locationBarangay, setLocationBarangay] = useState<ILocation[]>([]);

  const [province, setProvince] = useState<ILocation | undefined>();
  const [municipality, setMunicipality] = useState<ILocation | undefined>();

  // get the information of specific location via combobox
  const onSetProvince = (location: ILocation | undefined) => {
    setProvince(
      locationProvince.find((province) => province.code === location?.code)
    );

    if (location) setValue("province", location?.name);
  };

  const onSetMunicipality = (location: ILocation | undefined) => {
    setMunicipality(
      locationMunicipality.find(
        (municipality) => municipality.code === location?.code
      )
    );
    if (location) setValue("cityMunicipality", location?.name);
  };

  const onSetBarangay = (location: ILocation | undefined) => {
    if (location) setValue("barangay", location?.name);
  };

  // get provinces
  useEffect(() => {
    fetchLocations(`${API_URL}/provinces/`).then((locations) =>
      setLocationProvince(locations)
    );
  }, []);

  // get municipality/city
  useEffect(() => {
    if (province) {
      fetchLocations(
        `${API_URL}/provinces/${province.code}/cities-municipalities/`
      ).then((locations) => setLocationMunicipality(locations));
    }
  }, [province]);

  // get barangay
  useEffect(() => {
    if (municipality) {
      fetchLocations(
        `${API_URL}/cities-municipalities/${municipality.code}/barangays/`
      ).then((locations) => {
        setLocationBarangay(locations);
      });
    }
  }, [municipality]);

  return (
    <div className="space-y-4">
      <div className="w-full">
        <Label>Province</Label>
        <Combobox
          defaultValue={savedData?.province}
          data={locationProvince}
          onSetValue={onSetProvince}
        />
        {errors.province && (
          <ErrorMessage>{errors.province.message}</ErrorMessage>
        )}
      </div>

      <div className="w-full">
        <Label>City / Municipality</Label>
        <Combobox
          defaultValue={savedData?.cityMunicipality}
          data={locationMunicipality}
          onSetValue={onSetMunicipality}
        />
        {errors.cityMunicipality && (
          <ErrorMessage>{errors.cityMunicipality.message}</ErrorMessage>
        )}
      </div>

      <div className="w-full">
        <Label>Barangay</Label>
        <Combobox
          defaultValue={savedData?.barangay}
          data={locationBarangay}
          onSetValue={onSetBarangay}
        />
        {errors.barangay && (
          <ErrorMessage>{errors.barangay.message}</ErrorMessage>
        )}
      </div>
    </div>
  );
}

// Step 3

export function DocumentUpload() {
  return (
    <div className="space-y-4">
      <FileUpload name="officialId" label="Official ID" />
      <FileUpload name="authorizationLetter" label="Authorization Letter" />
      <FileUpload
        name="supportingDocuments"
        label="Supporting Documents"
        multiple={true}
      />
    </div>
  );
}

const FileUpload = ({
  name,
  multiple = false,
  label,
}: {
  name: keyof FormData;
  multiple?: boolean;
  label: string;
}) => {
  const {
    setValue,
    formState: { errors },
  } = useFormContext<FormData>();

  const [previewUrl, setPreviewUrl] = useState<string | undefined>();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      return;
    }

    // supporting documents
    // TODO: store uploaded files in our form state
    if (files.length > 1) {
      setValue(name, files[0]);
      setPreviewUrl(URL.createObjectURL(files[0]));
      return;
    }

    setValue(name, files[0]);
    setPreviewUrl(URL.createObjectURL(files[0]));
  };

  return (
    <div className="mb-4">
      <Label>{label}</Label>
      <div className="flex items-center gap-2">
        <Input
          type="file"
          multiple={multiple}
          onChange={handleFileChange}
          accept={ACCEPTED_FILE_TYPES.join(",")}
          className={cn(errors[name] && "border-red-500")}
        />
      </div>
      {errors[name] && <ErrorMessage>{errors[name].message}</ErrorMessage>}

      {previewUrl && (
        <div className="mt-2">
          <Image
            src={previewUrl}
            alt="Preview"
            width={100}
            height={100}
            style={{ width: "auto", height: "auto" }}
            className="rounded-md"
          />
        </div>
      )}
    </div>
  );
};
