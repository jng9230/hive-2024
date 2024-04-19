import React, { useState, useEffect, useRef, useCallback } from 'react'
import Checkbox from './Checkbox';
import CloseButton from './CloseButton';


export default function Select({
    label,
    placeholder,
    options,
    isMultiSelect,
}: {
    label: string,
    placeholder?: string,
    options: string[],
    isMultiSelect?: boolean

}) {
    const [selectedContent, setSelectedContent] = useState<boolean[]>(Array(options.length).fill(false));
    const [selectedSingle, setSelectedSingle] = useState<string>("");
    isMultiSelect = isMultiSelect ? isMultiSelect : false;
    placeholder = placeholder ? placeholder : `Select`;

    const handleSelectClick = (d: string, i: number) => toggleOption(i);

    const handleDeselect = (i: number) => toggleOption(i);

    const toggleOption = (i: number) => {
        setSelectedContent((selectedContent) => {
            const temp = [...selectedContent];
            temp[i] = !selectedContent[i];
            return temp
        })
    }

    const [selectAllChecked, setSelectAllChecked] = useState(false)
    const handleSelectAllClick = () => {
        const newStatus = !selectAllChecked;
        setSelectAllChecked(newStatus);
        setSelectedContent(Array(options.length).fill(newStatus));
    }

    // const handleUnselectAllClick = () => {
    //     setSelectAllChecked(false);
    //     setSelectedContent(Array(options.length).fill(false));
    // }

    const [showOptions, setShowOptions] = useState(false);
    // const handleShowOptions = () => setShowOptions(true);
    const toggleShowOptions = () => setShowOptions(showOptions => !showOptions);
    const handleHideOptions = useCallback(() => {
        setShowOptions(false);
    }, [])

    const handleSelectClickSingle = (d: string) => {
        setSelectedSingle(d);
        handleHideOptions();
    }


    // close dropdown if clicking outside of it
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current?.contains(e.target as Node)) {
                handleHideOptions()
            }
        };
        document.addEventListener('click', (e) => { handleClickOutside(e) });
        return () => {
            document.removeEventListener('click', (e) => { handleClickOutside(e) });
        };
    }, [handleHideOptions]);


    const listItemStyles = "flex items-center px-2 py-1 hover:bg-gray-200";
    return (
        <div className={"flex flex-col w-80 border-black border-2 rounded-md p-2"} ref={ref} >
            <label htmlFor="customSelectElement" className="mb-1"> {label} </label>

            <ul id="customSelectElement" className={`border-2 rounded-md bg-transparent border-black p-2 max-h-36 text-sm
                cursor-pointer ${isMultiSelect ? "overflow-y-auto" : "text-ellipsis overflow-hidden truncate"}
                hover:border-blue-hive
                ${showOptions ? "border-blue-hive" : ""}
                `}
                onClick={toggleShowOptions}
            >
                {
                    isMultiSelect ?
                        selectedContent.reduce((total, x) => total + (x ? 1 : 0), 0) !== 0 ?
                            [...selectedContent].map((d, i) => {
                                if (d) {
                                    return (
                                        <li key={i} className="inline-flex items-center border-2 border-gray-300 
                                            m-1 px-2 py-1 justify-between rounded-md">
                                            <div className="w-4/5 text-ellipsis overflow-hidden">{options[i]}</div>
                                            <CloseButton onClick={() => handleDeselect(i)} />
                                        </li>
                                    )
                                } else {
                                    return <span key={i}></span>
                                }
                            })
                            :
                            <span className="text-gray-400">
                                {placeholder}
                            </span>
                        :
                        selectedSingle !== "" ?
                            <span>
                                {selectedSingle}
                            </span>
                            :
                            <span className="text-gray-400"> Select </span>
                }
            </ul>

            <div className={`border-2 border-blue-hive rounded-md bg-transparent 
                rounded-t-none border-t-0 ${!showOptions ? "hidden" : ""}
                relative top-[-2px]`}
            >
                <ul className="max-h-60 overflow-y-auto m-1" autoFocus>
                    {
                        isMultiSelect ?
                            <>
                                <li className={listItemStyles}>
                                    <Checkbox checked={selectAllChecked} onChange={handleSelectAllClick} />
                                    <span className="mr-2"> Select/unselect all </span>
                                </li>

                                {
                                    options.map((d, i) => {
                                        const checked = selectedContent[i]
                                        return (
                                            <li key={i} value={d}
                                                className={listItemStyles}
                                            >
                                                <Checkbox checked={checked} onChange={() => handleSelectClick(d, i)} />
                                                {d}
                                            </li>
                                        )
                                    })
                                }
                            </>
                            :
                            <>
                                {
                                    options.map((d, i) => {
                                        return (
                                            <li key={i} onClick={() => handleSelectClickSingle(d)}
                                                className={`${listItemStyles} cursor-pointer`}>
                                                {d}
                                            </li>
                                        )
                                    })
                                }
                            </>
                    }
                </ul>
            </div>
        </div >
    )
}
