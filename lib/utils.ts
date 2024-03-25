import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const calculateTotal = (
    entries: [string, string][],
    taxPercentage: string
) => {
    const brutto = entries.reduce((acc, entry) => {
        return acc + parseFloat(entry[1]!);
    }, 0);

    return {
        brutto,
        netto: (brutto + brutto * Number(taxPercentage)).toFixed(2),
        tax: (brutto * Number(taxPercentage)).toFixed(2),
    };
};
