import { formfield } from "@/types/form";

import s from "./match.module.scss";

export default function MatchInput({ type, placeholder, name, register, error, valueAsNumber, disabled, defaultvalue }: formfield) {
    return (
        <div className={s.matchinput}>
            <input
                type={type}
                placeholder={placeholder}
                {...register(name, { valueAsNumber })}
                disabled={disabled}
                defaultValue={defaultvalue}
            />
            {error && <span className={s.error}>{error.message}</span>}
        </div>
    )
}
