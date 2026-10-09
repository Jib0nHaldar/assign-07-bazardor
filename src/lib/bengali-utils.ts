// Convert English digits to Bengali digits
export const toBengaliNumber = (value: number | string): string => {
    const bengaliDigits = "০১২৩৪৫৬৭৮৯";

    return value
        .toString()
        .replace(/\d/g, (digit) => bengaliDigits[Number(digit)]);
};

// Convert English units to Bengali units
export const getBengaliUnit = (unit: string): string => {
    const units: Record<string, string> = {
        kg: "কেজি",
        liter: "লিটার",
        litre: "লিটার",
        piece: "পিস",
        dozen: "ডজন",
    };

    return units[unit] || unit;
};