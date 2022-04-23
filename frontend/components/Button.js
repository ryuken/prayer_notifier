import { Children, cloneElement } from "react"

import clx from "classnames"

const sizes = {
    lg: "px-7 py-3 text-sm leading-snug",
    default: "px-6 py-2.5 text-xs leading-tight",
    sm: "px-4 py-1.5 text-xs leading-tight"
}

const Button = ({ children, onClick, isFirst, isLast, size = "default" }) => {
    
       
    const classes = clx(
        "inline-block text-white font-medium uppercase border-gray-600",
        "transition duration-150 ease-in-out",
        "bg-gray-800 hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800",
        { "rounded-l border-t-2 border-l-2 border-b-2": isFirst },
        { "rounded-r border-t-2 border-l-2 border-r-2 border-b-2": isLast },
        { "border-t-2 border-b-2 border-l-2 border-gray-600": !isFirst && !isLast },
        sizes[size],
    )

    return (
        <button type="button" className={classes} onClick={onClick}>
            {children}
        </button>
    )
}

export const ButtonGroup = ({ children, size }) => {

    const buttons = Children.toArray(children);

    return (
        <div className="flex items-center justify-center">
            <div className="inline-flex shadow-md hover:shadow-lg focus:shadow-lg" role="group">
                {Children.map(buttons, (child, index) => {
                    
                    const isFirst = index === 0
                    const isLast = index === (buttons.length - 1)

                    return cloneElement(child, {
                        size,
                        isFirst,
                        isLast,
                    })
                })}
            </div>
        </div>
    )
}

export default Button