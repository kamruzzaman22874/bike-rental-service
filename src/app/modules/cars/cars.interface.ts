export type TCars = {
    name: string;
    description: string;
    color: string;
    isElectric: boolean;
    status: 'available' | 'not available'; // Enums can be used for better type safety
    features: string[];
    pricePerHour: number;
    isDeleted: boolean;
}