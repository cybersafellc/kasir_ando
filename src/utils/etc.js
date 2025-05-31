function generateItemCode() {
  // Generate 11 random digits
  const digits = [];
  for (let i = 0; i < 11; i++) {
    digits.push(Math.floor(Math.random() * 10));
  }

  // Hitung check digit (digit ke-12) menggunakan rumus UPC-A
  let sum = 0;
  for (let i = 0; i < 11; i++) {
    sum += digits[i] * (i % 2 === 0 ? 3 : 1);
  }
  const checkDigit = (10 - (sum % 10)) % 10;

  // Gabungkan semua digit jadi satu string
  digits.push(checkDigit);
  return digits.join("");
}

export { generateItemCode };
