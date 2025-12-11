export interface Lot {
    id: number;
    block: string;
    number: string;
    type: 'Padrão' | 'Beira Lago' | 'Esquina';
    area: number;
    price: number;
    status: 'available' | 'sold';
  }
  
  export const blockTotals: Record<string, number> = {
    A: 26, B1: 21, B2: 24, C: 27, D1: 19, D2: 12, E: 28, F: 19, G: 16, H: 20, I: 16, J: 12, K: 24, L: 19, M: 22, N: 17, O: 16, P: 18, Q: 16, R: 18, S: 10, T: 12, U: 12, V: 20, X: 16, Z: 14
  };
  
  export const lots: Lot[] = [
    // --- Quadra A ---
    { id: 1, block: "A", number: "01", type: "Padrão", area: 450.00, price: 550000, status: "available" },
    { id: 2, block: "A", number: "02", type: "Padrão", area: 450.00, price: 550000, status: "available" },
    { id: 3, block: "A", number: "03", type: "Padrão", area: 450.00, price: 550000, status: "sold" },
    { id: 4, block: "A", number: "04", type: "Padrão", area: 450.00, price: 550000, status: "available" },
    { id: 5, block: "A", number: "05", type: "Padrão", area: 450.00, price: 550000, status: "available" },
    { id: 6, block: "A", number: "06", type: "Padrão", area: 450.00, price: 550000, status: "available" },
    { id: 7, block: "A", number: "07", type: "Padrão", area: 450.00, price: 550000, status: "sold" },
    { id: 8, block: "A", number: "08", type: "Padrão", area: 450.00, price: 550000, status: "available" },
    { id: 9, block: "A", number: "09", type: "Padrão", area: 450.00, price: 550000, status: "available" },
    { id: 10, block: "A", number: "10", type: "Padrão", area: 450.00, price: 550000, status: "available" },
  
    // --- Quadra B1 ---
    { id: 11, block: "B1", number: "01", type: "Beira Lago", area: 500.00, price: 750000, status: "available" },
    { id: 12, block: "B1", number: "02", type: "Beira Lago", area: 500.00, price: 750000, status: "sold" },
    { id: 13, block: "B1", number: "03", type: "Beira Lago", area: 500.00, price: 750000, status: "available" },
    { id: 14, block: "B1", number: "04", type: "Beira Lago", area: 500.00, price: 750000, status: "available" },
    { id: 15, block: "B1", number: "05", type: "Beira Lago", area: 500.00, price: 750000, status: "available" },
  
    // --- Quadra C ---
    { id: 16, block: "C", number: "01", type: "Padrão", area: 460.00, price: 580000, status: "available" },
    { id: 17, block: "C", number: "02", type "Padrão", area: 460.00, price: 580000, status: "available" },
    { id: 18, block: "C", number: "03", type: "Padrão", area: 460.00, price: 580000, status: "available" },
    { id: 19, block: "C", number: "04", type: "Padrão", area: 460.00, price: 580000, status: "sold" },
    { id: 20, block: "C", number: "05", type: "Padrão", area: 460.00, price: 580000, status: "available" },
  
    // --- Quadra L ---
    { id: 21, block: "L", number: "01", type: "Esquina", area: 520.00, price: 680000, status: "available" },
    { id: 22, block: "L", number: "02", type: "Padrão", area: 480.00, price: 610000, status: "sold" },
    { id: 23, block: "L", number: "03", type: "Padrão", area: 480.00, price: 610000, status: "available" },
    { id: 24, block: "L", number: "04", type: "Padrão", area: 480.00, price: 610000, status: "available" },
    { id: 25, block: "L", number: "05", type: "Padrão", area: 480.00, price: 610000, status: "available" },
    { id: 26, block: "L", number: "06", type: "Padrão", area: 480.00, price: 610000, status: "sold" },
    { id: 27, block: "L", number: "07", type: "Padrão", area: 480.00, price: 610000, status: "available" },
    { id: 28, block: "L", number: "08", type: "Padrão", area: 480.00, price: 610000, status: "available" },
    { id: 29, block: "L", number: "09", type: "Padrão", area: 480.00, price: 610000, status: "available" },
    { id: 30, block: "L", number: "10", type: "Padrão", area: 480.00, price: 610000, status: "available" },
  
    // --- Quadra M ---
    { id: 31, block: "M", number: "01", type: "Beira Lago", area: 600.00, price: 950000, status: "available" },
    { id: 32, block: "M", number: "02", type: "Beira Lago", area: 600.00, price: 950000, status: "available" },
    { id: 33, block: "M", number: "03", type: "Beira Lago", area: 600.00, price: 950000, status: "sold" },
    { id: 34, block: "M", number: "04", type: "Beira Lago", area: 600.00, price: 950000, status: "available" },
    { id: 35, block: "M", number: "05", type: "Beira Lago", area: 600.00, price: 950000, status: "available" },
    { id: 36, block: "M", number: "06", type: "Beira Lago", area: 600.00, price: 950000, status: "available" },
    { id: 37, block: "M", number: "07", type: "Beira Lago", area: 600.00, price: 950000, status: "sold" },
    { id: 38, block: "M", number: "08", type: "Beira Lago", area: 600.00, price: 950000, status: "available" },
    { id: 39, block: "M", number: "09", type: "Beira Lago", area: 600.00, price: 950000, status: "available" },
    { id: 40, block: "M", number: "10", type: "Beira Lago", area: 600.00, price: 950000, status: "available" },
  ];
