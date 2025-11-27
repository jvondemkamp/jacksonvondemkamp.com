#!/usr/bin/env node
// Simple PDF -> text extractor using pdf-parse
// Usage: node scripts/extract_pdf_text.js /path/to/input.pdf /path/to/output.txt

const fs = require('fs').promises;
const path = require('path');

async function main(){
  const args = process.argv.slice(2);
  if(args.length < 2){
    console.error('Usage: node scripts/extract_pdf_text.js <input.pdf> <output.txt>');
    process.exit(2);
  }
  const input = args[0];
  const output = args[1];
  try{
    const data = await fs.readFile(input);
    const pdfParse = require('pdf-parse');
    const res = await pdfParse(data);
    const text = res.text || '';
    await fs.mkdir(path.dirname(output), {recursive: true});
    await fs.writeFile(output, text, 'utf8');
    console.log('Wrote extracted text to', output);
  }catch(err){
    console.error('Error extracting PDF:', err);
    process.exit(1);
  }
}

main();
