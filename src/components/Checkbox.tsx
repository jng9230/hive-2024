import React from 'react'

export default function Checkbox({
    checked,
    onChange
}: {
    checked: boolean,
    onChange: () => void
}) {

    const handleChange = () => {
        onChange();
    }

    return (
        <input type="checkbox" checked={checked} onChange={handleChange}
            className="relative top-[2px] mr-1 cursor-pointer"
        />
    )
}
