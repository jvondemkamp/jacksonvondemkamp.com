#!/usr/bin/env python3
"""
Simple PDF -> text extractor using pypdf (works in most Python envs).
Usage:
  python3 scripts/extract_pdf_text.py /path/to/input.pdf /path/to/output.txt
"""
import sys
from pathlib import Path

try:
    from pypdf import PdfReader
except Exception:
    # older PyPDF2 fallback
    try:
        from PyPDF2 import PdfReader
    except Exception as e:
        print("Missing pypdf or PyPDF2. Please `pip install pypdf`.")
        raise


def extract_text(input_pdf: Path) -> str:
    reader = PdfReader(str(input_pdf))
    out_lines = []
    for i, page in enumerate(reader.pages):
        try:
            text = page.extract_text() or ""
        except Exception:
            text = ""
        out_lines.append(f"\n----- PAGE {i+1} -----\n")
        out_lines.append(text)
    return "\n".join(out_lines)


def main():
    if len(sys.argv) < 3:
        print("Usage: extract_pdf_text.py <input.pdf> <output.txt>")
        sys.exit(2)
    input_pdf = Path(sys.argv[1])
    output_txt = Path(sys.argv[2])
    if not input_pdf.exists():
        print(f"Input PDF not found: {input_pdf}")
        sys.exit(1)
    print(f"Reading {input_pdf}")
    text = extract_text(input_pdf)
    output_txt.parent.mkdir(parents=True, exist_ok=True)
    output_txt.write_text(text, encoding="utf-8")
    print(f"Wrote extracted text to {output_txt}")

if __name__ == '__main__':
    main()
