# Iteration Layer TypeScript / Node.js SDK

Official TypeScript/Node.js SDK for the [Iteration Layer API](https://iterationlayer.com).

## Installation

```sh
npm install iterationlayer
```

## Usage

```typescript
import { IterationLayer } from "iterationlayer";

const client = new IterationLayer({ apiKey: "il_your_api_key" });
```

### Document Extraction

Extract structured data from documents using AI.

```typescript
const result = await client.extract({
  files: [{ type: "url", name: "invoice.pdf", url: "https://example.com/invoice.pdf" }],
  schema: {
    fields: [
      { type: "TEXT", name: "company_name", description: "The company name" },
      { type: "CURRENCY_AMOUNT", name: "total", description: "The invoice total" },
    ],
  },
});

console.log(result.company_name.value); // "Acme Corp"
console.log(result.company_name.confidence); // 0.95
```

### Image Transformation

Resize, crop, convert, and apply effects to images.

```typescript
const result = await client.transform({
  file: { type: "url", name: "photo.jpg", url: "https://example.com/photo.jpg" },
  operations: [
    { type: "resize", width_in_px: 800, height_in_px: 600, fit: "cover" },
    { type: "convert", format: "webp", quality: 85 },
  ],
});

const imageBuffer = Buffer.from(result.buffer, "base64");
```

### Image Generation

Compose images from layer definitions.

```typescript
const result = await client.generateImage({
  dimensions: { width_in_px: 1200, height_in_px: 630 },
  layers: [
    { type: "solid-color", index: 0, hex_color: "#1a1a2e" },
    {
      type: "text",
      index: 1,
      text: "Hello World",
      font_name: "Inter",
      font_size_in_px: 48,
      text_color: "#ffffff",
      position: { x_in_px: 50, y_in_px: 50 },
      dimensions: { width_in_px: 1100, height_in_px: 530 },
    },
  ],
  output_format: "png",
});

const imageBuffer = Buffer.from(result.buffer, "base64");
```

### Document Generation

Generate PDF, DOCX, EPUB, or PPTX from structured data.

```typescript
const result = await client.generateDocument({
  format: "pdf",
  document: {
    metadata: { title: "Invoice #123" },
    page: {
      size: { preset: "A4" },
      margins: { top_in_pt: 36, bottom_in_pt: 36, left_in_pt: 36, right_in_pt: 36 },
    },
    styles: {
      text: { font_family: "Helvetica", font_size_in_pt: 12, line_height: 1.5, color: "#000000" },
      headline: { font_family: "Helvetica", font_size_in_pt: 24, color: "#000000", spacing_before_in_pt: 12, spacing_after_in_pt: 6 },
      link: { color: "#0066cc" },
      list: { indent_in_pt: 18, spacing_between_items_in_pt: 4 },
      table: {
        header: { background_color: "#f0f0f0", font_family: "Helvetica", font_size_in_pt: 12, color: "#000000", padding_in_pt: 6 },
        body: { font_family: "Helvetica", font_size_in_pt: 12, color: "#000000", padding_in_pt: 6 },
      },
      grid: { gap_in_pt: 12 },
      separator: { color: "#cccccc", thickness_in_pt: 1, margin_top_in_pt: 12, margin_bottom_in_pt: 12 },
      image: { alignment: "center", margin_top_in_pt: 8, margin_bottom_in_pt: 8 },
    },
    content: [
      { type: "headline", level: "h1", text: "Invoice #123" },
      { type: "paragraph", markdown: "Thank you for your business." },
    ],
  },
});

const pdfBuffer = Buffer.from(result.buffer, "base64");
```

### Sheet Generation

Generate CSV, Markdown, or XLSX spreadsheets from structured data.

```typescript
const result = await client.generateSheet({
  format: "xlsx",
  sheets: [
    {
      name: "Invoices",
      columns: [
        { name: "Company", width: 20 },
        { name: "Total", width: 15 },
      ],
      rows: [
        [
          { value: "Acme Corp" },
          { value: 1500.5, format: "currency", currency_code: "EUR" },
        ],
      ],
    },
  ],
});

const sheetBuffer = Buffer.from(result.buffer, "base64");
```

### Webhooks (Async)

Use the `*Async` methods to receive results via webhook instead of waiting for the response.

```typescript
const result = await client.extractAsync({
  files: [{ type: "url", name: "invoice.pdf", url: "https://example.com/invoice.pdf" }],
  schema: {
    fields: [{ type: "CURRENCY_AMOUNT", name: "total", description: "The invoice total" }],
  },
  webhook_url: "https://your-app.com/webhooks/extraction",
});

console.log(result.message); // "Request accepted..."
```

### Error Handling

```typescript
import { IterationLayerError } from "iterationlayer";

try {
  await client.extract({ ... });
} catch (error) {
  if (error instanceof IterationLayerError) {
    console.log(error.statusCode); // 422
    console.log(error.errorMessage); // "Validation error: ..."
  }
}
```

## Documentation

Full documentation is available at [https://iterationlayer.com/docs](https://iterationlayer.com/docs).

## Issues & Feedback

Please report bugs and request features in the [issues repository](https://github.com/iterationlayer/issues).
