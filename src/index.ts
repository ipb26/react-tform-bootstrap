
import { FormCheckProps, FormControlProps } from "react-bootstrap"
import { FormField } from "react-tform"

export function bsStringProps(field: FormField<string | undefined | null, string>): FormControlProps {
    return {
        value: field.value ?? "",
        onChange: event => field.setValue(event.currentTarget.value),
        onFocus: field.focus,
        onBlur: field.blur,
        isInvalid: field.hasErrors,
    }
}
export function bsNumberProps(field: FormField<number | undefined | null, number>): FormControlProps {
    return {
        type: "number",
        value: field.value ?? "",
        onChange: event => {
            if (event.currentTarget.value.trim() !== "") {
                const parsed = parseFloat(event.currentTarget.value)
                if (!isNaN(parsed)) {
                    field.setValue(parsed)
                }
            }
        },
        onFocus: field.focus,
        onBlur: field.blur,
        isInvalid: field.hasErrors,
    }
}
export function bsMultiCheckProps<V>(field: FormField<V[]>, currentValue: V, comparer: (a: V, b: V) => boolean = (a, b) => a === b): FormCheckProps {
    return {
        checked: field.value.findIndex(_ => comparer(_, currentValue)) != -1,
        onChange: event => {
            field.setValue(event.target.checked ? [...field.value, currentValue] : field.value.filter(_ => !comparer(_, currentValue)))
            field.commit()
        },
        onFocus: field.focus,
        onBlur: field.blur,
        isInvalid: field.hasErrors,
    }
}
export function bsCheckProps<V>(field: FormField<V>, trueValue: V, falseValue: V, comparer: (a: V, b: V) => boolean = (a, b) => a === b): FormCheckProps {
    return {
        checked: comparer(field.value, trueValue),
        onChange: event => {
            field.setValue(event.target.checked ? trueValue : falseValue)
            field.commit()
        },
        onFocus: field.focus,
        onBlur: field.blur,
        isInvalid: field.hasErrors,
    }
}
export function bsRadioProps<V>(field: FormField<V>, value: V, comparer: (a: V, b: V) => boolean = (a, b) => a === b): FormCheckProps {
    return {
        checked: comparer(field.value, value),
        onChange: event => {
            if (event.target.checked) {
                field.setValue(value)
                field.commit()
            }
        },
        onFocus: field.focus,
        onBlur: field.blur,
        isInvalid: field.hasErrors,
    }
}

//TODO select
