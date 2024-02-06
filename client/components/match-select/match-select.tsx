import { formfield } from "@/types/form";

import s from "./match-select.module.scss";

export default function MatchSelect({ type, placeholder, description, options, name, register, error, valueAsNumber, disabled, defaultvalue }: formfield) {
    return (
        <div className={s.matchselect}>
            <label htmlFor={name}>{description ? description : name}:</label>
            <select
                {...register(name, { valueAsNumber })}
                disabled={disabled}
                className={s.matchselect}
            >
                <option value="" disabled selected>Select your {name}</option>
                {
                    options?.map((option, index) => {
                        return (
                            <option key={index} value={option}>{option}</option>
                        )
                    })
                }
            </select>
            {error && <span className={s.error}>{error.message}</span>}
        </div>
    )
}