import React, { useState, useEffect, useRef } from 'react'
import { BiX } from "react-icons/bi";
import Checkbox from './Checkbox';


export default function Select({
    label,
    options,
    isMultiSelect
}: {
    label: string,
    options: string[],
    isMultiSelect?: boolean

}) {
    const [selectedContent, setSelectedContent] = useState<boolean[]>(Array(options.length).fill(false))
    isMultiSelect = isMultiSelect ? isMultiSelect : false

    const handleSelectClick = (d: string, i: number) => {
        // e.stopPropagation();
        // e.preventDefault();

        toggleOption(i)
    }

    const handleDeselect = (i: number) => {
        toggleOption(i)
    }

    const toggleOption = (i: number) => {
        setSelectedContent((selectedContent) => {
            const temp = [...selectedContent]
            temp[i] = !selectedContent[i]
            return temp
        })
    }

    const [selectAllChecked, setSelectAllChecked] = useState(false)
    const handleSelectAllClick = () => {
        const newStatus = !selectAllChecked;
        setSelectAllChecked(newStatus)
        setSelectedContent(Array(options.length).fill(newStatus))
    }

    const handleUnselectAllClick = () => {
        setSelectAllChecked(false)
        setSelectedContent(Array(options.length).fill(false))
    }

    const [showOptions, setShowOptions] = useState(false)
    const handleShowOptions = () => setShowOptions(true);
    const toggleShowOptions = () => {
        setShowOptions(showOptions => !showOptions)
    };
    const handleHideOptions = () => {
        setShowOptions(false);
    }


    // handle click outside of dropdown to close
    const ref = useRef<HTMLDivElement>(null);
    const onClickOutside = handleHideOptions;
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current?.contains(e.target as Node)) {
                onClickOutside()
            }
        };
        document.addEventListener('click', (e) => { handleClickOutside(e) });
        return () => {
            document.removeEventListener('click', (e) => { handleClickOutside(e) });
        };
    }, [onClickOutside]);

    return (
        <div className={"flex flex-col w-80 border-black border-2 rounded-md p-2 space-y-2"}
            ref={ref}
        >
            {!isMultiSelect ?
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
                    <label htmlFor=""> {label} </label>
                    <ul className="border-2 border-black p-2 max-h-20 overflow-y-auto cursor-pointer"
                        onClick={toggleShowOptions}
                    >
                        {
                            // [...selectedContent].map((d, i) => {
                            [...selectedContent].map((d, i) => {
                                if (d) {
                                    return (
                                        <li key={i} className="inline-flex items-center border-2 border-gray-300 m-1 px-2 py-1 justify-between">
                                            <div className="w-4/5 text-ellipsis overflow-hidden">{options[i]}</div>
                                            <BiX className="cursor-pointer relative top-[1px] hover:text-red-600 text-lg"
                                                onClick={() => { handleDeselect(i) }}
                                            />
                                        </li>
                                    )
                                } else {
                                    return <span key={i}></span>
                                }
                            })
                        }
                    </ul>
                    <div className={`border-2 border-black ${!showOptions ? "hidden" : ""}`}
                    >
                        <ul className="max-h-60 overflow-y-auto" autoFocus>
                            {/* select/unselect all */}
                            <li className="flex items-center px-2 py-1">
                                <Checkbox checked={selectAllChecked} onChange={handleSelectAllClick} />
                                <span> Select All </span>
                                <BiX onClick={handleUnselectAllClick} className="cursor-pointer relative top-[1px] hover:text-red-600 text-lg" />
                            </li>
                            {
                                options.map((d, i) => {
                                    const checked = selectedContent[i]
                                    return <li key={i} value={d}
                                        className="flex items-center px-2 py-1"
                                    >
                                        {/* <input type="checkbox" checked={checked} onChange={e => handleSelectClick(e, d, i)}
                                            className="relative top-[2x] mr-1"
                                        /> */}
                                        <Checkbox checked={checked} onChange={() => handleSelectClick(d, i)} />
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
