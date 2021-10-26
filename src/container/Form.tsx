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

const Form = () => {
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
        render={({ field }) => <Input {...field} className="materialUIInput" />}
        name="firstName"
        control={control}
        defaultValue=""
      />
      <label>Last Name</label>
      <Controller
        render={({ field }) => <Input {...field} className="materialUIInput" />}
        name="lastName"
        control={control}
        defaultValue=""
      />
      <label>Gender</label>
      <Controller
        render={({ field }) => {
          const { name, onBlur, onChange, value } = field;
          return (
            <RadioGroup
              row
              className="materialUIRadio"
              value={value}
              onBlur={onBlur}
              onChange={(e) => {
                onChange(e);
              }}
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          );
        }}
        name="gender"
        control={control}
        defaultValue=""
      />
      <label className="dynamic-field-label">
        Email
        <AddCircleOutline
          className="add-icon"
          onClick={() => appendEmailField({ email: "" })}
        />
      </label>
      {emailFields.map((item, index) => (
        <Controller
          key={item.id}
          render={({ field }) => (
            <Input
              {...field}
              className="materialUIInput"
              endAdornment={
                emailFields.length > 1 ? (
                  <InputAdornment position="end">
                    <RemoveCircleOutline
                      className="remove-icon"
                      onClick={() => removeEmailField(index)}
                    />
                  </InputAdornment>
                ) : null
              }
            />
          )}
          name={`emails.${index}.email`}
          control={control}
        />
      ))}
      <label className="dynamic-field-label">
        Phone{" "}
        <AddCircleOutline
          className="add-icon"
          onClick={() => appendPhoneField({ phone: "" })}
        />
      </label>
      {phoneFields.map((item, index) => (
        <Controller
          key={item.id}
          render={({ field }) => (
            <Input
              {...field}
              className="materialUIInput"
              endAdornment={
                phoneFields.length > 1 ? (
                  <InputAdornment position="end">
                    <RemoveCircleOutline
                      className="remove-icon"
                      onClick={() => removePhoneField(index)}
                    />
                  </InputAdornment>
                ) : null
              }
            />
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
        render={({ field }) => (
          <p>
            <Checkbox {...field} /> I accept the Terms and Conditions
          </p>
        )}
      />

      <input type="submit" />
    </form>
  );
};

export default Form;
