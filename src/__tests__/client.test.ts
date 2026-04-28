import { afterEach, describe, expect, it, vi } from "vitest";
import { IterationLayer, IterationLayerError } from "../index.js";
import type {
  ConvertDocumentToMarkdownAsyncRequest,
  ConvertDocumentToMarkdownRequest,
  ExtractDocumentAsyncRequest,
  ExtractDocumentRequest,
  ExtractWebsiteAsyncRequest,
  ExtractWebsiteRequest,
  GenerateDocumentAsyncRequest,
  GenerateDocumentRequest,
  GenerateImageAsyncRequest,
  GenerateImageRequest,
  GenerateSheetAsyncRequest,
  GenerateSheetRequest,
  TransformImageAsyncRequest,
  TransformImageRequest,
} from "../types.js";

const TEST_API_KEY = "test-api-key-123";
const DEFAULT_BASE_URL = "https://api.iterationlayer.com";
const CUSTOM_BASE_URL = "https://custom.example.com";

const createMockResponse = (body: unknown, status = 200) => ({
  ok: status >= 200 && status < 300,
  status,
  json: () => Promise.resolve(body),
});

describe("IterationLayer", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  describe("client construction", () => {
    it("uses the default base URL when none is provided", async () => {
      const mockFetch = vi
        .fn()
        .mockResolvedValue(
          createMockResponse({ success: true, data: { buffer: "AQID", mime_type: "image/png" } }),
        );
      vi.stubGlobal("fetch", mockFetch);

      const client = new IterationLayer({ apiKey: TEST_API_KEY });
      const result = await client.transformImage({
        file: { type: "base64", name: "image.png", base64: new Uint8Array([1, 2, 3]) },
        operations: [],
      });
      expect(Array.from(result.buffer)).toEqual([1, 2, 3]);
      const maybeRequestInit = mockFetch.mock.calls.at(-1)?.at(1);
      const requestBody = JSON.parse(String(maybeRequestInit?.body));
      expect(JSON.stringify(requestBody)).toContain('"base64":"AQID"');

      expect(mockFetch).toHaveBeenLastCalledWith(
        `${DEFAULT_BASE_URL}/image-transformation/v1/transform`,
        expect.objectContaining({ method: "POST" }),
      );
    });

    it("uses a custom base URL when provided", async () => {
      const mockFetch = vi
        .fn()
        .mockResolvedValue(
          createMockResponse({ success: true, data: { buffer: "AQID", mime_type: "image/png" } }),
        );
      vi.stubGlobal("fetch", mockFetch);

      const client = new IterationLayer({ apiKey: TEST_API_KEY, baseUrl: CUSTOM_BASE_URL });
      await client.transformImage({
        file: { type: "base64", name: "image.png", base64: new Uint8Array([1, 2, 3]) },
        operations: [],
      });

      expect(mockFetch).toHaveBeenLastCalledWith(
        `${CUSTOM_BASE_URL}/image-transformation/v1/transform`,
        expect.objectContaining({ method: "POST" }),
      );
    });
  });

  describe("generated endpoint methods", () => {
    it("posts extractDocument requests to /document-extraction/v1/extract", async () => {
      const mockFetch = vi.fn().mockResolvedValue(createMockResponse({ success: true, data: {} }));
      vi.stubGlobal("fetch", mockFetch);

      const client = new IterationLayer({ apiKey: TEST_API_KEY });
      const request: ExtractDocumentRequest = {
        files: [
          {
            type: "base64",
          },
        ],
        schema: {
          fields: [
            {
              description: "example",
              name: "example",
              type: "TEXT",
            },
          ],
        },
      };
      await client.extractDocument(request);

      expect(mockFetch).toHaveBeenLastCalledWith(
        `${DEFAULT_BASE_URL}/document-extraction/v1/extract`,
        expect.objectContaining({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TEST_API_KEY}`,
          },
          body: expect.any(String),
        }),
      );
    });

    it("posts extractDocumentAsync requests to /document-extraction/v1/extract", async () => {
      const mockFetch = vi
        .fn()
        .mockResolvedValue(
          createMockResponse({ success: true, async: true, message: "Processing started" }),
        );
      vi.stubGlobal("fetch", mockFetch);

      const client = new IterationLayer({ apiKey: TEST_API_KEY });
      const request: ExtractDocumentAsyncRequest = {
        ...{
          files: [
            {
              type: "base64",
            },
          ],
          schema: {
            fields: [
              {
                description: "example",
                name: "example",
                type: "TEXT",
              },
            ],
          },
        },
        webhook_url: "https://example.com/webhook",
      };
      const result = await client.extractDocumentAsync(request);

      expect(mockFetch).toHaveBeenLastCalledWith(
        `${DEFAULT_BASE_URL}/document-extraction/v1/extract`,
        expect.objectContaining({ body: expect.any(String) }),
      );
      expect(result).toEqual({ success: true, async: true, message: "Processing started" });
    });

    it("posts generateDocument requests to /document-generation/v1/generate", async () => {
      const mockFetch = vi.fn().mockResolvedValue(
        createMockResponse({
          success: true,
          data: { buffer: "AQID", mime_type: "application/octet-stream" },
        }),
      );
      vi.stubGlobal("fetch", mockFetch);

      const client = new IterationLayer({ apiKey: TEST_API_KEY });
      const request: GenerateDocumentRequest = {
        document: {
          content: [
            {
              type: "paragraph",
            },
          ],
          metadata: {
            title: "example",
          },
          page: {
            margins: {
              bottom_in_pt: 1,
              left_in_pt: 1,
              right_in_pt: 1,
              top_in_pt: 1,
            },
            size: {},
          },
          styles: {
            grid: {
              background_color: "example",
              border_color: "example",
              border_width_in_pt: 1,
              gap_in_pt: 1,
            },
            headline: {
              color: "example",
              font_family: "example",
              font_size_in_pt: 1,
              spacing_after_in_pt: 1,
              spacing_before_in_pt: 1,
            },
            image: {
              border_color: "example",
              border_width_in_pt: 1,
            },
            link: {
              color: "example",
            },
            list: {
              marker_color: "example",
              marker_gap_in_pt: 1,
              text_style: {
                color: "example",
                font_family: "example",
                font_size_in_pt: 1,
                line_height: 1,
              },
            },
            separator: {
              color: "example",
              spacing_after_in_pt: 1,
              spacing_before_in_pt: 1,
              thickness_in_pt: 1,
            },
            table: {
              body: {
                background_color: "example",
                font_size_in_pt: 1,
                text_color: "example",
              },
              border: {
                inner: {
                  horizontal: {
                    color: "example",
                    width_in_pt: 1,
                  },
                  vertical: {
                    color: "example",
                    width_in_pt: 1,
                  },
                },
                outer: {
                  bottom: {
                    color: "example",
                    width_in_pt: 1,
                  },
                  left: {
                    color: "example",
                    width_in_pt: 1,
                  },
                  right: {
                    color: "example",
                    width_in_pt: 1,
                  },
                  top: {
                    color: "example",
                    width_in_pt: 1,
                  },
                },
              },
              header: {
                background_color: "example",
                font_size_in_pt: 1,
                text_color: "example",
              },
            },
            text: {
              color: "example",
              font_family: "example",
              font_size_in_pt: 1,
              line_height: 1,
            },
          },
        },
        format: "pdf",
      };
      const result = await client.generateDocument(request);
      expect(Array.from(result.buffer)).toEqual([1, 2, 3]);
      expect(result.mime_type).toBe("application/octet-stream");

      expect(mockFetch).toHaveBeenLastCalledWith(
        `${DEFAULT_BASE_URL}/document-generation/v1/generate`,
        expect.objectContaining({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TEST_API_KEY}`,
          },
          body: expect.any(String),
        }),
      );
    });

    it("posts generateDocumentAsync requests to /document-generation/v1/generate", async () => {
      const mockFetch = vi
        .fn()
        .mockResolvedValue(
          createMockResponse({ success: true, async: true, message: "Processing started" }),
        );
      vi.stubGlobal("fetch", mockFetch);

      const client = new IterationLayer({ apiKey: TEST_API_KEY });
      const request: GenerateDocumentAsyncRequest = {
        ...{
          document: {
            content: [
              {
                type: "paragraph",
              },
            ],
            metadata: {
              title: "example",
            },
            page: {
              margins: {
                bottom_in_pt: 1,
                left_in_pt: 1,
                right_in_pt: 1,
                top_in_pt: 1,
              },
              size: {},
            },
            styles: {
              grid: {
                background_color: "example",
                border_color: "example",
                border_width_in_pt: 1,
                gap_in_pt: 1,
              },
              headline: {
                color: "example",
                font_family: "example",
                font_size_in_pt: 1,
                spacing_after_in_pt: 1,
                spacing_before_in_pt: 1,
              },
              image: {
                border_color: "example",
                border_width_in_pt: 1,
              },
              link: {
                color: "example",
              },
              list: {
                marker_color: "example",
                marker_gap_in_pt: 1,
                text_style: {
                  color: "example",
                  font_family: "example",
                  font_size_in_pt: 1,
                  line_height: 1,
                },
              },
              separator: {
                color: "example",
                spacing_after_in_pt: 1,
                spacing_before_in_pt: 1,
                thickness_in_pt: 1,
              },
              table: {
                body: {
                  background_color: "example",
                  font_size_in_pt: 1,
                  text_color: "example",
                },
                border: {
                  inner: {
                    horizontal: {
                      color: "example",
                      width_in_pt: 1,
                    },
                    vertical: {
                      color: "example",
                      width_in_pt: 1,
                    },
                  },
                  outer: {
                    bottom: {
                      color: "example",
                      width_in_pt: 1,
                    },
                    left: {
                      color: "example",
                      width_in_pt: 1,
                    },
                    right: {
                      color: "example",
                      width_in_pt: 1,
                    },
                    top: {
                      color: "example",
                      width_in_pt: 1,
                    },
                  },
                },
                header: {
                  background_color: "example",
                  font_size_in_pt: 1,
                  text_color: "example",
                },
              },
              text: {
                color: "example",
                font_family: "example",
                font_size_in_pt: 1,
                line_height: 1,
              },
            },
          },
          format: "pdf",
        },
        webhook_url: "https://example.com/webhook",
      };
      const result = await client.generateDocumentAsync(request);

      expect(mockFetch).toHaveBeenLastCalledWith(
        `${DEFAULT_BASE_URL}/document-generation/v1/generate`,
        expect.objectContaining({ body: expect.any(String) }),
      );
      expect(result).toEqual({ success: true, async: true, message: "Processing started" });
    });

    it("posts convertDocumentToMarkdown requests to /document-to-markdown/v1/convert", async () => {
      const mockFetch = vi.fn().mockResolvedValue(createMockResponse({ success: true, data: {} }));
      vi.stubGlobal("fetch", mockFetch);

      const client = new IterationLayer({ apiKey: TEST_API_KEY });
      const request: ConvertDocumentToMarkdownRequest = {
        file: {
          type: "base64",
        },
      };
      await client.convertDocumentToMarkdown(request);

      expect(mockFetch).toHaveBeenLastCalledWith(
        `${DEFAULT_BASE_URL}/document-to-markdown/v1/convert`,
        expect.objectContaining({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TEST_API_KEY}`,
          },
          body: expect.any(String),
        }),
      );
    });

    it("posts convertDocumentToMarkdownAsync requests to /document-to-markdown/v1/convert", async () => {
      const mockFetch = vi
        .fn()
        .mockResolvedValue(
          createMockResponse({ success: true, async: true, message: "Processing started" }),
        );
      vi.stubGlobal("fetch", mockFetch);

      const client = new IterationLayer({ apiKey: TEST_API_KEY });
      const request: ConvertDocumentToMarkdownAsyncRequest = {
        ...{
          file: {
            type: "base64",
          },
        },
        webhook_url: "https://example.com/webhook",
      };
      const result = await client.convertDocumentToMarkdownAsync(request);

      expect(mockFetch).toHaveBeenLastCalledWith(
        `${DEFAULT_BASE_URL}/document-to-markdown/v1/convert`,
        expect.objectContaining({ body: expect.any(String) }),
      );
      expect(result).toEqual({ success: true, async: true, message: "Processing started" });
    });

    it("posts generateImage requests to /image-generation/v1/generate", async () => {
      const mockFetch = vi.fn().mockResolvedValue(
        createMockResponse({
          success: true,
          data: { buffer: "AQID", mime_type: "application/octet-stream" },
        }),
      );
      vi.stubGlobal("fetch", mockFetch);

      const client = new IterationLayer({ apiKey: TEST_API_KEY });
      const request: GenerateImageRequest = {
        dimensions: {
          height_in_px: 1,
          width_in_px: 1,
        },
        layers: [
          {
            hex_color: "example",
            index: 1,
            type: "solid-color",
          },
        ],
      };
      const result = await client.generateImage(request);
      expect(Array.from(result.buffer)).toEqual([1, 2, 3]);
      expect(result.mime_type).toBe("application/octet-stream");

      expect(mockFetch).toHaveBeenLastCalledWith(
        `${DEFAULT_BASE_URL}/image-generation/v1/generate`,
        expect.objectContaining({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TEST_API_KEY}`,
          },
          body: expect.any(String),
        }),
      );
    });

    it("posts generateImageAsync requests to /image-generation/v1/generate", async () => {
      const mockFetch = vi
        .fn()
        .mockResolvedValue(
          createMockResponse({ success: true, async: true, message: "Processing started" }),
        );
      vi.stubGlobal("fetch", mockFetch);

      const client = new IterationLayer({ apiKey: TEST_API_KEY });
      const request: GenerateImageAsyncRequest = {
        ...{
          dimensions: {
            height_in_px: 1,
            width_in_px: 1,
          },
          layers: [
            {
              hex_color: "example",
              index: 1,
              type: "solid-color",
            },
          ],
        },
        webhook_url: "https://example.com/webhook",
      };
      const result = await client.generateImageAsync(request);

      expect(mockFetch).toHaveBeenLastCalledWith(
        `${DEFAULT_BASE_URL}/image-generation/v1/generate`,
        expect.objectContaining({ body: expect.any(String) }),
      );
      expect(result).toEqual({ success: true, async: true, message: "Processing started" });
    });

    it("posts transformImage requests to /image-transformation/v1/transform", async () => {
      const mockFetch = vi.fn().mockResolvedValue(
        createMockResponse({
          success: true,
          data: { buffer: "AQID", mime_type: "application/octet-stream" },
        }),
      );
      vi.stubGlobal("fetch", mockFetch);

      const client = new IterationLayer({ apiKey: TEST_API_KEY });
      const request: TransformImageRequest = {
        file: {
          type: "base64",
        },
        operations: [
          {
            fit: "cover",
            height_in_px: 1,
            type: "resize",
            width_in_px: 1,
          },
        ],
      };
      const result = await client.transformImage(request);
      expect(Array.from(result.buffer)).toEqual([1, 2, 3]);
      expect(result.mime_type).toBe("application/octet-stream");

      expect(mockFetch).toHaveBeenLastCalledWith(
        `${DEFAULT_BASE_URL}/image-transformation/v1/transform`,
        expect.objectContaining({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TEST_API_KEY}`,
          },
          body: expect.any(String),
        }),
      );
    });

    it("posts transformImageAsync requests to /image-transformation/v1/transform", async () => {
      const mockFetch = vi
        .fn()
        .mockResolvedValue(
          createMockResponse({ success: true, async: true, message: "Processing started" }),
        );
      vi.stubGlobal("fetch", mockFetch);

      const client = new IterationLayer({ apiKey: TEST_API_KEY });
      const request: TransformImageAsyncRequest = {
        ...{
          file: {
            type: "base64",
          },
          operations: [
            {
              fit: "cover",
              height_in_px: 1,
              type: "resize",
              width_in_px: 1,
            },
          ],
        },
        webhook_url: "https://example.com/webhook",
      };
      const result = await client.transformImageAsync(request);

      expect(mockFetch).toHaveBeenLastCalledWith(
        `${DEFAULT_BASE_URL}/image-transformation/v1/transform`,
        expect.objectContaining({ body: expect.any(String) }),
      );
      expect(result).toEqual({ success: true, async: true, message: "Processing started" });
    });

    it("posts generateSheet requests to /sheet-generation/v1/generate", async () => {
      const mockFetch = vi.fn().mockResolvedValue(
        createMockResponse({
          success: true,
          data: { buffer: "AQID", mime_type: "application/octet-stream" },
        }),
      );
      vi.stubGlobal("fetch", mockFetch);

      const client = new IterationLayer({ apiKey: TEST_API_KEY });
      const request: GenerateSheetRequest = {
        format: "csv",
        sheets: [
          {
            columns: [
              {
                name: "example",
              },
            ],
          },
        ],
      };
      const result = await client.generateSheet(request);
      expect(Array.from(result.buffer)).toEqual([1, 2, 3]);
      expect(result.mime_type).toBe("application/octet-stream");

      expect(mockFetch).toHaveBeenLastCalledWith(
        `${DEFAULT_BASE_URL}/sheet-generation/v1/generate`,
        expect.objectContaining({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TEST_API_KEY}`,
          },
          body: expect.any(String),
        }),
      );
    });

    it("posts generateSheetAsync requests to /sheet-generation/v1/generate", async () => {
      const mockFetch = vi
        .fn()
        .mockResolvedValue(
          createMockResponse({ success: true, async: true, message: "Processing started" }),
        );
      vi.stubGlobal("fetch", mockFetch);

      const client = new IterationLayer({ apiKey: TEST_API_KEY });
      const request: GenerateSheetAsyncRequest = {
        ...{
          format: "csv",
          sheets: [
            {
              columns: [
                {
                  name: "example",
                },
              ],
            },
          ],
        },
        webhook_url: "https://example.com/webhook",
      };
      const result = await client.generateSheetAsync(request);

      expect(mockFetch).toHaveBeenLastCalledWith(
        `${DEFAULT_BASE_URL}/sheet-generation/v1/generate`,
        expect.objectContaining({ body: expect.any(String) }),
      );
      expect(result).toEqual({ success: true, async: true, message: "Processing started" });
    });

    it("posts extractWebsite requests to /website-extraction/v1/extract", async () => {
      const mockFetch = vi.fn().mockResolvedValue(createMockResponse({ success: true, data: {} }));
      vi.stubGlobal("fetch", mockFetch);

      const client = new IterationLayer({ apiKey: TEST_API_KEY });
      const request: ExtractWebsiteRequest = {
        file: {
          type: "url",
          url: "example",
        },
        schema: {
          fields: [
            {
              description: "example",
              name: "example",
              type: "TEXT",
            },
          ],
        },
      };
      await client.extractWebsite(request);

      expect(mockFetch).toHaveBeenLastCalledWith(
        `${DEFAULT_BASE_URL}/website-extraction/v1/extract`,
        expect.objectContaining({
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TEST_API_KEY}`,
          },
          body: expect.any(String),
        }),
      );
    });

    it("posts extractWebsiteAsync requests to /website-extraction/v1/extract", async () => {
      const mockFetch = vi
        .fn()
        .mockResolvedValue(
          createMockResponse({ success: true, async: true, message: "Processing started" }),
        );
      vi.stubGlobal("fetch", mockFetch);

      const client = new IterationLayer({ apiKey: TEST_API_KEY });
      const request: ExtractWebsiteAsyncRequest = {
        ...{
          file: {
            type: "url",
            url: "example",
          },
          schema: {
            fields: [
              {
                description: "example",
                name: "example",
                type: "TEXT",
              },
            ],
          },
        },
        webhook_url: "https://example.com/webhook",
      };
      const result = await client.extractWebsiteAsync(request);

      expect(mockFetch).toHaveBeenLastCalledWith(
        `${DEFAULT_BASE_URL}/website-extraction/v1/extract`,
        expect.objectContaining({ body: expect.any(String) }),
      );
      expect(result).toEqual({ success: true, async: true, message: "Processing started" });
    });
  });

  it("throws IterationLayerError for unsuccessful API responses", async () => {
    const mockFetch = vi
      .fn()
      .mockResolvedValue(createMockResponse({ success: false, error: "Invalid request" }, 422));
    vi.stubGlobal("fetch", mockFetch);

    const client = new IterationLayer({ apiKey: TEST_API_KEY });
    const promise = client.transformImage({
      file: { type: "base64", name: "image.png", base64: new Uint8Array([1, 2, 3]) },
      operations: [],
    });

    await expect(promise).rejects.toThrow(IterationLayerError);
    await expect(promise).rejects.toMatchObject({
      statusCode: 422,
      errorMessage: "Invalid request",
    });
  });
});
