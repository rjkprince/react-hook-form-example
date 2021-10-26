import React, { useState } from "react";
import Select from "react-select";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import {
  Checkbox,
  Input,
  RadioGroup,
  Radio,
  FormControlLabel,
  InputAdornment,
} from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";

interface IFormInput {
  firstName: string;
  lastName: string;
  gender: string;
  emails: { email: string }[];
  phones: { phone: string }[];
  iceCreamType: { label: string; value: string };
  Checkbox: boolean;
}

const NewForm = () => {
  const { control, handleSubmit } = useForm<IFormInput>({
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
        render={({ field }) => <input {...field} />}
        name="firstName"
        control={control}
        defaultValue=""
      />
      <label>Last Name</label>
      <Controller
        render={({ field }) => <input {...field} />}
        name="lastName"
        control={control}
        defaultValue=""
      />
      <label>Gender</label>
      <Controller
        render={({ field }) => {
          const { name, onBlur, onChange, value } = field;
          return (
            <div className="radioDiv">
              <input
                type="radio"
                name={name}
                value="Male"
                onChange={onChange}
                checked={value === "Male"}
              />{" "}
              <p>Male</p>
              <input
                type="radio"
                name={name}
                value="Female"
                onChange={onChange}
                checked={value === "Female"}
              />{" "}
              <p>Female</p>
              <input
                type="radio"
                name={name}
                value="Other"
                onChange={onChange}
                checked={value === "Other"}
              />{" "}
              <p>Other</p>
            </div>
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
            <div className="dynamic-field">
              <input {...field} />
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
            <div className="dynamic-field">
              <input {...field} />
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
          )}
          name={`phones.${index}.phone`}
          control={control}
        />
      ))}
      <label>Ice Cream Preference</label>
      <Controller
        name="iceCreamType"
        render={({ field }) => (
          <Select
            {...field}
            isClearable
            isMulti
            options={[
              { value: "chocolate", label: "Chocolate" },
              { value: "strawberry", label: "Strawberry" },
              { value: "vanilla", label: "Vanilla" },
            ]}
          />
        )}
        control={control}
        defaultValue={undefined}
      />
      <Controller
        name="Checkbox"
        control={control}
        render={({ field }) => {
          const { name, onBlur, onChange, value } = field;
          return (
            <div className="checkboxDiv">
              <input
                type="checkbox"
                name={name}
                onBlur={onBlur}
                onChange={onChange}
                checked={value}
              />
              <p>I accept the Terms and Conditions</p>
            </div>
          );
        }}
      />

      <input type="submit" />
    </form>
  );
};

export default NewForm;
