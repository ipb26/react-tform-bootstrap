
import { FormCheckProps, FormControlProps } from "react-bootstrap"
import { FieldControl } from "react-tform"

export function bsFileProps(field: FieldControl<FileList | undefined | null, FileList | undefined>): FormControlProps {
    return {
        //value: field.value ?? "",
        //onChange: event => field.setValue(event.currentTarget.value),
        onChange: event => {
            if ("files" in event.currentTarget) {
                field.setValueAndCommit(event.currentTarget.files ?? undefined)
            }
        },
        disabled: field.disabled ?? false,
        onFocus: field.focus,
        onBlur: field.blur,
        isInvalid: field.hasErrors,
    }
}
export function bsStringProps(field: FieldControl<string | undefined | null, string>): FormControlProps {
    return {
        value: field.value ?? "",
        onChange: event => field.setValue(event.currentTarget.value),
        onFocus: field.focus,
        onBlur: field.blur,
        disabled: field.disabled ?? false,
        isInvalid: field.hasErrors,
    }
}
export function bsNumberProps(field: FieldControl<number | undefined | null, number>): FormControlProps {
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
        disabled: field.disabled ?? false,
        isInvalid: field.hasErrors,
    }
}
export function bsMultiCheckProps<V>(field: FieldControl<readonly V[] | undefined | null, readonly V[]>, currentValue: V, comparer: (a: V, b: V) => boolean = (a, b) => a === b): FormCheckProps {
    return {
        checked: field.value?.findIndex(_ => comparer(_, currentValue)) != -1,
        onChange: event => field.setValueAndCommit(event.target.checked ? [...field.value ?? [], currentValue] : (field.value ?? []).filter(_ => !comparer(_, currentValue))),
        onFocus: field.focus,
        onBlur: field.blur,
        disabled: field.disabled ?? false,
        isInvalid: field.hasErrors,
    }
}
export function bsCheckProps<V>(field: FieldControl<V>, trueValue: V, falseValue: V, comparer: (a: V, b: V) => boolean = (a, b) => a === b): FormCheckProps {
    return {
        checked: comparer(field.value, trueValue),
        onChange: event => field.setValueAndCommit(event.target.checked ? trueValue : falseValue),
        onFocus: field.focus,
        onBlur: field.blur,
        disabled: field.disabled ?? false,
        isInvalid: field.hasErrors,
    }
}
export function bsRadioProps<R, W extends R = R>(field: FieldControl<R, W>, value: W, comparer: (a: R, b: W) => boolean = (a, b) => a === b): FormCheckProps {
    return {
        checked: comparer(field.value, value),
        onChange: event => {
            if (event.target.checked) {
                field.setValueAndCommit(value)
            }
        },
        onFocus: field.focus,
        onBlur: field.blur,
        disabled: field.disabled ?? false,
        isInvalid: field.hasErrors,
    }
}

//TODO select
