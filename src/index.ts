export type * from "./types.js";

import type {
  AsyncResult,
  BinaryResult,
  ConvertDocumentToMarkdownAsyncRequest,
  ConvertDocumentToMarkdownRequest,
  ConvertResult,
  ErrorResponse,
  ExtractDocumentAsyncRequest,
  ExtractDocumentRequest,
  ExtractionResult,
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
} from "./types.js";

const DEFAULT_BASE_URL = "https://api.iterationlayer.com";

export interface IterationLayerConfig {
  apiKey: string;
  baseUrl?: string;
}

interface SuccessApiResponse<T> {
  success: true;
  data: T;
}

interface BinaryResultWire {
  buffer: string;
  mime_type: string;
}

function serializeBinaryFields(value: unknown): unknown {
  if (value instanceof Uint8Array) {
    return encodeBase64(value);
  }

  if (Array.isArray(value)) {
    return value.map((item) => serializeBinaryFields(item));
  }

  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, serializeBinaryFields(item)]),
    );
  }

  return value;
}

function encodeBase64(value: Uint8Array): string {
  let binary = "";
  for (const byte of value) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}

function decodeBase64(value: string): Uint8Array {
  return Uint8Array.from(atob(value), (character) => character.charCodeAt(0));
}

export class IterationLayerError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly errorMessage: string,
  ) {
    super(`Iteration Layer API error (${statusCode}): ${errorMessage}`);
    this.name = "IterationLayerError";
  }
}

export class IterationLayer {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(config: IterationLayerConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl ?? DEFAULT_BASE_URL;
  }

  async extractDocument(request: ExtractDocumentRequest): Promise<ExtractionResult> {
    return this.post("/document-extraction/v1/extract", request);
  }

  async extractDocumentAsync(request: ExtractDocumentAsyncRequest): Promise<AsyncResult> {
    return this.postAsync("/document-extraction/v1/extract", request);
  }

  async generateDocument(request: GenerateDocumentRequest): Promise<BinaryResult> {
    const result = await this.post<BinaryResultWire>("/document-generation/v1/generate", request);
    return { buffer: decodeBase64(result.buffer), mime_type: result.mime_type };
  }

  async generateDocumentAsync(request: GenerateDocumentAsyncRequest): Promise<AsyncResult> {
    return this.postAsync("/document-generation/v1/generate", request);
  }

  async convertDocumentToMarkdown(
    request: ConvertDocumentToMarkdownRequest,
  ): Promise<ConvertResult> {
    return this.post("/document-to-markdown/v1/convert", request);
  }

  async convertDocumentToMarkdownAsync(
    request: ConvertDocumentToMarkdownAsyncRequest,
  ): Promise<AsyncResult> {
    return this.postAsync("/document-to-markdown/v1/convert", request);
  }

  async generateImage(request: GenerateImageRequest): Promise<BinaryResult> {
    const result = await this.post<BinaryResultWire>("/image-generation/v1/generate", request);
    return { buffer: decodeBase64(result.buffer), mime_type: result.mime_type };
  }

  async generateImageAsync(request: GenerateImageAsyncRequest): Promise<AsyncResult> {
    return this.postAsync("/image-generation/v1/generate", request);
  }

  async transformImage(request: TransformImageRequest): Promise<BinaryResult> {
    const result = await this.post<BinaryResultWire>("/image-transformation/v1/transform", request);
    return { buffer: decodeBase64(result.buffer), mime_type: result.mime_type };
  }

  async transformImageAsync(request: TransformImageAsyncRequest): Promise<AsyncResult> {
    return this.postAsync("/image-transformation/v1/transform", request);
  }

  async generateSheet(request: GenerateSheetRequest): Promise<BinaryResult> {
    const result = await this.post<BinaryResultWire>("/sheet-generation/v1/generate", request);
    return { buffer: decodeBase64(result.buffer), mime_type: result.mime_type };
  }

  async generateSheetAsync(request: GenerateSheetAsyncRequest): Promise<AsyncResult> {
    return this.postAsync("/sheet-generation/v1/generate", request);
  }

  async extractWebsite(request: ExtractWebsiteRequest): Promise<ExtractionResult> {
    return this.post("/website-extraction/v1/extract", request);
  }

  async extractWebsiteAsync(request: ExtractWebsiteAsyncRequest): Promise<AsyncResult> {
    return this.postAsync("/website-extraction/v1/extract", request);
  }

  private async post<T>(path: string, body: unknown): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-IterationLayer-Integration": "sdk-node",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(serializeBinaryFields(body)),
    });

    const json: SuccessApiResponse<T> | ErrorResponse = await response.json();

    if (!json.success) {
      throw new IterationLayerError(response.status, json.error);
    }

    return json.data;
  }

  private async postAsync(path: string, body: unknown): Promise<AsyncResult> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-IterationLayer-Integration": "sdk-node",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(serializeBinaryFields(body)),
    });

    const json: AsyncResult | ErrorResponse = await response.json();

    if (!json.success) {
      throw new IterationLayerError(response.status, json.error);
    }

    return { success: json.success, async: json.async, message: json.message };
  }
}

export default IterationLayer;
