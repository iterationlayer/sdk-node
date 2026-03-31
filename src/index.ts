export type {
  AddressFieldConfig,
  AngledEdge,
  ArrayFieldConfig,
  AsyncResult,
  AutoContrastOperation,
  BarcodeFormat,
  BarcodeLayer,
  BinaryResult,
  BlurOperation,
  BooleanFieldConfig,
  BorderStyle,
  CalculatedFieldConfig,
  CompressToSizeOperation,
  ContentBlock,
  ConvertOperation,
  ConvertRequest,
  ConvertResult,
  CountryFieldConfig,
  CropOperation,
  CurrencyAmountFieldConfig,
  CurrencyCodeFieldConfig,
  DateFieldConfig,
  DatetimeFieldConfig,
  DecimalFieldConfig,
  DenoiseOperation,
  // Image Generation
  Dimensions,
  DocumentBarcodeBlock,
  DocumentDefinition,
  DocumentFontDefinition,
  // Document Generation
  DocumentFormat,
  DocumentMetadata,
  DocumentPage,
  DocumentQrCodeBlock,
  DocumentStyles,
  EmailFieldConfig,
  EnumFieldConfig,
  ExtendOperation,
  ExtractAsyncRequest,
  // Responses
  ExtractionFieldResult,
  ExtractionResult,
  ExtractRequest,
  // Document Extraction
  FieldConfig,
  // File input
  FileInput,
  FileInputBase64,
  FileInputUrl,
  FlipOperation,
  FlopOperation,
  FontWeight,
  GammaOperation,
  GenerateDocumentAsyncRequest,
  GenerateDocumentRequest,
  GenerateImageAsyncRequest,
  GenerateImageRequest,
  // Sheet Generation
  GenerateSheetAsyncRequest,
  GenerateSheetRequest,
  GradientColorStop,
  GradientLayer,
  GrayscaleOperation,
  GridBlock,
  GridColumn,
  GridStyle,
  HeaderFooterBlock,
  HeadlineBlock,
  HeadlineLevel,
  HeadlineStyle,
  HeadlineTableOfContents,
  HorizontalAlignment,
  IbanFieldConfig,
  ImageBlock,
  ImageFontDefinition,
  ImageLayer,
  ImageOutputFormat,
  ImageStyle,
  IntegerFieldConfig,
  InvertColorsOperation,
  Layer,
  LinkStyle,
  ListBlock,
  ListItem,
  ListStyle,
  Margins,
  MarkdownFileResult,
  ModulateOperation,
  OpacityOperation,
  PageBreakBlock,
  PageNumberBlock,
  PageSize,
  PageSizePreset,
  ParagraphBlock,
  ParagraphRun,
  Position,
  QrCodeLayer,
  RemoveBackgroundOperation,
  RemoveTransparencyOperation,
  ResizeOperation,
  RotateOperation,
  SeparatorBlock,
  SeparatorStyle,
  SharpenOperation,
  Sheet,
  SheetCell,
  SheetCellFormat,
  SheetCellStyle,
  SheetColumn,
  SheetFontDefinition,
  SheetFontStyle,
  SheetFontWeight,
  SheetFormat,
  SheetHorizontalAlignment,
  SheetNumberStyle,
  SheetStyles,
  SmartCropOperation,
  SolidColorLayer,
  TableBlock,
  TableBodyStyle,
  TableCell,
  TableHeaderStyle,
  TableOfContentsBlock,
  TableRow,
  TableStyle,
  TextAlignment,
  TextareaFieldConfig,
  TextFieldConfig,
  TextLayer,
  TextStyle,
  ThresholdOperation,
  TimeFieldConfig,
  TintOperation,
  // Image Transformation
  TransformAsyncRequest,
  TransformOperation,
  TransformRequest,
  TrimOperation,
  UpscaleOperation,
  VerticalAlignment,
} from "./types.js";

import type {
  AsyncResult,
  BinaryResult,
  ConvertRequest,
  ConvertResult,
  ExtractAsyncRequest,
  ExtractionResult,
  ExtractRequest,
  GenerateDocumentAsyncRequest,
  GenerateDocumentRequest,
  GenerateImageAsyncRequest,
  GenerateImageRequest,
  GenerateSheetAsyncRequest,
  GenerateSheetRequest,
  TransformAsyncRequest,
  TransformRequest,
} from "./types.js";

const DEFAULT_BASE_URL = "https://api.iterationlayer.com";

export interface IterationLayerConfig {
  apiKey: string;
  baseUrl?: string;
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

  async convertToMarkdown(request: ConvertRequest): Promise<ConvertResult> {
    return this.post("/document-to-markdown/v1/convert", request);
  }

  async extract(request: ExtractRequest): Promise<ExtractionResult> {
    return this.post("/document-extraction/v1/extract", request);
  }

  async extractAsync(request: ExtractAsyncRequest): Promise<AsyncResult> {
    return this.post("/document-extraction/v1/extract", request);
  }

  async transform(request: TransformRequest): Promise<BinaryResult> {
    return this.post("/image-transformation/v1/transform", request);
  }

  async transformAsync(request: TransformAsyncRequest): Promise<AsyncResult> {
    return this.post("/image-transformation/v1/transform", request);
  }

  async generateImage(request: GenerateImageRequest): Promise<BinaryResult> {
    return this.post("/image-generation/v1/generate", request);
  }

  async generateImageAsync(request: GenerateImageAsyncRequest): Promise<AsyncResult> {
    return this.post("/image-generation/v1/generate", request);
  }

  async generateDocument(request: GenerateDocumentRequest): Promise<BinaryResult> {
    return this.post("/document-generation/v1/generate", request);
  }

  async generateDocumentAsync(request: GenerateDocumentAsyncRequest): Promise<AsyncResult> {
    return this.post("/document-generation/v1/generate", request);
  }

  async generateSheet(request: GenerateSheetRequest): Promise<BinaryResult> {
    return this.post("/sheet-generation/v1/generate", request);
  }

  async generateSheetAsync(request: GenerateSheetAsyncRequest): Promise<AsyncResult> {
    return this.post("/sheet-generation/v1/generate", request);
  }

  private async post<T>(path: string, body: unknown): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(body),
    });

    const json = (await response.json()) as
      | { success: true; data: T }
      | { success: true; async: true; message: string }
      | { success: false; error: string };

    if (!json.success) {
      throw new IterationLayerError(response.status, json.error);
    }

    if ("async" in json && json.async) {
      return json as unknown as T;
    }

    if ("data" in json) {
      return json.data;
    }

    throw new IterationLayerError(response.status, "Unexpected response format");
  }
}

export default IterationLayer;
