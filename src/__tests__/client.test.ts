import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { IterationLayer, IterationLayerError } from "../index.js";

const TEST_API_KEY = "test-api-key-123";
const DEFAULT_BASE_URL = "https://api.iterationlayer.com";
const CUSTOM_BASE_URL = "https://custom.example.com";

function createMockResponse(body: unknown, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(body),
  } as Response;
}

describe("IterationLayer", () => {
  let mockFetch: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockFetch = vi.fn();
    vi.stubGlobal("fetch", mockFetch);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("client construction", () => {
    it("uses the default base URL when none is provided", async () => {
      const client = new IterationLayer({ apiKey: TEST_API_KEY });

      mockFetch.mockResolvedValueOnce(
        createMockResponse({
          success: true,
          data: { buffer: "abc", mime_type: "image/png" },
        }),
      );

      await client.transform({
        file: {
          type: "url",
          name: "test.png",
          url: "https://example.com/test.png",
        },
        operations: [{ type: "flip" }],
      });

      const [calledUrl] = mockFetch.mock.calls[0] as [string, RequestInit];
      expect(calledUrl).toBe(`${DEFAULT_BASE_URL}/image-transformation/v1/transform`);
    });

    it("uses a custom base URL when provided", async () => {
      const client = new IterationLayer({
        apiKey: TEST_API_KEY,
        baseUrl: CUSTOM_BASE_URL,
      });

      mockFetch.mockResolvedValueOnce(
        createMockResponse({
          success: true,
          data: { buffer: "abc", mime_type: "image/png" },
        }),
      );

      await client.transform({
        file: {
          type: "url",
          name: "test.png",
          url: "https://example.com/test.png",
        },
        operations: [{ type: "flip" }],
      });

      const [calledUrl] = mockFetch.mock.calls[0] as [string, RequestInit];
      expect(calledUrl).toBe(`${CUSTOM_BASE_URL}/image-transformation/v1/transform`);
    });
  });

  describe("extract", () => {
    const extractRequest = {
      files: [
        {
          type: "url" as const,
          name: "invoice.pdf",
          url: "https://example.com/invoice.pdf",
        },
      ],
      schema: {
        fields: [
          {
            type: "TEXT" as const,
            name: "vendor_name",
            description: "The vendor name",
          },
          {
            type: "DECIMAL" as const,
            name: "total_amount",
            description: "The total amount",
            decimal_points: 2,
          },
        ],
      },
    };

    it("sends the correct request and parses extraction result", async () => {
      const extractionData = {
        vendor_name: {
          value: "Acme Corp",
          confidence: 0.95,
          citations: ["page 1"],
          source: "extracted",
          type: "TEXT",
        },
        total_amount: {
          value: 1234.56,
          confidence: 0.88,
          citations: ["page 1"],
          source: "extracted",
          type: "DECIMAL",
        },
      };

      mockFetch.mockResolvedValueOnce(createMockResponse({ success: true, data: extractionData }));

      const client = new IterationLayer({ apiKey: TEST_API_KEY });
      const result = await client.extract(extractRequest);

      const [calledUrl, calledOptions] = mockFetch.mock.calls[0] as [string, RequestInit];
      expect(calledUrl).toBe(`${DEFAULT_BASE_URL}/document-extraction/v1/extract`);
      expect(calledOptions.method).toBe("POST");
      expect(calledOptions.headers).toEqual({
        "Content-Type": "application/json",
        Authorization: `Bearer ${TEST_API_KEY}`,
      });
      expect(JSON.parse(calledOptions.body as string)).toEqual(extractRequest);
      expect(result).toEqual(extractionData);
    });
  });

  describe("extractAsync", () => {
    it("handles async result", async () => {
      mockFetch.mockResolvedValueOnce(
        createMockResponse({
          success: true,
          async: true,
          message: "Processing started",
        }),
      );

      const client = new IterationLayer({ apiKey: TEST_API_KEY });
      const result = await client.extractAsync({
        files: [
          {
            type: "url",
            name: "invoice.pdf",
            url: "https://example.com/invoice.pdf",
          },
        ],
        schema: {
          fields: [
            {
              type: "TEXT",
              name: "vendor_name",
              description: "The vendor name",
            },
          ],
        },
        webhook_url: "https://example.com/webhook",
      });

      const [, calledOptions] = mockFetch.mock.calls[0] as [string, RequestInit];
      expect(JSON.parse(calledOptions.body as string)).toHaveProperty(
        "webhook_url",
        "https://example.com/webhook",
      );
      expect(result).toEqual({
        success: true,
        async: true,
        message: "Processing started",
      });
    });
  });

  describe("transform", () => {
    const transformRequest = {
      file: {
        type: "url" as const,
        name: "photo.jpg",
        url: "https://example.com/photo.jpg",
      },
      operations: [
        {
          type: "resize" as const,
          width_in_px: 800,
          height_in_px: 600,
          fit: "cover" as const,
        },
        { type: "convert" as const, format: "webp" as const, quality: 80 },
      ],
    };

    it("sends the correct request and parses binary result", async () => {
      const binaryData = {
        buffer: "base64encodeddata",
        mime_type: "image/webp",
      };

      mockFetch.mockResolvedValueOnce(createMockResponse({ success: true, data: binaryData }));

      const client = new IterationLayer({ apiKey: TEST_API_KEY });
      const result = await client.transform(transformRequest);

      const [calledUrl, calledOptions] = mockFetch.mock.calls[0] as [string, RequestInit];
      expect(calledUrl).toBe(`${DEFAULT_BASE_URL}/image-transformation/v1/transform`);
      expect(calledOptions.method).toBe("POST");
      expect(calledOptions.headers).toEqual({
        "Content-Type": "application/json",
        Authorization: `Bearer ${TEST_API_KEY}`,
      });
      expect(JSON.parse(calledOptions.body as string)).toEqual(transformRequest);
      expect(result).toEqual(binaryData);
    });
  });

  describe("transformAsync", () => {
    it("handles async result", async () => {
      mockFetch.mockResolvedValueOnce(
        createMockResponse({
          success: true,
          async: true,
          message: "Transform queued",
        }),
      );

      const client = new IterationLayer({ apiKey: TEST_API_KEY });
      const result = await client.transformAsync({
        file: {
          type: "url",
          name: "photo.jpg",
          url: "https://example.com/photo.jpg",
        },
        operations: [{ type: "flip" }],
        webhook_url: "https://example.com/webhook",
      });

      const [, calledOptions] = mockFetch.mock.calls[0] as [string, RequestInit];
      expect(JSON.parse(calledOptions.body as string)).toHaveProperty(
        "webhook_url",
        "https://example.com/webhook",
      );
      expect(result).toEqual({
        success: true,
        async: true,
        message: "Transform queued",
      });
    });
  });

  describe("generateImage", () => {
    const generateImageRequest = {
      dimensions: { width: 1200, height: 630 },
      layers: [
        {
          type: "solid-color" as const,
          index: 0,
          hex_color: "#ffffff",
        },
        {
          type: "text" as const,
          index: 1,
          text: "Hello World",
          font_name: "Arial",
          font_size_in_px: 48,
          text_color: "#000000",
          position: { x: 100, y: 100 },
          dimensions: { width: 1000, height: 200 },
        },
      ],
      output_format: "png" as const,
    };

    it("sends the correct request and parses binary result", async () => {
      const binaryData = { buffer: "pngdata", mime_type: "image/png" };

      mockFetch.mockResolvedValueOnce(createMockResponse({ success: true, data: binaryData }));

      const client = new IterationLayer({ apiKey: TEST_API_KEY });
      const result = await client.generateImage(generateImageRequest);

      const [calledUrl, calledOptions] = mockFetch.mock.calls[0] as [string, RequestInit];
      expect(calledUrl).toBe(`${DEFAULT_BASE_URL}/image-generation/v1/generate`);
      expect(calledOptions.method).toBe("POST");
      expect(calledOptions.headers).toEqual({
        "Content-Type": "application/json",
        Authorization: `Bearer ${TEST_API_KEY}`,
      });
      expect(JSON.parse(calledOptions.body as string)).toEqual(generateImageRequest);
      expect(result).toEqual(binaryData);
    });
  });

  describe("generateImageAsync", () => {
    it("handles async result", async () => {
      mockFetch.mockResolvedValueOnce(
        createMockResponse({
          success: true,
          async: true,
          message: "Image generation started",
        }),
      );

      const client = new IterationLayer({ apiKey: TEST_API_KEY });
      const result = await client.generateImageAsync({
        dimensions: { width: 1200, height: 630 },
        layers: [{ type: "solid-color", index: 0, hex_color: "#ffffff" }],
        webhook_url: "https://example.com/webhook",
      });

      const [, calledOptions] = mockFetch.mock.calls[0] as [string, RequestInit];
      expect(JSON.parse(calledOptions.body as string)).toHaveProperty(
        "webhook_url",
        "https://example.com/webhook",
      );
      expect(result).toEqual({
        success: true,
        async: true,
        message: "Image generation started",
      });
    });
  });

  describe("generateDocument", () => {
    const generateDocumentRequest = {
      format: "pdf" as const,
      document: {
        metadata: { title: "Test Document", author: "Test Author" },
        page: {
          size: { preset: "A4" as const },
          margins: {
            top_in_pt: 72,
            right_in_pt: 72,
            bottom_in_pt: 72,
            left_in_pt: 72,
          },
        },
        styles: {
          text: {
            font_family: "Helvetica",
            font_size_in_pt: 12,
            line_height: 1.5,
            color: "#000000",
          },
          headline: {
            font_family: "Helvetica",
            font_size_in_pt: 24,
            color: "#000000",
            spacing_before_in_pt: 12,
            spacing_after_in_pt: 6,
            font_weight: "bold",
          },
          link: { color: "#0066cc" },
          list: {
            marker_color: "#000000",
            marker_gap_in_pt: 4,
            text_style: {
              font_family: "Helvetica",
              font_size_in_pt: 12,
              line_height: 1.5,
              color: "#000000",
            },
          },
          table: {
            header: {
              background_color: "#f0f0f0",
              text_color: "#000000",
              font_size_in_pt: 12,
              font_weight: "bold",
            },
            body: {
              background_color: "#ffffff",
              text_color: "#000000",
              font_size_in_pt: 12,
            },
          },
          grid: {
            background_color: "#f9f9f9",
            border_color: "#cccccc",
            border_width_in_pt: 1,
            gap_in_pt: 12,
          },
          separator: {
            color: "#cccccc",
            thickness_in_pt: 1,
            spacing_before_in_pt: 12,
            spacing_after_in_pt: 12,
          },
          image: {
            border_color: "#cccccc",
            border_width_in_pt: 1,
          },
        },
        content: [
          { type: "headline" as const, level: "h1" as const, text: "Test" },
          {
            type: "paragraph" as const,
            markdown: "Hello **world**",
          },
        ],
      },
    };

    it("sends the correct request and parses binary result", async () => {
      const binaryData = { buffer: "pdfdata", mime_type: "application/pdf" };

      mockFetch.mockResolvedValueOnce(createMockResponse({ success: true, data: binaryData }));

      const client = new IterationLayer({ apiKey: TEST_API_KEY });
      const result = await client.generateDocument(generateDocumentRequest);

      const [calledUrl, calledOptions] = mockFetch.mock.calls[0] as [string, RequestInit];
      expect(calledUrl).toBe(`${DEFAULT_BASE_URL}/document-generation/v1/generate`);
      expect(calledOptions.method).toBe("POST");
      expect(calledOptions.headers).toEqual({
        "Content-Type": "application/json",
        Authorization: `Bearer ${TEST_API_KEY}`,
      });
      expect(JSON.parse(calledOptions.body as string)).toEqual(generateDocumentRequest);
      expect(result).toEqual(binaryData);
    });
  });

  describe("generateDocumentAsync", () => {
    it("handles async result", async () => {
      mockFetch.mockResolvedValueOnce(
        createMockResponse({
          success: true,
          async: true,
          message: "Document generation queued",
        }),
      );

      const client = new IterationLayer({ apiKey: TEST_API_KEY });
      const result = await client.generateDocumentAsync({
        format: "pdf",
        document: {
          metadata: { title: "Test" },
          page: {
            size: { preset: "A4" },
            margins: {
              top_in_pt: 72,
              right_in_pt: 72,
              bottom_in_pt: 72,
              left_in_pt: 72,
            },
          },
          styles: {
            text: {
              font_family: "Helvetica",
              font_size_in_pt: 12,
              line_height: 1.5,
              color: "#000",
            },
            headline: {
              font_family: "Helvetica",
              font_size_in_pt: 24,
              color: "#000",
              spacing_before_in_pt: 12,
              spacing_after_in_pt: 6,
            },
            link: { color: "#0066cc" },
            list: {
              marker_color: "#000",
              marker_gap_in_pt: 4,
              text_style: {
                font_family: "Helvetica",
                font_size_in_pt: 12,
                line_height: 1.5,
                color: "#000",
              },
            },
            table: {
              header: {
                background_color: "#f0f0f0",
                text_color: "#000",
                font_size_in_pt: 12,
              },
              body: {
                background_color: "#ffffff",
                text_color: "#000",
                font_size_in_pt: 12,
              },
            },
            grid: {
              background_color: "#f9f9f9",
              border_color: "#ccc",
              border_width_in_pt: 1,
              gap_in_pt: 12,
            },
            separator: {
              color: "#ccc",
              thickness_in_pt: 1,
              spacing_before_in_pt: 12,
              spacing_after_in_pt: 12,
            },
            image: {
              border_color: "#ccc",
              border_width_in_pt: 1,
            },
          },
          content: [{ type: "headline", level: "h1", text: "Test" }],
        },
        webhook_url: "https://example.com/webhook",
      });

      const [, calledOptions] = mockFetch.mock.calls[0] as [string, RequestInit];
      expect(JSON.parse(calledOptions.body as string)).toHaveProperty(
        "webhook_url",
        "https://example.com/webhook",
      );
      expect(result).toEqual({
        success: true,
        async: true,
        message: "Document generation queued",
      });
    });
  });

  describe("generateSheet", () => {
    const generateSheetRequest = {
      format: "xlsx" as const,
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
              { value: 1500.5, format: "currency" as const, currency_code: "EUR" },
            ],
          ],
        },
      ],
    };

    it("sends the correct request and parses binary result", async () => {
      const binaryData = {
        buffer: "sheetdata",
        mime_type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      };

      mockFetch.mockResolvedValueOnce(createMockResponse({ success: true, data: binaryData }));

      const client = new IterationLayer({ apiKey: TEST_API_KEY });
      const result = await client.generateSheet(generateSheetRequest);

      const [calledUrl, calledOptions] = mockFetch.mock.calls[0] as [string, RequestInit];
      expect(calledUrl).toBe(`${DEFAULT_BASE_URL}/sheet-generation/v1/generate`);
      expect(calledOptions.method).toBe("POST");
      expect(calledOptions.headers).toEqual({
        "Content-Type": "application/json",
        Authorization: `Bearer ${TEST_API_KEY}`,
      });
      expect(JSON.parse(calledOptions.body as string)).toEqual(generateSheetRequest);
      expect(result).toEqual(binaryData);
    });
  });

  describe("generateSheetAsync", () => {
    it("handles async result", async () => {
      mockFetch.mockResolvedValueOnce(
        createMockResponse({
          success: true,
          async: true,
          message: "Sheet generation queued",
        }),
      );

      const client = new IterationLayer({ apiKey: TEST_API_KEY });
      const result = await client.generateSheetAsync({
        format: "xlsx",
        sheets: [
          {
            name: "Test",
            columns: [{ name: "A" }],
            rows: [[{ value: "test" }]],
          },
        ],
        webhook_url: "https://example.com/webhook",
      });

      const [, calledOptions] = mockFetch.mock.calls[0] as [string, RequestInit];
      expect(JSON.parse(calledOptions.body as string)).toHaveProperty(
        "webhook_url",
        "https://example.com/webhook",
      );
      expect(result).toEqual({
        success: true,
        async: true,
        message: "Sheet generation queued",
      });
    });
  });

  describe("error handling", () => {
    it("throws IterationLayerError on error response", async () => {
      mockFetch.mockResolvedValueOnce(
        createMockResponse({ success: false, error: "Invalid API key" }, 401),
      );

      const client = new IterationLayer({ apiKey: "invalid-key" });

      try {
        await client.extract({
          files: [
            {
              type: "url",
              name: "test.pdf",
              url: "https://example.com/test.pdf",
            },
          ],
          schema: { fields: [] },
        });
        expect.fail("Should have thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(IterationLayerError);
        expect((error as IterationLayerError).statusCode).toBe(401);
        expect((error as IterationLayerError).errorMessage).toBe("Invalid API key");
        expect((error as Error).message).toContain("Invalid API key");
      }
    });

    it("includes status code in error", async () => {
      mockFetch.mockResolvedValueOnce(
        createMockResponse({ success: false, error: "Rate limited" }, 429),
      );

      const client = new IterationLayer({ apiKey: TEST_API_KEY });

      try {
        await client.extract({
          files: [
            {
              type: "url",
              name: "test.pdf",
              url: "https://example.com/test.pdf",
            },
          ],
          schema: { fields: [] },
        });
        expect.fail("Should have thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(IterationLayerError);
        const iterationLayerError = error as IterationLayerError;
        expect(iterationLayerError.statusCode).toBe(429);
        expect(iterationLayerError.errorMessage).toBe("Rate limited");
      }
    });

    it("throws IterationLayerError on server error", async () => {
      mockFetch.mockResolvedValueOnce(
        createMockResponse({ success: false, error: "Internal server error" }, 500),
      );

      const client = new IterationLayer({ apiKey: TEST_API_KEY });

      await expect(
        client.transform({
          file: {
            type: "url",
            name: "test.png",
            url: "https://example.com/test.png",
          },
          operations: [{ type: "flip" }],
        }),
      ).rejects.toThrow(IterationLayerError);
    });
  });
});
