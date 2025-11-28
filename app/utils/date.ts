export function generateDays(
  month: number,
  year: number = new Date().getFullYear()
) {
  // Hitung total hari di bulan (contoh: 31 utk Januari)
  const daysInMonth = new Date(year, month, 0).getDate();

  // Generate array 1 sampai jumlah hari
  return Array.from({ length: daysInMonth }, (_, i) => i + 1);
}

export function formatDateRange(start: Date, end: Date): string {
  const startDay = start.getDate();
  const endDay = end.getDate();

  const startMonth = start.toLocaleString("id-ID", { month: "short" });
  const endMonth = end.toLocaleString("id-ID", { month: "short" });

  const startYear = start.getFullYear();
  const endYear = end.getFullYear();

  // Kasus 1: Tahun & bulan sama → 10 - 15 Nov 2025
  if (startYear === endYear && startMonth === endMonth) {
    return `${startDay} - ${endDay} ${endMonth} ${endYear}`;
  }

  // Kasus 2: Tahun sama, bulan beda → 1 Nov - 20 Des 2025
  if (startYear === endYear) {
    return `${startDay} ${startMonth} - ${endDay} ${endMonth} ${endYear}`;
  }

  // Kasus 3: Tahun beda → 30 Des 2025 - 2 Jan 2026
  return `${startDay} ${startMonth} ${startYear} - ${endDay} ${endMonth} ${endYear}`;
}

export function parseDMY(dateStr: string) {
  const [day, month, year] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function formatDateTime() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
