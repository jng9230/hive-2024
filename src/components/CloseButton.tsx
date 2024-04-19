import React from 'react'
import { BiX } from 'react-icons/bi'

export default function CloseButton({
    onClick
}: {
    onClick: () => void
}) {
    return (
        <BiX className="cursor-pointer relative top-[1px] hover:text-red-600 text-lg"
            onClick={onClick}
        />
    )
}
