import { formfield } from "@/types/form";

import s from "./match-check.module.scss";

export default function MatchCheck({ type, description, placeholder, options, name, register, error, valueAsNumber, disabled, defaultvalue }: formfield) {
    return (
        <div className={s.matchcheck}>
            <label htmlFor={name}>{description ? description : name}:</label>

            {
                options?.map((option, index) => {
                    return (
                        <div key={index} className={s.checkbox}>
                            <input
                                type="checkbox"
                                value={option}
                                {...register(name)}
                            />
                            <label htmlFor={option.toString()}>{option}</label>
                        </div>
                    )
                })
            }
            {error && <span className={s.error}>{error.message}</span>}
        </div>
    )
}