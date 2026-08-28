import { saveAs } from "file-saver";

// CSV no padrão brasileiro: separador ";" e quebra de linha \r\n (o que o Excel pt-BR espera).
const SEP = ";";
const EOL = "\r\n";

// BOM UTF-8: sem ele o Excel abre "Ração" como "Ra√ß√£o".
const BOM = "﻿";

export type CsvValue = string | number | null | undefined;

/** Escapa um valor para CSV: envolve em aspas quando contém separador, aspas ou quebra de linha. */
export function csvEscape(value: CsvValue): string {
  const s = value == null ? "" : String(value);
  if (s.includes(SEP) || s.includes('"') || s.includes("\n") || s.includes("\r")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

/** Monta o texto CSV a partir dos cabeçalhos e das linhas. */
export function buildCsv(headers: string[], rows: CsvValue[][]): string {
  const lines = [headers.map(csvEscape).join(SEP)];
  for (const row of rows) {
    lines.push(row.map(csvEscape).join(SEP));
  }
  return lines.join(EOL) + EOL;
}

/** Dispara o download do CSV no browser (UTF-8 com BOM). */
export function downloadCsv(filename: string, csv: string): void {
  saveAs(new Blob([BOM + csv], { type: "text/csv;charset=utf-8;" }), filename);
}
