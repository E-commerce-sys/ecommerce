import { useState } from "react"

export default function(){
    const [isDiscounted, setIsDiscounted] = useState(false)
    return(
        <button
        className={`flex justify-center items-center gap-2 px-8 py-4 rounded text-[16px] font-normal w-39.5 h-10 transition-colors
            ${isDiscounted 
            ? 'bg-[rgb(var(--color-primary-main))] text-white' 
            : 'bg-[#F5F5F5] text-black hover:bg-[rgb(var(--color-primary-1))]'
            }`}
        onClick={() => setIsDiscounted(!isDiscounted)}
        >
        Discounts
        </button>
    )
}