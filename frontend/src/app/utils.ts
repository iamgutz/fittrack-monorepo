export const calculateAge = (dateOfBirth?: string): number => {
    if (!dateOfBirth) {
        return 0;
    }
    const today = new Date();
    const dob = new Date(dateOfBirth);

    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
       age -= 1; 
    }

    return age;
};