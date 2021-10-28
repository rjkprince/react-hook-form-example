import React, { useState } from "react";
import Select from "react-select";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import RDSelect from "react-dropdown-select";

interface IFormInput {
  firstName: string;
  lastName: string;
  gender: string;
  emails: { email: string }[];
  phones: { phone: string }[];
  iceCreamType: { label: string; value: string };
  game: { label: string; value: string }[];
  Checkbox: boolean;
  isVehicle: boolean;
  vehicleNumber: string;
}

const NewForm = () => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch,
  } = useForm<IFormInput>({
    defaultValues: {
      emails: [{ email: "" }],
      phones: [{ phone: "" }],
    },
  });

  const {
    fields: emailFields,
    append: appendEmailField,
    remove: removeEmailField,
  } = useFieldArray({
    control,
    name: "emails",
  });

  const {
    fields: phoneFields,
    append: appendPhoneField,
    remove: removePhoneField,
  } = useFieldArray({
    control,
    name: "phones",
  });

  const onSubmit = (data: IFormInput) => {
    alert(JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>First Name</label>
      <Controller
        render={({ field }) => (
          <>
            {" "}
            <input
              {...register("firstName", {
                required: true,
                maxLength: 20,
                pattern: /^[A-Za-z]+$/i,
              })}
              {...field}
            />
            {errors?.firstName?.type === "required" && (
              <p className="error">This field is required</p>
            )}
            {errors?.firstName?.type === "maxLength" && (
              <p className="error">First name cannot exceed 20 characters</p>
            )}
            {errors?.firstName?.type === "pattern" && (
              <p className="error">Alphabetical characters only</p>
            )}
          </>
        )}
        name="firstName"
        control={control}
        defaultValue=""
      />
      <label>Last Name</label>
      <Controller
        render={({ field }) => (
          <>
            {" "}
            <input
              {...register("lastName", {
                required: true,
                maxLength: 20,
                pattern: /^[A-Za-z]+$/i,
              })}
              {...field}
            />
            {errors?.lastName?.type === "required" && (
              <p className="error">This field is required</p>
            )}
            {errors?.lastName?.type === "maxLength" && (
              <p className="error">Last name cannot exceed 20 characters</p>
            )}
            {errors?.lastName?.type === "pattern" && (
              <p className="error">Alphabetical characters only</p>
            )}
          </>
        )}
        name="lastName"
        control={control}
        defaultValue=""
      />
      <label>Gender</label>
      <Controller
        render={({ field }) => {
          const { name, onBlur, onChange, value } = field;
          return (
            <>
              <div className="radioDiv">
                <input
                  {...register("gender", {
                    required: true,
                  })}
                  type="radio"
                  name={name}
                  value="Male"
                  onChange={onChange}
                  checked={value === "Male"}
                />{" "}
                <p>Male</p>
                <input
                  {...register("gender", {
                    required: true,
                  })}
                  type="radio"
                  name={name}
                  value="Female"
                  onChange={onChange}
                  checked={value === "Female"}
                />{" "}
                <p>Female</p>
                <input
                  {...register("gender", {
                    required: true,
                  })}
                  type="radio"
                  name={name}
                  value="Other"
                  onChange={onChange}
                  checked={value === "Other"}
                />{" "}
                <p>Other</p>
              </div>
              {errors?.gender?.type === "required" && (
                <p className="error">This field is required</p>
              )}
            </>
          );
        }}
        name="gender"
        control={control}
        defaultValue=""
      />
      <label className="dynamic-field-label">
        Email
        <button
          className="add-btn"
          onClick={(e) => {
            e.preventDefault();
            appendEmailField({ email: "" });
          }}
        >
          Add
        </button>
      </label>
      {emailFields.map((item, index) => (
        <Controller
          key={item.id}
          render={({ field }) => (
            <>
              <div className="dynamic-field">
                <input
                  {...register(`emails.${index}.email`, {
                    required: true,
                    maxLength: 50,
                    pattern:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                  {...field}
                />
                {emailFields.length > 1 ? (
                  <button
                    className="remove-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      removeEmailField(index);
                    }}
                  >
                    Delete
                  </button>
                ) : null}
              </div>
              {errors?.emails &&
                errors?.emails[index]?.email?.type === "required" && (
                  <p className="error">This field is required</p>
                )}
              {errors?.emails &&
                errors?.emails[index]?.email?.type === "maxLength" && (
                  <p className="error">Email cannot exceed 50 characters</p>
                )}
              {errors?.emails &&
                errors?.emails[index]?.email?.type === "pattern" && (
                  <p className="error">Invalid Email</p>
                )}
            </>
          )}
          name={`emails.${index}.email`}
          control={control}
        />
      ))}
      <label className="dynamic-field-label">
        Phone{" "}
        <button
          className="add-btn"
          onClick={(e) => {
            e.preventDefault();
            appendPhoneField({ phone: "" });
          }}
        >
          Add
        </button>
      </label>
      {phoneFields.map((item, index) => (
        <Controller
          key={item.id}
          render={({ field }) => (
            <>
              <div className="dynamic-field">
                <input
                  {...register(`phones.${index}.phone`, {
                    required: true,
                    pattern: /^\d{10}$/,
                  })}
                  {...field}
                />
                {phoneFields.length > 1 ? (
                  <button
                    className="remove-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      removePhoneField(index);
                    }}
                  >
                    Delete
                  </button>
                ) : null}
              </div>
              {errors?.phones &&
                errors?.phones[index]?.phone?.type === "required" && (
                  <p className="error">This field is required</p>
                )}
              {errors?.phones &&
                errors?.phones[index]?.phone?.type === "pattern" && (
                  <p className="error">10 digits numeric values only</p>
                )}
            </>
          )}
          name={`phones.${index}.phone`}
          control={control}
        />
      ))}
      <label>Ice Cream Preference</label>
      <Controller
        name="iceCreamType"
        render={({ field }) => (
          <>
            <Select
              {...register("iceCreamType", {
                required: true,
              })}
              {...field}
              isClearable
              isMulti
              options={[
                { value: "chocolate", label: "Chocolate" },
                { value: "strawberry", label: "Strawberry" },
                { value: "vanilla", label: "Vanilla" },
              ]}
            />
            {
              // @ts-ignore:next-line
              errors?.iceCreamType?.type === "required" && (
                <p className="error">This field is required</p>
              )
            }
          </>
        )}
        control={control}
        defaultValue={undefined}
      />
      <Controller
        name="game"
        render={({ field }) => {
          const { name, onBlur, onChange, value } = field;
          return (
            <div className="gameSelect">
              <RDSelect
                {...register("game", {
                  required: true,
                })}
                name={name}
                onDropdownClose={onBlur}
                onChange={onChange}
                values={value}
                clearable
                multi
                options={[
                  { value: "cricket", label: "Cricket" },
                  { value: "football", label: "Football" },
                  { value: "tennis", label: "Tennis" },
                ]}
              />
              {
                // @ts-ignore:next-line
                errors?.game?.type === "required" && (
                  <p className="error">This field is required</p>
                )
              }
            </div>
          );
        }}
        control={control}
        defaultValue={undefined}
      />

      <Controller
        name="isVehicle"
        control={control}
        render={({ field }) => {
          const { name, onBlur, onChange, value } = field;
          return (
            <>
              <div className="checkboxDiv">
                <input
                  type="checkbox"
                  name={name}
                  onBlur={onBlur}
                  onChange={(e) => {
                    onChange(e);
                    setValue("vehicleNumber", "");
                  }}
                  checked={value}
                />
                <p>Do you have a vehicle?</p>
              </div>
            </>
          );
        }}
      />

      {watch("isVehicle") && (
        <>
          <label>Vehicle Number</label>
          <Controller
            render={({ field }) => (
              <>
                {" "}
                <input
                  {...register("vehicleNumber", {
                    required: true,
                    maxLength: 30,
                  })}
                  {...field}
                />
                {errors?.vehicleNumber?.type === "required" && (
                  <p className="error">This field is required</p>
                )}
                {errors?.vehicleNumber?.type === "maxLength" && (
                  <p className="error">
                    Vehicle number cannot exceed 30 characters
                  </p>
                )}
              </>
            )}
            name="vehicleNumber"
            control={control}
            defaultValue=""
          />
        </>
      )}

      <Controller
        name="Checkbox"
        control={control}
        render={({ field }) => {
          const { name, onBlur, onChange, value } = field;
          return (
            <>
              <div className="checkboxDiv">
                <input
                  {...register("Checkbox", {
                    required: true,
                  })}
                  type="checkbox"
                  name={name}
                  onBlur={onBlur}
                  onChange={onChange}
                  checked={value}
                />
                <p>I accept the Terms and Conditions</p>
              </div>
              {errors?.Checkbox?.type === "required" && (
                <p className="error">This field is required</p>
              )}
            </>
          );
        }}
      />
      <input type="submit" />
    </form>
  );
};

export default NewForm;
