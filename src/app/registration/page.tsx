"use client";
import clsx from "clsx";
import React, { PropsWithChildren, useState } from "react";
import { FieldErrors, useForm, UseFormRegister } from "react-hook-form";

// interface IRegisterSecondForm {
//   barangay: string;
//   lastName: string;
//   role: string;
//   emailAddress: string;
//   phoneNumber: string;
// }

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
  } = useForm<IRegisterFirstForm>();

  const isFinished = !isValid || isSubmitting;
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  const onSubmit = (data: IRegisterFirstForm) => {
    if (currentPageIndex <= 3) {
      setCurrentPageIndex(currentPageIndex + 1);
      return;
    }

    console.log("Form Data:", data);
  };

  return (
    <div className="max-w-xl mx-auto bordered-wrapper min-h-96 my-4 rounded p-4">
      <h1 className="font-bold text-2xl mb-4">Registration</h1>
      <ProgressIndicator className="mb-4" currentIndex={currentPageIndex} />

      <form onSubmit={handleSubmit(onSubmit)}>
        {currentPageIndex === 1 && (
          <PersonalInformation errors={errors} register={register} />
        )}

        {currentPageIndex === 2 && (
          <>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <Input
                  label="First Name"
                  {...register("firstName", {
                    required: "First Name is required",
                    minLength: {
                      value: 3,
                      message: "First Name must be at least 3 characters long",
                    },
                  })}
                />
                {errors.firstName && <Error>{errors.firstName.message}</Error>}
              </div>

              <div className="flex-1">
                <Input
                  label="Last Name"
                  {...register("lastName", {
                    required: "Last Name is required",
                    minLength: {
                      value: 3,
                      message: "Last Name must be at least 3 characters long",
                    },
                  })}
                />
                {errors.lastName && <Error>{errors.lastName.message}</Error>}
              </div>
            </div>

            <div className="mb-4">
              <Input
                label="Role"
                {...register("role", {
                  required: "role is required",
                  minLength: {
                    value: 3,
                    message: "Role must be at least 3 characters long",
                  },
                })}
              />
              {errors.role && <Error>{errors.role.message}</Error>}
            </div>

            <div className="mb-4">
              <Input
                label="Email Address"
                {...register("emailAddress", {
                  required: "Email Address is required",
                  minLength: {
                    value: 3,
                    message:
                      "Emaill Address must be at least 3 characters long",
                  },
                })}
              />
              {errors.emailAddress && (
                <Error>{errors.emailAddress.message}</Error>
              )}
            </div>

            <div className="mb-4">
              <Input
                label="Phone Number"
                {...register("phoneNumber", {
                  required: "Phone Number is required",
                })}
              />
              {errors.phoneNumber && (
                <Error>{errors.phoneNumber.message}</Error>
              )}
            </div>
          </>
        )}

        {currentPageIndex === 3 && (
          <>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <Input
                  label="First Name"
                  {...register("firstName", {
                    required: "First Name is required",
                    minLength: {
                      value: 3,
                      message: "First Name must be at least 3 characters long",
                    },
                  })}
                />
                {errors.firstName && <Error>{errors.firstName.message}</Error>}
              </div>

              <div className="flex-1">
                <Input
                  label="Last Name"
                  {...register("lastName", {
                    required: "Last Name is required",
                    minLength: {
                      value: 3,
                      message: "Last Name must be at least 3 characters long",
                    },
                  })}
                />
                {errors.lastName && <Error>{errors.lastName.message}</Error>}
              </div>
            </div>

            <div className="mb-4">
              <Input
                label="Role"
                {...register("role", {
                  required: "role is required",
                  minLength: {
                    value: 3,
                    message: "Role must be at least 3 characters long",
                  },
                })}
              />
              {errors.role && <Error>{errors.role.message}</Error>}
            </div>

            <div className="mb-4">
              <Input
                label="Email Address"
                {...register("emailAddress", {
                  required: "Email Address is required",
                  minLength: {
                    value: 3,
                    message:
                      "Emaill Address must be at least 3 characters long",
                  },
                })}
              />
              {errors.emailAddress && (
                <Error>{errors.emailAddress.message}</Error>
              )}
            </div>

            <div className="mb-4">
              <Input
                label="Phone Number"
                {...register("phoneNumber", {
                  required: "Phone Number is required",
                })}
              />
              {errors.phoneNumber && (
                <Error>{errors.phoneNumber.message}</Error>
              )}
            </div>
          </>
        )}

        {currentPageIndex === 4 && (
          <>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <Input
                  label="First Name"
                  {...register("firstName", {
                    required: "First Name is required",
                    minLength: {
                      value: 3,
                      message: "First Name must be at least 3 characters long",
                    },
                  })}
                />
                {errors.firstName && <Error>{errors.firstName.message}</Error>}
              </div>

              <div className="flex-1">
                <Input
                  label="Last Name"
                  {...register("lastName", {
                    required: "Last Name is required",
                    minLength: {
                      value: 3,
                      message: "Last Name must be at least 3 characters long",
                    },
                  })}
                />
                {errors.lastName && <Error>{errors.lastName.message}</Error>}
              </div>
            </div>

            <div className="mb-4">
              <Input
                label="Role"
                {...register("role", {
                  required: "role is required",
                  minLength: {
                    value: 3,
                    message: "Role must be at least 3 characters long",
                  },
                })}
              />
              {errors.role && <Error>{errors.role.message}</Error>}
            </div>

            <div className="mb-4">
              <Input
                label="Email Address"
                {...register("emailAddress", {
                  required: "Email Address is required",
                  minLength: {
                    value: 3,
                    message:
                      "Emaill Address must be at least 3 characters long",
                  },
                })}
              />
              {errors.emailAddress && (
                <Error>{errors.emailAddress.message}</Error>
              )}
            </div>

            <div className="mb-4">
              <Input
                label="Phone Number"
                {...register("phoneNumber", {
                  required: "Phone Number is required",
                })}
              />
              {errors.phoneNumber && (
                <Error>{errors.phoneNumber.message}</Error>
              )}
            </div>
          </>
        )}

        <div className="flex gap-2 justify-end mt-8">
          {currentPageIndex > 1 && (
            <button
              type="submit"
              className="px-8 py-3 rounded font-semibold text-sm tracking-wide bg-gray-800"
              onClick={() => setCurrentPageIndex(currentPageIndex - 1)}
            >
              Prev
            </button>
          )}

          <button
            type="submit"
            className={clsx(
              "px-8 py-3 rounded font-semibold text-sm tracking-wide",
              isFinished ? "bg-gray-800" : "bg-gray-200 text-gray-800 "
            )}
            disabled={isFinished}
          >
            {currentPageIndex === 4 ? "Review" : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
};

interface IRegisterFirstForm {
  firstName: string;
  lastName: string;
  role: string;
  emailAddress: string;
  phoneNumber: string;
}

function PersonalInformation({
  errors,
  register,
}: {
  errors: FieldErrors<IRegisterFirstForm>;
  register: UseFormRegister<IRegisterFirstForm>;
}) {
  return (
    <>
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-1">
          <Input
            label="First Name"
            {...register("firstName", {
              required: "First Name is required",
              minLength: {
                value: 3,
                message: "First Name must be at least 3 characters long",
              },
            })}
          />
          {errors.firstName && <Error>{errors.firstName.message}</Error>}
        </div>

        <div className="flex-1">
          <Input
            label="Last Name"
            {...register("lastName", {
              required: "Last Name is required",
              minLength: {
                value: 3,
                message: "Last Name must be at least 3 characters long",
              },
            })}
          />
          {errors.lastName && <Error>{errors.lastName.message}</Error>}
        </div>
      </div>

      <div className="mb-4">
        <Input
          label="Role"
          {...register("role", {
            required: "role is required",
            minLength: {
              value: 3,
              message: "Role must be at least 3 characters long",
            },
          })}
        />
        {errors.role && <Error>{errors.role.message}</Error>}
      </div>

      <div className="mb-4">
        <Input
          label="Email Address"
          {...register("emailAddress", {
            required: "Email Address is required",
            minLength: {
              value: 3,
              message: "Emaill Address must be at least 3 characters long",
            },
          })}
        />
        {errors.emailAddress && <Error>{errors.emailAddress.message}</Error>}
      </div>

      <div className="mb-4">
        <Input
          label="Phone Number"
          {...register("phoneNumber", {
            required: "Phone Number is required",
          })}
        />
        {errors.phoneNumber && <Error>{errors.phoneNumber.message}</Error>}
      </div>
    </>
  );
}

function Input({ label, ...props }: { label: string }) {
  return (
    <>
      <label className="block text-sm text-gray-100/50">{label}</label>
      <input
        {...props}
        className="w-full border p-2 rounded mt-1 text-gray-900 text-sm border-transparent focus-input"
      />
    </>
  );
}

function Error({ children }: PropsWithChildren) {
  return <p className="text-red-500 text-sm">{children}</p>;
}

function ProgressIndicator({
  currentIndex,
  className,
}: {
  currentIndex: number;
  className: string;
}) {
  return (
    <div className={clsx("flex justify-between relative", className)}>
      <ProgressIndicatorBadge
        index="1"
        description="Personal Information"
        isDone={currentIndex >= 1}
      />
      <ProgressIndicatorLine
        className="progress-line left-10"
        isDone={currentIndex >= 2}
      />
      <ProgressIndicatorBadge
        index="2"
        description="Barangay Information"
        isDone={currentIndex >= 2}
      />
      <ProgressIndicatorLine
        className="progress-line left-1/2 -translate-x-1/2"
        isDone={currentIndex >= 3}
      />
      <ProgressIndicatorBadge
        index="3"
        description="Document Upload"
        isDone={currentIndex >= 3}
      />
      <ProgressIndicatorLine
        className="progress-line right-10"
        isDone={currentIndex >= 4}
      />
      <ProgressIndicatorBadge
        index="4"
        description="Review & Submit"
        isDone={currentIndex >= 4}
      />
    </div>
  );
}

function ProgressIndicatorBadge({
  index,
  description,
  isDone = false,
}: {
  index: string;
  description: string;
  isDone: boolean;
}) {
  return (
    <div className="flex flex-col justify-center items-center w-20 text-center">
      <span
        className={clsx(
          "flex justify-center items-center rounded-full w-12 h-12 mb-2",
          isDone ? "bg-gray-200 text-gray-800" : "bg-gray-800"
        )}
      >
        {index}
      </span>
      <p className={clsx(isDone ? "text-gray-200" : "text-gray-100/50")}>
        {description}
      </p>
    </div>
  );
}

function ProgressIndicatorLine({
  className,
  isDone = false,
}: {
  className?: string;
  isDone: boolean;
}) {
  return (
    <div
      className={clsx(
        "absolute top-1/4 -translate-y-1/4 -z-10 h-1 w-36 flex justify-center items-center",
        className,
        isDone ? "bg-gray-200" : "bg-gray-100/30"
      )}
    />
  );
}
export default Page;
