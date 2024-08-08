"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Control, Field } from "react-hook-form";
import { FormFieldTypes } from "./forms/PatientForm";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import Image from "next/image";

interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldTypes;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (feild: any) => React.ReactNode;
}

const RenderField = ({field , props} : {field: any ; props: CustomProps}) => {
  const { fieldType , iconSrc , iconAlt , placeholder } = props;
  switch (fieldType) {
    case FormFieldTypes.INPUT:
      return(
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {props.iconSrc && (
            <Image src={iconSrc || ""} alt={iconAlt || 'icon'} height={24} width={24}  className="ml-2"/>
          )}

          <FormControl>
            <Input
            placeholder={placeholder}
            {...field}
            className="shad-input border-0"
            />

          </FormControl>
        </div>
      )
      
      break;
  
    case FormFieldTypes.PHONE_INPUT:
      return(
        <FormControl>

          <PhoneInput 
          
          defaultCountry="US"
          placeholder={placeholder}
          international
          withCountryCallingCode
          value={field.value} 
          onChange={field.onChange}
          className="input-phone"

          
          />
        </FormControl>
      )
    default:
      break;
  }
};

const CustomFormFeild = (props: CustomProps) => {
  const { control, fieldType, name, label } = props;
  return (
    <div>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="flex-1">
            {fieldType !== FormFieldTypes.CHECKBOX && label && (
              <FormLabel>{label}</FormLabel>
            )}

            <RenderField field={field} props={props} />

            <FormMessage className="shad-error" />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CustomFormFeild;
