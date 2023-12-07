export function extractMinSalary(salaryStr: string) {
  if (!salaryStr) return null;

  // Extract the first part of the range or the entire string if not a range
  const parts = salaryStr.split(" - ");
  if (parts.length === 0 || !parts[0]) {
    return null;
  }
  const minSalaryPart = parts[0]; // Now guaranteed to be a string

  // Remove non-numeric characters and convert to number
  const numericValue = parseFloat(minSalaryPart.replace(/[^0-9.]/g, ""));

  // Handle 'k' suffix
  if (minSalaryPart.toLowerCase().includes("k")) {
    return numericValue * 1000;
  }

  return numericValue;
}
