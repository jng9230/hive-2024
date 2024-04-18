import React, { useState } from 'react'
import { BiX } from "react-icons/bi";


export default function Select({
    label,
    options,
    isMultiSelect
}: {
    label: string,
    options: string[],
    isMultiSelect?: boolean

}) {
    const [selectedContent, setSelectedContent] = useState<string[]>([])
    isMultiSelect = isMultiSelect ? isMultiSelect : false
    console.log(isMultiSelect)

    const handleSelectClick = (d: string) => {
        console.log(`selected ${d}`)
        setSelectedContent([...selectedContent, d])
    }

    return (
        <div className={"flex flex-col w-80 border-black border-2 rounded-md p-2 space-y-2"}>
            {
                !isMultiSelect ?
                    <>
                        <label htmlFor="" className=""> {label} </label>
                        <select name="" id="" className="border-2 border-black">
                            <option value=""> </option>
                            {
                                options.map((d, i) => {
                                    return <option value={d} key={i}> {d} </option>
                                })
                            }
                        </select>
                    </>
                    :
                    <>
                        <ul className="border-2 border-black p-2">
                            {
                                selectedContent.map((d, i) => {
                                    return (
                                        <li key={i} className="inline-flex items-center border-2 border-gray-300 m-1">
                                            <span>{d}</span>
                                            <BiX />
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <div className="border-2 border-black" >
                            <ul className="max-h-60 overflow-y-scroll">
                                {
                                    options.map((d, i) => {
                                        return <li key={i} value={d} onClick={e => { handleSelectClick(d) }}
                                            className="hover:bg-gray-500 cursor-pointer"
                                        >
                                            {d}
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                    </>
            }
        </div >
    )
}
