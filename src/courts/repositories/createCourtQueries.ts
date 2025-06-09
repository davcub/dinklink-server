export const createCourtQuery = `
    INSERT INTO court (
        name, 
        address, 
        num_courts, 
        lat, 
        lng, 
        created_by
    ) VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6
)`;
