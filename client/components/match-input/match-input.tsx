import { formfield } from "@/types/form";

import s from "./match-input.module.scss";

interface Matchfield extends formfield {
    inputstyle?: "input" | "textarea"
}

export default function MatchInput({ type, inputstyle, description, placeholder, name, register, error, valueAsNumber, disabled, defaultvalue }: Matchfield) {
    return (
        <div className={s.matchinput}>
            <label htmlFor={name}>{description ? description : name}:</label>
            {
                inputstyle === "textarea" ?
                    <textarea
                        placeholder={placeholder}
                        {...register(name, { valueAsNumber })}
                        disabled={disabled}
                        defaultValue={defaultvalue}
                    />
                    :
                    <input
                        type={type}
                        placeholder={placeholder}
                        {...register(name, { valueAsNumber })}
                        disabled={disabled}
                        defaultValue={defaultvalue}
                    />
            }

            {error && <span className={s.error}>{error.message}</span>}
        </div>
    )
}
