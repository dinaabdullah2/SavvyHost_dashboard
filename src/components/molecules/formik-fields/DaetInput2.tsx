import React, { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Label } from "../../atoms"
import { useFormikContext } from "formik"
import { tv } from "tailwind-variants"

export default function DateInput2({
  labelProps,
  label,
  name,
  value,
}: {
  labelProps?: string
  label: string
  name: string
  value: Date
}) {
  const [startDate, setStartDate] = useState(new Date())

  const years = Array.from(
    { length: new Date().getFullYear() - 1990 + 1 },
    (_, index) => 1990 + index
  )

  const { setFieldValue, errors, touched, handleBlur, values } =
    useFormikContext<{
      [key: string]: any
    }>()

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dateInputField = tv({
    base: "direction-rtl",
    variants: {
      active: {
        true: "!rounded-md !border-2 !border-mainGreen !ring-0",
      },
      error: {
        true: "!rounded-md !border-2 !border-mainRed",
      },
    },
  })

  const CustomHeader = ({
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }:any) => (
    <div style={{ margin: 10, display: "flex", justifyContent: "center" }}>
      <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
        {"<"}
      </button>
      <select
        value={date.getFullYear()}
        onChange={({ target: { value } }) => changeYear(value)}
      >
        {years.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <select
        value={months[date.getMonth()]}
        onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
      >
        {months.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
        {">"}
      </button>
    </div>
  )

  const [dateActive, setDateActive] = useState(false)

  return (
    <div className="col-span-1">
      <div className="flex flex-col gap-1">
      //@ts-ignore

        <Label htmlFor={name} 
                  //@ts-ignore

        {...labelProps} className="mb-3">
          {label}
        </Label>
        <DatePicker
          selected={values[name]}
          onChange={(date: Date) => {
            setFieldValue(name, date)
          }}
          onBlur={handleBlur(name)}
          className={dateInputField({
            active: dateActive,
            error: touched[name] && !!errors[name],
          })}
          onCalendarOpen={() => {
            setDateActive(true)
          }}
          onCalendarClose={() => {
            setDateActive(false)
          }}
          renderCustomHeader={CustomHeader}
          name={name}
          dateFormat="dd/MM/yyyy"
          isClearable={true}
          value={
            values[name]
              ? values[name]?.toLocaleDateString()
              : value?.toLocaleDateString()
          }
        />
      </div>
    </div>
  )
}
