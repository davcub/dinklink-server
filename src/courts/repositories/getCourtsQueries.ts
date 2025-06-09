export const getCourtsByLocationQuery = `
    SELECT
        court_id,
        name,
        address,
        num_courts,
        lat,
        lng,
        COALESCE(CONCAT(p.first_name, ' ', p.last_name), NULL) as created_by,
        COALESCE(ct.created_at, null) as created_at,
        COALESCE(CONCAT(p2.first_name, ' ', p2.last_name), NULL) as updated_by,
        COALESCE(ct.updated_at, null) as updated_at
    FROM court ct
        JOIN player p on ct.created_by = p.player_id
        JOIN player p2 on ct.updated_by = p2.player_id
    WHERE 
        ROUND(CAST((3959 * acos(cos(radians($1)) * cos(radians(ct.lat)) * cos(radians(ct.lng) - radians($2)) + sin(radians($1)) * sin(radians(ct.lat)))) AS numeric), 2) <= $3    
    ORDER BY ROUND(CAST((3959 * acos(cos(radians($1)) * cos(radians(ct.lat)) * cos(radians(ct.lng) - radians($2)) + sin(radians($1)) * sin(radians(ct.lat)))) AS numeric), 2)
    LIMIT $4
    OFFSET $5;
`;

export const getCourtsByLocationCountQuery = `
    SELECT
        CAST(COUNT(*) AS INTEGER) as total
    FROM court ct
    WHERE 
        ROUND(CAST((3959 * acos(cos(radians($1)) * cos(radians(ct.lat)) * cos(radians(ct.lng) - radians($2)) + sin(radians($1)) * sin(radians(ct.lat)))) AS numeric), 2) <= $3    
`;

export const getCourtsQuery = `
    SELECT
        court_id,
        name,
        address,
        num_courts,
        lat,
        lng,
        COALESCE(CONCAT(p.first_name, ' ', p.last_name), NULL) as created_by,
        COALESCE(ct.created_at, null) as created_at,
        COALESCE(CONCAT(p2.first_name, ' ', p2.last_name), NULL) as updated_by,
        COALESCE(ct.updated_at, null) as updated_at
    FROM court ct
    LEFT JOIN player p on ct.created_by = p.player_id
    LEFT JOIN player p2 on ct.updated_by = p2.player_id
    ORDER BY ct.name DESC
    LIMIT $1
    OFFSET $2;
`;

export const getCourtsCountQuery = `
    SELECT
        CAST(COUNT(*) AS INTEGER) as total
    FROM court ct;
`;
