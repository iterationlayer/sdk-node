export interface BinaryResult {
  buffer: Uint8Array;
  mime_type: string;
}

export interface ExtractionFieldResult {
  value: unknown;
  confidence: number;
  citations: string[];
  source: string;
  type: string;
}

export type ExtractionResult = Record<string, ExtractionFieldResult>;

export interface MarkdownFileResult {
  name: string;
  mime_type: string;
  markdown: string;
  description?: string;
}

export type ConvertResult = MarkdownFileResult;

export interface AddressFieldConfig {
  /** List of ISO 3166-1 alpha-2 country codes to restrict valid addresses to. */
  allowed_country_codes?: string[];
  /** Human-readable description guiding the AI on what to extract for this field. */
  description: string;
  /** Whether this field must be present in the extraction result. Defaults to false. */
  is_required?: boolean;
  /** Unique field name used as the key in extraction results. */
  name: string;
  /** Must be 'ADDRESS' for a structured address field. */
  type: "ADDRESS";
}

export interface AngledEdge {
  /** Angle in degrees, from -45 to 45. */
  angle_in_degrees: number;
  /** Which edge to angle. */
  edge: "left" | "right" | "top" | "bottom";
}

export interface ArrayFieldConfig {
  /** Human-readable description guiding the AI on what to extract for this field. */
  description: string;
  /** List of field configurations defining the schema for each item in the array. */
  fields: Record<string, unknown>[];
  /** Whether this field must be present in the extraction result. Defaults to false. */
  is_required?: boolean;
  /** Unique field name used as the key in extraction results. */
  name: string;
  /** Must be 'ARRAY' for a repeating list of structured items. */
  type: "ARRAY";
}

export interface AsyncResult {
  async: true;
  message: string;
  success: true;
}

export type AsyncResponse = AsyncResult;

export interface AutoContrastOperation {
  /** Must be 'auto_contrast'. */
  type: "auto_contrast";
}

export interface BarcodeBlock {
  /** Background color as a 6-digit hex code. */
  bg_hex_color?: string;
  /** Foreground (bar) color as a 6-digit hex code. */
  fg_hex_color?: string;
  /** Barcode format. */
  format: "code128" | "ean13" | "ean8" | "code39" | "itf" | "codabar";
  /** Height in points. Must be >= 1. */
  height_in_pt: number;
  /** Must be 'barcode'. */
  type: "barcode";
  /** Data to encode in the barcode. */
  value: string;
  /** Width in points. Must be >= 1. */
  width_in_pt: number;
}

export interface BarcodeLayer {
  /** Background color as a 6-digit hex code. */
  background_hex_color: string;
  dimensions: Dimensions;
  /** Bar color as a 6-digit hex code. */
  foreground_hex_color: string;
  /** Barcode format. */
  format: "code128" | "ean13" | "ean8" | "code39" | "itf" | "codabar";
  /** Z-order index of this layer. Must be >= 0. */
  index: number;
  /** Layer opacity from 0 (transparent) to 100 (opaque). Defaults to 100. */
  opacity?: number;
  position: Position;
  /** Rotation angle in degrees, from -180 to 180. */
  rotation_in_degrees?: number;
  /** Must be 'barcode'. */
  type: "barcode";
  /** Data to encode in the barcode. */
  value: string;
}

export interface BlurOperation {
  /** Gaussian blur radius. Must be > 0. */
  sigma: number;
  /** Must be 'blur'. */
  type: "blur";
}

export interface BooleanFieldConfig {
  /** Default boolean value if the field is not found in the document. */
  default_value?: boolean;
  /** Human-readable description guiding the AI on what to extract for this field. */
  description: string;
  /** Whether this field must be present in the extraction result. Defaults to false. */
  is_required?: boolean;
  /** Unique field name used as the key in extraction results. */
  name: string;
  /** Must be 'BOOLEAN' for a true/false field. */
  type: "BOOLEAN";
}

export interface BorderStyle {
  /** Border color as a 6-digit hex code. */
  color: string;
  /** Border width in points. Must be >= 0. */
  width_in_pt: number;
}

export interface BorderStyleOverrides {
  /** Override border color as a 6-digit hex code. */
  color?: string;
  /** Override border width in points. Must be >= 0. */
  width_in_pt?: number;
}

export interface CalculatedFieldConfig {
  /** Human-readable description guiding the AI on what this calculated field represents. */
  description: string;
  /** Whether this field must be present in the extraction result. Defaults to false. */
  is_required?: boolean;
  /** Unique field name used as the key in extraction results. */
  name: string;
  /** Arithmetic operation to apply to the source fields. */
  operation: "sum" | "subtract" | "multiply" | "divide";
  /** Ordered list of field names whose values are used as operands. */
  source_field_names: string[];
  /** Must be 'CALCULATED' for a field whose value is computed from other fields. */
  type: "CALCULATED";
  /** Unit of measurement for the result (e.g., 'EUR', 'kg'). */
  unit?: string;
}

export interface CellStyle {
  /** Cell background color as a 6-digit hex code. */
  background_color?: string;
  /** Text color as a 6-digit hex code. */
  font_color?: string;
  /** Font family name for the cell text. */
  font_family?: string;
  /** Font size in points. Must be >= 1. */
  font_size_in_pt?: number;
  /** Horizontal text alignment within the cell. */
  horizontal_alignment?: "left" | "center" | "right";
  /** Whether the text is bold. */
  is_bold?: boolean;
  /** Whether the text is italic. */
  is_italic?: boolean;
  /** Number format pattern (e.g., '#,##0.00' or '0%'). */
  number_format?: string;
}

export interface Column {
  /** Column header name. Must not be empty. */
  name: string;
  /** Column width as a fraction. Must be > 0. */
  width?: number;
}

export interface CompressToSizeOperation {
  /** Target maximum file size in bytes. Must be > 0. */
  max_file_size_in_bytes: number;
  /** Must be 'compress_to_size'. */
  type: "compress_to_size";
}

export interface ConvertOperation {
  /** Target image format. */
  format: "png" | "jpeg" | "webp" | "avif" | "heif";
  /** Compression quality from 1 (lowest) to 100 (highest). */
  quality?: number;
  /** Must be 'convert'. */
  type: "convert";
}

export interface CountryFieldConfig {
  /** Default ISO 3166-1 alpha-2 country code if the field is not found in the document. */
  default_value?:
    | "AD"
    | "AE"
    | "AF"
    | "AG"
    | "AI"
    | "AL"
    | "AM"
    | "AO"
    | "AQ"
    | "AR"
    | "AS"
    | "AT"
    | "AU"
    | "AW"
    | "AX"
    | "AZ"
    | "BA"
    | "BB"
    | "BD"
    | "BE"
    | "BF"
    | "BG"
    | "BH"
    | "BI"
    | "BJ"
    | "BL"
    | "BM"
    | "BN"
    | "BO"
    | "BQ"
    | "BR"
    | "BS"
    | "BT"
    | "BW"
    | "BY"
    | "BZ"
    | "CA"
    | "CC"
    | "CD"
    | "CF"
    | "CG"
    | "CH"
    | "CI"
    | "CK"
    | "CL"
    | "CM"
    | "CN"
    | "CO"
    | "CR"
    | "CU"
    | "CV"
    | "CW"
    | "CX"
    | "CY"
    | "CZ"
    | "DE"
    | "DJ"
    | "DK"
    | "DM"
    | "DO"
    | "DZ"
    | "EC"
    | "EE"
    | "EG"
    | "EH"
    | "ER"
    | "ES"
    | "ET"
    | "FI"
    | "FJ"
    | "FK"
    | "FM"
    | "FO"
    | "FR"
    | "GA"
    | "GB"
    | "GD"
    | "GE"
    | "GF"
    | "GG"
    | "GH"
    | "GI"
    | "GL"
    | "GM"
    | "GN"
    | "GP"
    | "GQ"
    | "GR"
    | "GS"
    | "GT"
    | "GU"
    | "GW"
    | "GY"
    | "HK"
    | "HN"
    | "HR"
    | "HT"
    | "HU"
    | "ID"
    | "IE"
    | "IL"
    | "IM"
    | "IN"
    | "IO"
    | "IQ"
    | "IR"
    | "IS"
    | "IT"
    | "JE"
    | "JM"
    | "JO"
    | "JP"
    | "KE"
    | "KG"
    | "KH"
    | "KI"
    | "KM"
    | "KN"
    | "KP"
    | "KR"
    | "KW"
    | "KY"
    | "KZ"
    | "LA"
    | "LB"
    | "LC"
    | "LI"
    | "LK"
    | "LR"
    | "LS"
    | "LT"
    | "LU"
    | "LV"
    | "LY"
    | "MA"
    | "MC"
    | "MD"
    | "ME"
    | "MF"
    | "MG"
    | "MH"
    | "MK"
    | "ML"
    | "MM"
    | "MN"
    | "MO"
    | "MP"
    | "MQ"
    | "MR"
    | "MS"
    | "MT"
    | "MU"
    | "MV"
    | "MW"
    | "MX"
    | "MY"
    | "MZ"
    | "NA"
    | "NC"
    | "NE"
    | "NF"
    | "NG"
    | "NI"
    | "NL"
    | "NO"
    | "NP"
    | "NR"
    | "NU"
    | "NZ"
    | "OM"
    | "PA"
    | "PE"
    | "PF"
    | "PG"
    | "PH"
    | "PK"
    | "PL"
    | "PM"
    | "PN"
    | "PR"
    | "PS"
    | "PT"
    | "PW"
    | "PY"
    | "QA"
    | "RE"
    | "RO"
    | "RS"
    | "RU"
    | "RW"
    | "SA"
    | "SB"
    | "SC"
    | "SD"
    | "SE"
    | "SG"
    | "SH"
    | "SI"
    | "SJ"
    | "SK"
    | "SL"
    | "SM"
    | "SN"
    | "SO"
    | "SR"
    | "SS"
    | "ST"
    | "SV"
    | "SX"
    | "SY"
    | "SZ"
    | "TC"
    | "TD"
    | "TF"
    | "TG"
    | "TH"
    | "TJ"
    | "TK"
    | "TL"
    | "TM"
    | "TN"
    | "TO"
    | "TR"
    | "TT"
    | "TV"
    | "TW"
    | "TZ"
    | "UA"
    | "UG"
    | "UM"
    | "US"
    | "UY"
    | "UZ"
    | "VA"
    | "VC"
    | "VE"
    | "VG"
    | "VI"
    | "VN"
    | "VU"
    | "WF"
    | "WS"
    | "YE"
    | "YT"
    | "ZA"
    | "ZM"
    | "ZW";
  /** Human-readable description guiding the AI on what to extract for this field. */
  description: string;
  /** Whether this field must be present in the extraction result. Defaults to false. */
  is_required?: boolean;
  /** Unique field name used as the key in extraction results. */
  name: string;
  /** Must be 'COUNTRY' for an ISO 3166-1 alpha-2 country code field. */
  type: "COUNTRY";
}

export interface CropOperation {
  /** Height of the crop area in pixels. Must be > 0. */
  height_in_px: number;
  /** Left offset in pixels for the crop area. Must be >= 0. */
  left_in_px: number;
  /** Top offset in pixels for the crop area. Must be >= 0. */
  top_in_px: number;
  /** Must be 'crop'. */
  type: "crop";
  /** Width of the crop area in pixels. Must be > 0. */
  width_in_px: number;
}

export interface CurrencyAmountFieldConfig {
  /** Number of decimal places for the amount. Must be >= 0. */
  decimal_points?: number;
  /** Default amount if the field is not found in the document. */
  default_value?: number;
  /** Human-readable description guiding the AI on what to extract for this field. */
  description: string;
  /** Whether this field must be present in the extraction result. Defaults to false. */
  is_required?: boolean;
  /** Maximum allowed amount (inclusive). */
  max?: number;
  /** Minimum allowed amount (inclusive). */
  min?: number;
  /** Unique field name used as the key in extraction results. */
  name: string;
  /** Must be 'CURRENCY_AMOUNT' for a monetary amount field. */
  type: "CURRENCY_AMOUNT";
}

export interface CurrencyCodeFieldConfig {
  /** Default ISO 4217 currency code if the field is not found in the document. */
  default_value?:
    | "AED"
    | "AFN"
    | "ALL"
    | "AMD"
    | "ANG"
    | "AOA"
    | "ARS"
    | "AUD"
    | "AWG"
    | "AZN"
    | "BAM"
    | "BBD"
    | "BDT"
    | "BGN"
    | "BHD"
    | "BIF"
    | "BMD"
    | "BND"
    | "BOB"
    | "BRL"
    | "BSD"
    | "BTN"
    | "BWP"
    | "BYN"
    | "BZD"
    | "CAD"
    | "CDF"
    | "CHF"
    | "CLP"
    | "CNY"
    | "COP"
    | "CRC"
    | "CUC"
    | "CUP"
    | "CVE"
    | "CZK"
    | "DJF"
    | "DKK"
    | "DOP"
    | "DZD"
    | "EGP"
    | "ERN"
    | "ETB"
    | "EUR"
    | "FJD"
    | "FKP"
    | "GBP"
    | "GEL"
    | "GHS"
    | "GIP"
    | "GMD"
    | "GNF"
    | "GTQ"
    | "GYD"
    | "HKD"
    | "HNL"
    | "HRK"
    | "HTG"
    | "HUF"
    | "IDR"
    | "ILS"
    | "INR"
    | "IQD"
    | "IRR"
    | "ISK"
    | "JMD"
    | "JOD"
    | "JPY"
    | "KES"
    | "KGS"
    | "KHR"
    | "KMF"
    | "KPW"
    | "KRW"
    | "KWD"
    | "KYD"
    | "KZT"
    | "LAK"
    | "LBP"
    | "LKR"
    | "LRD"
    | "LSL"
    | "LYD"
    | "MAD"
    | "MDL"
    | "MGA"
    | "MKD"
    | "MMK"
    | "MNT"
    | "MOP"
    | "MRU"
    | "MUR"
    | "MVR"
    | "MWK"
    | "MXN"
    | "MYR"
    | "MZN"
    | "NAD"
    | "NGN"
    | "NIO"
    | "NOK"
    | "NPR"
    | "NZD"
    | "OMR"
    | "PAB"
    | "PEN"
    | "PGK"
    | "PHP"
    | "PKR"
    | "PLN"
    | "PYG"
    | "QAR"
    | "RON"
    | "RSD"
    | "RUB"
    | "RWF"
    | "SAR"
    | "SBD"
    | "SCR"
    | "SDG"
    | "SEK"
    | "SGD"
    | "SHP"
    | "SLE"
    | "SLL"
    | "SOS"
    | "SRD"
    | "SSP"
    | "STN"
    | "SVC"
    | "SYP"
    | "SZL"
    | "THB"
    | "TJS"
    | "TMT"
    | "TND"
    | "TOP"
    | "TRY"
    | "TTD"
    | "TWD"
    | "TZS"
    | "UAH"
    | "UGX"
    | "USD"
    | "UYU"
    | "UZS"
    | "VES"
    | "VND"
    | "VUV"
    | "WST"
    | "XAF"
    | "XCD"
    | "XCG"
    | "XDR"
    | "XOF"
    | "XPF"
    | "XSU"
    | "YER"
    | "ZAR"
    | "ZMW"
    | "ZWG"
    | "ZWL";
  /** Human-readable description guiding the AI on what to extract for this field. */
  description: string;
  /** Whether this field must be present in the extraction result. Defaults to false. */
  is_required?: boolean;
  /** Unique field name used as the key in extraction results. */
  name: string;
  /** Must be 'CURRENCY_CODE' for an ISO 4217 currency code field. */
  type: "CURRENCY_CODE";
}

export interface DateFieldConfig {
  /** Whether dates in the future are accepted. */
  allow_future_dates?: boolean;
  /** Whether dates in the past are accepted. */
  allow_past_dates?: boolean;
  /** Human-readable description guiding the AI on what to extract for this field. */
  description: string;
  /** Whether this field must be present in the extraction result. Defaults to false. */
  is_required?: boolean;
  /** Unique field name used as the key in extraction results. */
  name: string;
  /** Must be 'DATE' for a date field (YYYY-MM-DD). */
  type: "DATE";
}

export interface DatetimeFieldConfig {
  /** Whether date-times in the future are accepted. */
  allow_future_dates?: boolean;
  /** Whether date-times in the past are accepted. */
  allow_past_dates?: boolean;
  /** Human-readable description guiding the AI on what to extract for this field. */
  description: string;
  /** Whether this field must be present in the extraction result. Defaults to false. */
  is_required?: boolean;
  /** Unique field name used as the key in extraction results. */
  name: string;
  /** Must be 'DATETIME' for a date-time field (ISO 8601). */
  type: "DATETIME";
}

export interface DecimalFieldConfig {
  /** Number of decimal places to round to. Must be >= 0. */
  decimal_points?: number;
  /** Default decimal value if the field is not found in the document. */
  default_value?: number;
  /** Human-readable description guiding the AI on what to extract for this field. */
  description: string;
  /** Whether this field must be present in the extraction result. Defaults to false. */
  is_required?: boolean;
  /** Maximum allowed value (inclusive). */
  max?: number;
  /** Minimum allowed value (inclusive). */
  min?: number;
  /** Unique field name used as the key in extraction results. */
  name: string;
  /** Must be 'DECIMAL' for a decimal number field. */
  type: "DECIMAL";
  /** Unit of measurement for context (e.g., 'EUR', 'mm'). */
  unit?: string;
}

export interface DenoiseOperation {
  /** Noise-reduction filter window size. Must be > 0. */
  size: number;
  /** Must be 'denoise'. */
  type: "denoise";
}

export interface Dimensions {
  /** Height in pixels. Must be >= 1. */
  height_in_px: number;
  /** Width in pixels. Must be >= 1. */
  width_in_px: number;
}

export interface DocumentGenerationRequest {
  document: {
    content: (
      | ParagraphBlock
      | HeadlineBlock
      | ImageBlock
      | TableBlock
      | GridBlock
      | ListBlock
      | TableOfContentsBlock
      | PageBreakBlock
      | SeparatorBlock
      | QrCodeBlock
      | BarcodeBlock
    )[];
    fonts?: FontDefinition[];
    footer?: (
      | ParagraphBlock
      | HeadlineBlock
      | ImageBlock
      | TableBlock
      | GridBlock
      | ListBlock
      | PageNumberBlock
      | SeparatorBlock
    )[];
    footer_distance_from_edge_in_pt?: number;
    header?: (
      | ParagraphBlock
      | HeadlineBlock
      | ImageBlock
      | TableBlock
      | GridBlock
      | ListBlock
      | PageNumberBlock
      | SeparatorBlock
    )[];
    header_distance_from_edge_in_pt?: number;
    metadata: Metadata;
    page: Page;
    styles: DocumentStyles;
  };
  format: "pdf" | "docx" | "epub" | "pptx";
  /** HTTPS URL to receive results asynchronously. If provided, returns 201 immediately. */
  webhook_url?: string;
}

export interface DocumentStyles {
  grid: GridStyle;
  headline: HeadlineStyle;
  image: ImageStyle;
  link: LinkStyle;
  list: ListStyle;
  separator: SeparatorStyle;
  table: TableStyle;
  text: TextStyle;
}

export interface DocumentToMarkdownSuccessResponse {
  /** Converted document result with name, mime_type, markdown, optional image description, and optional nested_files. */
  data: Record<string, unknown>;
  metadata?: WebsiteMetadata;
  success: true;
}

export interface EmailFieldConfig {
  /** Default email address if the field is not found in the document. */
  default_value?: string;
  /** Human-readable description guiding the AI on what to extract for this field. */
  description: string;
  /** Whether this field must be present in the extraction result. Defaults to false. */
  is_required?: boolean;
  /** Unique field name used as the key in extraction results. */
  name: string;
  /** Must be 'EMAIL' for an email address field. */
  type: "EMAIL";
}

export interface EnumFieldConfig {
  /** Default selected values if the field is not found in the document. */
  default_value?: string[];
  /** Human-readable description guiding the AI on what to extract for this field. */
  description: string;
  /** Whether this field must be present in the extraction result. Defaults to false. */
  is_required?: boolean;
  /** Maximum number of values that can be selected. Must be > 0. */
  max_selected?: number;
  /** Minimum number of values that must be selected. Must be >= 0. */
  min_selected?: number;
  /** Unique field name used as the key in extraction results. */
  name: string;
  /** Must be 'ENUM' for a field with predefined allowed values. */
  type: "ENUM";
  /** List of allowed enum values the AI can choose from. */
  values: string[];
}

export interface ErrorResponse {
  error: string;
  success: false;
}

export interface ExtendOperation {
  /** Pixels to add at the bottom. Must be >= 0. */
  bottom_in_px: number;
  /** Fill color for extended area as a 6-digit hex code (e.g., '#FF0000'). */
  hex_color: string;
  /** Pixels to add on the left. Must be >= 0. */
  left_in_px: number;
  /** Pixels to add on the right. Must be >= 0. */
  right_in_px: number;
  /** Pixels to add at the top. Must be >= 0. */
  top_in_px: number;
  /** Must be 'extend'. */
  type: "extend";
}

export interface ExtractionSchema {
  fields: (
    | TextFieldConfig
    | TextareaFieldConfig
    | IntegerFieldConfig
    | DecimalFieldConfig
    | DateFieldConfig
    | DatetimeFieldConfig
    | TimeFieldConfig
    | EnumFieldConfig
    | BooleanFieldConfig
    | EmailFieldConfig
    | IbanFieldConfig
    | CountryFieldConfig
    | CurrencyCodeFieldConfig
    | CurrencyAmountFieldConfig
    | AddressFieldConfig
    | ArrayFieldConfig
    | CalculatedFieldConfig
  )[];
}

export interface FetchOptions {
  /** Optional website authentication. Supports bearer, basic, and custom_header auth. Secret values are never returned in metadata. */
  auth?: Record<string, unknown>;
  /** Optional custom request headers sent to the target website. Unsafe hop-by-hop, cookie, and browser-controlled headers are rejected. */
  headers?: Record<string, unknown>;
  /** BCP 47 locale tag sent as Accept-Language header (e.g., "en-US", "de-DE", "fr"). */
  locale?: string;
  /** When true, render the page in Chromium before extracting content. */
  should_render_javascript?: boolean;
  /** Maximum fetch timeout in milliseconds. Must be between 1000 and 60000. */
  timeout_ms?: number;
  /** Custom User-Agent header string (1–500 characters). */
  user_agent?: string;
}

export interface FileInput {
  /** Base64-encoded file content. Required when type is 'base64'. */
  base64?: Uint8Array;
  fetch_options?: FetchOptions;
  /** Optional file name including extension (e.g., 'invoice.pdf'). Used for format detection for direct files. */
  name?: string;
  /** Input type: 'base64' for inline Base64-encoded data, 'url' for a remote file URL. */
  type: "base64" | "url";
  /** URL to fetch the file from. Required when type is 'url'. */
  url?: string;
}

export interface FlipOperation {
  /** Must be 'flip'. Mirrors the image vertically (top to bottom). */
  type: "flip";
}

export interface FlopOperation {
  /** Must be 'flop'. Mirrors the image horizontally (left to right). */
  type: "flop";
}

export interface FontDefinition {
  file: FileInput;
  /** Font family name to reference in text layers. */
  name: string;
  /** Font style: 'normal' or 'italic'. */
  style: "normal" | "italic";
  /** Font weight identifier (e.g., 'regular', 'bold'). */
  weight: string;
}

export interface GammaOperation {
  /** Gamma correction factor. Must be > 0. Values < 1 darken, > 1 brighten. */
  gamma: number;
  /** Must be 'gamma'. */
  type: "gamma";
}

export interface GradientColorStop {
  /** Color at this gradient stop as a 6-digit hex code. */
  hex_color: string;
  /** Position along the gradient from 0 (start) to 100 (end). */
  position: number;
}

export interface GradientLayer {
  /** Direction angle for linear gradients, in degrees. Defaults to 0. */
  angle_in_degrees?: number;
  /** Bottom-left corner radius in pixels. */
  border_bottom_left_radius?: number;
  /** Bottom-right corner radius in pixels. */
  border_bottom_right_radius?: number;
  /** Uniform border radius in pixels. Cannot be combined with per-corner radii. */
  border_radius?: number;
  /** Top-left corner radius in pixels. */
  border_top_left_radius?: number;
  /** Top-right corner radius in pixels. */
  border_top_right_radius?: number;
  colors: GradientColorStop[];
  dimensions: Dimensions;
  /** Gradient type: 'linear' or 'radial'. */
  gradient_type: "linear" | "radial";
  /** Z-order index of this layer. Must be >= 0. */
  index: number;
  /** Layer opacity from 0 (transparent) to 100 (opaque). Defaults to 100. */
  opacity?: number;
  position: Position;
  /** Rotation angle in degrees, from -180 to 180. */
  rotation_in_degrees?: number;
  /** Must be 'gradient'. */
  type: "gradient";
}

export interface GrayscaleOperation {
  /** Must be 'grayscale'. Converts the image to grayscale. */
  type: "grayscale";
}

export interface GridBlock {
  columns: GridColumn[];
  /** Horizontal alignment of grid content. */
  horizontal_alignment?: "left" | "center" | "right";
  styles?: GridStyleOverrides;
  /** Must be 'grid'. */
  type: "grid";
  /** Vertical alignment of grid content. */
  vertical_alignment?: "top" | "center" | "bottom";
}

export interface GridColumn {
  /** Content blocks rendered inside this column. */
  blocks: (
    | ParagraphBlock
    | HeadlineBlock
    | ImageBlock
    | TableBlock
    | GridBlock
    | ListBlock
    | TableOfContentsBlock
    | PageBreakBlock
    | SeparatorBlock
    | QrCodeBlock
    | BarcodeBlock
  )[];
  /** Number of grid columns this column spans, from 1 to 12. */
  column_span: number;
  /** Horizontal alignment of content within this column. */
  horizontal_alignment?: "left" | "center" | "right";
  /** Vertical alignment of content within this column. */
  vertical_alignment?: "top" | "center" | "bottom";
}

export interface GridStyle {
  /** Grid background color as a 6-digit hex code. */
  background_color: string;
  /** Grid border color as a 6-digit hex code. */
  border_color: string;
  /** Border width in points. Must be >= 0. */
  border_width_in_pt: number;
  /** Gap between columns in points. Must be >= 0. */
  gap_in_pt: number;
}

export interface GridStyleOverrides {
  /** Override grid background color. */
  background_color?: string;
  /** Override grid border color. */
  border_color?: string;
  /** Override border width in points. */
  border_width_in_pt?: number;
  /** Override gap between columns in points. */
  gap_in_pt?: number;
}

export interface HeadlineBlock {
  /** Headline level from h1 (largest) to h6 (smallest). */
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  styles?: HeadlineStyleOverrides;
  table_of_contents?: HeadlineTableOfContents;
  /** Headline text content. Must not be empty. */
  text: string;
  /** Must be 'headline'. */
  type: "headline";
}

export interface HeadlineStyle {
  /** Headline text color as a 6-digit hex code. */
  color: string;
  /** Font family name for headlines. */
  font_family: string;
  /** Font size in points. Must be >= 1. */
  font_size_in_pt: number;
  /** Font weight. Defaults to 'bold'. */
  font_weight?: string;
  /** Whether headlines are italic. Defaults to false. */
  is_italic?: boolean;
  /** Space after the headline in points. */
  spacing_after_in_pt: number;
  /** Space before the headline in points. */
  spacing_before_in_pt: number;
}

export interface HeadlineStyleOverrides {
  /** Override headline text color. */
  color?: string;
  /** Override font family name. */
  font_family?: string;
  /** Override font size in points. */
  font_size_in_pt?: number;
  /** Override font weight. */
  font_weight?: string;
  /** Override italic style. */
  is_italic?: boolean;
  /** Override space after the headline. */
  spacing_after_in_pt?: number;
  /** Override space before the headline. */
  spacing_before_in_pt?: number;
}

export interface HeadlineTableOfContents {
  /** Whether to include this headline in the table of contents. */
  is_included?: boolean;
  /** Custom label to show in the table of contents instead of the headline text. */
  label_override?: string;
  /** Override the headline level in the table of contents. */
  level_override?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export interface IbanFieldConfig {
  /** Default IBAN value if the field is not found in the document. */
  default_value?: string;
  /** Human-readable description guiding the AI on what to extract for this field. */
  description: string;
  /** Whether this field must be present in the extraction result. Defaults to false. */
  is_required?: boolean;
  /** Unique field name used as the key in extraction results. */
  name: string;
  /** Must be 'IBAN' for an International Bank Account Number field. */
  type: "IBAN";
}

export interface ImageBlock {
  /** Base64-encoded image content. */
  buffer: Uint8Array;
  /** How the image fits the specified dimensions. */
  fit?: "cover" | "contain";
  /** Image height in points. Must be >= 1. */
  height_in_pt: number;
  styles?: ImageStyleOverrides;
  /** Must be 'image'. */
  type: "image";
  /** Image width in points. Must be >= 1. */
  width_in_pt: number;
}

export interface ImageComposition {
  dimensions: Dimensions;
  fonts?: FontDefinition[];
  layers: (
    | SolidColorLayer
    | TextLayer
    | ImageLayer
    | QrCodeLayer
    | BarcodeLayer
    | GradientLayer
    | LayoutLayer
  )[];
  output_format?: "png" | "jpeg" | "webp" | "tiff" | "gif" | "avif";
  /** HTTPS URL to receive results asynchronously. If provided, returns 201 immediately. */
  webhook_url?: string;
}

export interface ImageLayer {
  /** Bottom-left corner radius in pixels. */
  border_bottom_left_radius?: number;
  /** Bottom-right corner radius in pixels. */
  border_bottom_right_radius?: number;
  /** Uniform border radius in pixels. Cannot be combined with per-corner radii. */
  border_radius?: number;
  /** Top-left corner radius in pixels. */
  border_top_left_radius?: number;
  /** Top-right corner radius in pixels. */
  border_top_right_radius?: number;
  dimensions?: Dimensions;
  file: FileInput;
  /** Z-order index of this layer. Must be >= 0. */
  index: number;
  /** Layer opacity from 0 (transparent) to 100 (opaque). Defaults to 100. */
  opacity?: number;
  position?: Position;
  /** Rotation angle in degrees, from -180 to 180. */
  rotation_in_degrees?: number;
  /** Whether to remove the image background. Defaults to false. */
  should_remove_background?: boolean;
  /** Whether to auto-crop to the most interesting region. Defaults to false. */
  should_use_smart_cropping?: boolean;
  /** Must be 'image'. */
  type: "image";
}

export interface ImageStyle {
  /** Image border color as a 6-digit hex code. */
  border_color: string;
  /** Image border width in points. Must be >= 0. */
  border_width_in_pt: number;
}

export interface ImageStyleOverrides {
  /** Override image border color. */
  border_color?: string;
  /** Override image border width in points. */
  border_width_in_pt?: number;
}

export interface InnerBorderStyle {
  horizontal: BorderStyle;
  vertical: BorderStyle;
}

export interface InnerBorderStyleOverrides {
  horizontal?: BorderStyleOverrides;
  vertical?: BorderStyleOverrides;
}

export interface IntegerFieldConfig {
  /** Default integer value if the field is not found in the document. */
  default_value?: number;
  /** Human-readable description guiding the AI on what to extract for this field. */
  description: string;
  /** Whether this field must be present in the extraction result. Defaults to false. */
  is_required?: boolean;
  /** Maximum allowed value (inclusive). */
  max?: number;
  /** Minimum allowed value (inclusive). */
  min?: number;
  /** Unique field name used as the key in extraction results. */
  name: string;
  /** Must be 'INTEGER' for a whole-number field. */
  type: "INTEGER";
  /** Unit of measurement for context (e.g., 'kg', 'pcs'). */
  unit?: string;
}

export interface InvertColorsOperation {
  /** Must be 'invert_colors'. Inverts all color channels. */
  type: "invert_colors";
}

export interface LayoutLayer {
  /** Background color as a 6-digit hex code. */
  background_color?: string;
  /** Layers rendered behind the main content as a background. */
  background_layers?: (
    | SolidColorLayer
    | TextLayer
    | ImageLayer
    | QrCodeLayer
    | BarcodeLayer
    | GradientLayer
    | LayoutLayer
  )[];
  /** Bottom-left corner radius in pixels. */
  border_bottom_left_radius?: number;
  /** Bottom-right corner radius in pixels. */
  border_bottom_right_radius?: number;
  /** Uniform border radius in pixels. Cannot be combined with per-corner radii. */
  border_radius?: number;
  /** Top-left corner radius in pixels. */
  border_top_left_radius?: number;
  /** Top-right corner radius in pixels. */
  border_top_right_radius?: number;
  dimensions?: Dimensions;
  /** Layout direction for child layers. Defaults to 'horizontal'. */
  direction?: "horizontal" | "vertical";
  /** Spacing between child layers in pixels. Defaults to 0. */
  gap?: number;
  /** Horizontal alignment of children: 'start', 'center', or 'end'. Defaults to 'start'. */
  horizontal_alignment?: "start" | "center" | "end";
  /** Z-order index of this layer. Must be >= 0. */
  index: number;
  /** Child layers arranged according to the layout direction. */
  layers: (
    | SolidColorLayer
    | TextLayer
    | ImageLayer
    | QrCodeLayer
    | BarcodeLayer
    | GradientLayer
    | LayoutLayer
  )[];
  /** Layer opacity from 0 (transparent) to 100 (opaque). Defaults to 100. */
  opacity?: number;
  /** Uniform padding in pixels on all sides. */
  padding?: number;
  /** Bottom padding in pixels. */
  padding_bottom?: number;
  /** Left padding in pixels. */
  padding_left?: number;
  /** Right padding in pixels. */
  padding_right?: number;
  /** Top padding in pixels. */
  padding_top?: number;
  position?: Position;
  /** Must be 'layout'. */
  type: "layout";
  /** Vertical alignment of children: 'start', 'center', or 'end'. Defaults to 'start'. */
  vertical_alignment?: "start" | "center" | "end";
}

export interface LinkStyle {
  /** Link text color as a 6-digit hex code. */
  color: string;
  /** Whether links are underlined. Defaults to true. */
  is_underlined?: boolean;
}

export interface ListBlock {
  items: ListItem[];
  styles?: ListStyleOverrides;
  /** Must be 'list'. */
  type: "list";
  /** List variant: 'ordered' (numbered) or 'unordered' (bulleted). */
  variant: "ordered" | "unordered";
}

export interface ListItem {
  /** List item text content. Must not be empty. */
  text: string;
}

export interface ListStyle {
  /** Bullet or number color as a 6-digit hex code. */
  marker_color: string;
  /** Gap between marker and text in points. */
  marker_gap_in_pt: number;
  text_style: TextStyle;
}

export interface ListStyleOverrides {
  /** Override bullet or number color. */
  marker_color?: string;
  /** Override gap between marker and text. */
  marker_gap_in_pt?: number;
  text_style?: TextStyleOverrides;
}

export interface Margins {
  /** Bottom margin in points. Must be >= 0. */
  bottom_in_pt: number;
  /** Left margin in points. Must be >= 0. */
  left_in_pt: number;
  /** Right margin in points. Must be >= 0. */
  right_in_pt: number;
  /** Top margin in points. Must be >= 0. */
  top_in_pt: number;
}

export interface Metadata {
  /** Document author name. */
  author?: string;
  /** BCP 47 language tag (e.g., 'en', 'de'). Defaults to 'en'. */
  language?: string;
  /** Document title. Must not be empty. */
  title: string;
}

export interface ModulateOperation {
  /** Brightness multiplier. 1.0 is unchanged, > 1.0 brightens, < 1.0 darkens. */
  brightness?: number;
  /** Hue rotation in degrees. */
  hue?: number;
  /** Saturation multiplier. 1.0 is unchanged, 0.0 is fully desaturated. */
  saturation?: number;
  /** Must be 'modulate'. */
  type: "modulate";
}

export interface OpacityOperation {
  /** Opacity percentage from 0 (fully transparent) to 100 (fully opaque). */
  opacity_in_percent: number;
  /** Must be 'opacity'. */
  type: "opacity";
}

export interface OuterBorderStyle {
  bottom: BorderStyle;
  left: BorderStyle;
  right: BorderStyle;
  top: BorderStyle;
}

export interface OuterBorderStyleOverrides {
  bottom?: BorderStyleOverrides;
  left?: BorderStyleOverrides;
  right?: BorderStyleOverrides;
  top?: BorderStyleOverrides;
}

export interface Page {
  /** Page background color as a 6-digit hex code. */
  background_color?: string;
  margins: Margins;
  size: PageSize;
}

export interface PageBreakBlock {
  /** Must be 'page-break'. Forces a page break. */
  type: "page-break";
}

export interface PageNumberBlock {
  styles?: TextStyleOverrides;
  /** Text alignment for the page number. */
  text_alignment?: "left" | "center" | "right" | "justify";
  /** Must be 'page-number'. Renders the current page number. */
  type: "page-number";
}

export interface PageSize {
  /** Custom page height in points. Must be >= 1. */
  height_in_pt?: number;
  /** Standard page size preset name. */
  preset?:
    | "A0"
    | "A1"
    | "A2"
    | "A3"
    | "A4"
    | "A5"
    | "A6"
    | "B0"
    | "B1"
    | "B2"
    | "B3"
    | "B4"
    | "B5"
    | "B6"
    | "Letter"
    | "Legal"
    | "Tabloid"
    | "Executive"
    | "Statement";
  /** Custom page width in points. Must be >= 1. */
  width_in_pt?: number;
}

export interface ParagraphBlock {
  /** Markdown text content. Alternative to runs. */
  markdown?: string;
  runs?: ParagraphRun[];
  styles?: TextStyleOverrides;
  /** Text alignment within the paragraph. */
  text_alignment?: "left" | "center" | "right" | "justify";
  /** Must be 'paragraph'. */
  type: "paragraph";
}

export interface ParagraphRun {
  /** Font weight override for this run. */
  font_weight?: string;
  /** Whether this run is italic. */
  is_italic?: boolean;
  /** URL to make this run a clickable link. */
  link_url?: string;
  /** Text content of the run. Must not be empty. */
  text: string;
}

export interface Position {
  /** Horizontal position in pixels from the left edge. Must be >= 0. */
  x_in_px: number;
  /** Vertical position in pixels from the top edge. Must be >= 0. */
  y_in_px: number;
}

export interface QrCodeBlock {
  /** Background color as a 6-digit hex code. */
  bg_hex_color?: string;
  /** Foreground color as a 6-digit hex code. */
  fg_hex_color?: string;
  /** QR code height in points. Must be >= 1. */
  height_in_pt: number;
  /** Must be 'qr-code'. */
  type: "qr-code";
  /** Data to encode in the QR code. */
  value: string;
  /** QR code width in points. Must be >= 1. */
  width_in_pt: number;
}

export interface QrCodeLayer {
  /** QR code background color as a 6-digit hex code. */
  background_hex_color: string;
  dimensions: Dimensions;
  /** QR code foreground color as a 6-digit hex code. */
  foreground_hex_color: string;
  /** Z-order index of this layer. Must be >= 0. */
  index: number;
  /** Layer opacity from 0 (transparent) to 100 (opaque). Defaults to 100. */
  opacity?: number;
  position: Position;
  /** Rotation angle in degrees, from -180 to 180. */
  rotation_in_degrees?: number;
  /** Must be 'qr-code'. */
  type: "qr-code";
  /** Data to encode in the QR code. */
  value: string;
}

export interface RemoveBackgroundOperation {
  /** Optional replacement background color as a 6-digit hex code. */
  background_hex_color?: string;
  /** Must be 'remove_background'. */
  type: "remove_background";
}

export interface RemoveTransparencyOperation {
  /** Background color to replace transparent areas, as a 6-digit hex code. */
  hex_color: string;
  /** Must be 'remove_transparency'. */
  type: "remove_transparency";
}

export interface ResizeOperation {
  /** How the image fits the target dimensions. */
  fit: "cover" | "contain" | "fill" | "inside" | "outside";
  /** Target height in pixels. Must be > 0. */
  height_in_px: number;
  /** Must be 'resize'. */
  type: "resize";
  /** Target width in pixels. Must be > 0. */
  width_in_px: number;
}

export interface RotateOperation {
  /** Rotation angle in degrees. Positive rotates clockwise. */
  angle_in_degrees: number;
  /** Background fill color for uncovered areas after rotation, as a 6-digit hex code. */
  hex_color?: string;
  /** Must be 'rotate'. */
  type: "rotate";
}

export interface SeparatorBlock {
  styles?: SeparatorStyleOverrides;
  /** Must be 'separator'. Renders a horizontal line. */
  type: "separator";
}

export interface SeparatorStyle {
  /** Separator line color as a 6-digit hex code. */
  color: string;
  /** Space after the separator in points. */
  spacing_after_in_pt: number;
  /** Space before the separator in points. */
  spacing_before_in_pt: number;
  /** Line thickness in points. Must be >= 0. */
  thickness_in_pt: number;
}

export interface SeparatorStyleOverrides {
  /** Override separator color. */
  color?: string;
  /** Override space after the separator. */
  spacing_after_in_pt?: number;
  /** Override space before the separator. */
  spacing_before_in_pt?: number;
  /** Override line thickness in points. */
  thickness_in_pt?: number;
}

export interface SharpenOperation {
  /** Sharpening sigma. Must be > 0. Higher values sharpen more. */
  sigma: number;
  /** Must be 'sharpen'. */
  type: "sharpen";
}

export interface SheetGenerationRequest {
  fonts?: FontDefinition[];
  format: "csv" | "markdown" | "xlsx";
  sheets: {
    columns: Column[];
    /** Sheet name (default: Sheet1) */
    name?: string;
    /** Positional array of rows. Each row is an array of cells matching column order. */
    rows?: (
      | {
          /** ISO 4217 currency code (default: USD). Used with currency format. */
          currency_code?: string;
          /** Excel date format code (e.g., dd/mm/yyyy, yyyy-mm-dd hh:mm:ss). Used with date, datetime, time formats. */
          date_style?: string;
          format?:
            | "text"
            | "number"
            | "decimal"
            | "currency"
            | "percentage"
            | "date"
            | "datetime"
            | "time"
            | "custom";
          /** Start column for column span */
          from_col?: number;
          /** Start row for row span */
          from_row?: number;
          /** Number separator style (default: comma_period). Used with number, decimal, currency formats. */
          number_style?: "comma_period" | "period_comma" | "space_comma" | "space_period";
          styles?: CellStyle;
          /** End column for column span */
          to_col?: number;
          /** End row for row span */
          to_row?: number;
          /** Cell value. Strings starting with = are treated as formulas. */
          value?: unknown;
        }
      | string
      | number
      | boolean
      | null
    )[][];
  }[];
  styles?: SheetStyles;
  /** HTTPS URL to receive results asynchronously. If provided, returns 201 immediately. */
  webhook_url?: string;
}

export interface SheetStyles {
  body?: CellStyle;
  header?: CellStyle;
}

export interface SmartCropOperation {
  /** Target crop height in pixels. Must be > 0. */
  height_in_px: number;
  /** Must be 'smart_crop'. Crops to the most interesting region. */
  type: "smart_crop";
  /** Target crop width in pixels. Must be > 0. */
  width_in_px: number;
}

export interface SolidColorLayer {
  angled_edges?: AngledEdge[];
  /** Bottom-left corner radius in pixels. */
  border_bottom_left_radius?: number;
  /** Bottom-right corner radius in pixels. */
  border_bottom_right_radius?: number;
  /** Uniform border radius in pixels. Cannot be combined with per-corner radii. */
  border_radius?: number;
  /** Top-left corner radius in pixels. */
  border_top_left_radius?: number;
  /** Top-right corner radius in pixels. */
  border_top_right_radius?: number;
  dimensions?: Dimensions;
  /** Fill color as a 6-digit hex code. */
  hex_color: string;
  /** Z-order index of this layer. Must be >= 0. */
  index: number;
  /** Layer opacity from 0 (transparent) to 100 (opaque). Defaults to 100. */
  opacity?: number;
  position?: Position;
  /** Rotation angle in degrees, from -180 to 180. */
  rotation_in_degrees?: number;
  /** Must be 'solid-color'. */
  type: "solid-color";
}

export interface SuccessResponse {
  /** Result data. For binary APIs (image/document generation, image transformation): contains `buffer` (base64) and `mime_type`. For document extraction: contains extracted fields. */
  data: Record<string, unknown>;
  success: true;
}

export interface TableBlock {
  /** Relative column widths in percent. Each value must be >= 1. */
  column_widths_in_percent?: number[];
  header?: TableRow;
  rows: TableRow[];
  styles?: TableStyleOverrides;
  /** Must be 'table'. */
  type: "table";
}

export interface TableBodyStyle {
  /** Table body background color. */
  background_color: string;
  /** Body text font size in points. Must be >= 1. */
  font_size_in_pt: number;
  /** Table body text color. */
  text_color: string;
}

export interface TableBodyStyleOverrides {
  /** Override body background color. */
  background_color?: string;
  /** Override body font size in points. */
  font_size_in_pt?: number;
  /** Override body text color. */
  text_color?: string;
}

export interface TableBorderStyle {
  inner: InnerBorderStyle;
  outer: OuterBorderStyle;
}

export interface TableBorderStyleOverrides {
  inner?: InnerBorderStyleOverrides;
  outer?: OuterBorderStyleOverrides;
}

export interface TableCell {
  /** Number of columns this cell spans. Must be >= 1. */
  column_span?: number;
  /** Text alignment within the cell. */
  horizontal_alignment?: "left" | "center" | "right";
  /** Number of rows this cell spans. Must be >= 1. */
  row_span?: number;
  styles?: TableCellStyle;
  /** Cell text content. Must not be empty. */
  text: string;
}

export interface TableCellStyle {
  /** Cell background color. */
  background_color?: string;
  /** Cell font size in points. */
  font_size_in_pt?: number;
  /** Cell font weight. */
  font_weight?: string;
  /** Whether cell text is italic. */
  is_italic?: boolean;
  /** Cell text color. */
  text_color?: string;
}

export interface TableHeaderStyle {
  /** Header row background color. */
  background_color: string;
  /** Header font size in points. */
  font_size_in_pt: number;
  /** Header font weight. Defaults to 'bold'. */
  font_weight?: string;
  /** Header row text color. */
  text_color: string;
}

export interface TableHeaderStyleOverrides {
  /** Override header background color. */
  background_color?: string;
  /** Override header font size. */
  font_size_in_pt?: number;
  /** Override header font weight. */
  font_weight?: string;
  /** Override header text color. */
  text_color?: string;
}

export interface TableOfContentsBlock {
  /** Leader style between entry and page number. */
  leader: "dots" | "none";
  /** Headline levels to include in the table of contents. */
  levels: ("h1" | "h2" | "h3" | "h4" | "h5" | "h6")[];
  styles?: TextStyleOverrides;
  /** Text alignment for table of contents entries. */
  text_alignment?: "left" | "center" | "right" | "justify";
  /** Must be 'table-of-contents'. */
  type: "table-of-contents";
}

export interface TableRow {
  cells: TableCell[];
}

export interface TableStyle {
  body: TableBodyStyle;
  border: TableBorderStyle;
  header: TableHeaderStyle;
}

export interface TableStyleOverrides {
  body?: TableBodyStyleOverrides;
  border?: TableBorderStyleOverrides;
  header?: TableHeaderStyleOverrides;
}

export interface TextFieldConfig {
  /** Default value if the field is not found in the document. */
  default_value?: string;
  /** Human-readable description guiding the AI on what to extract for this field. */
  description: string;
  /** Whether this field must be present in the extraction result. Defaults to false. */
  is_required?: boolean;
  /** Maximum character length for the extracted text. Must be > 0. */
  max_length?: number;
  /** Unique field name used as the key in extraction results. */
  name: string;
  /** Must be 'TEXT' for a single-line text field. */
  type: "TEXT";
}

export interface TextLayer {
  dimensions: Dimensions;
  /** Font family name to use for rendering. */
  font_name: string;
  /** Font size in pixels. Must be > 0. */
  font_size_in_px: number;
  /** Font style: 'normal' or 'italic'. Defaults to 'normal'. */
  font_style?: "normal" | "italic";
  /** Font weight. Defaults to 'regular'. */
  font_weight?: string;
  /** Z-order index of this layer. Must be >= 0. */
  index: number;
  /** Whether to wrap text across multiple lines. Defaults to true. */
  is_splitting_lines?: boolean;
  /** Layer opacity from 0 (transparent) to 100 (opaque). Defaults to 100. */
  opacity?: number;
  /** Extra spacing between paragraphs in pixels. */
  paragraph_spacing_in_px?: number;
  position: Position;
  /** Rotation angle in degrees, from -180 to 180. */
  rotation_in_degrees?: number;
  /** Whether to auto-scale the font to fit the layer dimensions. Defaults to false. */
  should_auto_scale?: boolean;
  /** Text content to render. Must not be empty. */
  text: string;
  /** Horizontal text alignment within the layer. Defaults to 'left'. */
  text_align?: "left" | "center" | "right";
  /** Text color as a 6-digit hex code. */
  text_color: string;
  /** Must be 'text'. */
  type: "text";
  /** Vertical text alignment within the layer. Defaults to 'top'. */
  vertical_align?: "top" | "center" | "bottom";
}

export interface TextStyle {
  /** Text color as a 6-digit hex code. */
  color: string;
  /** Font family name for body text. */
  font_family: string;
  /** Font size in points. Must be >= 1. */
  font_size_in_pt: number;
  /** Font weight. Defaults to 'regular'. */
  font_weight?: string;
  /** Whether text is italic. Defaults to false. */
  is_italic?: boolean;
  /** Line height multiplier. Must be >= 0.5. */
  line_height: number;
}

export interface TextStyleOverrides {
  /** Override text color. */
  color?: string;
  /** Override font family name. */
  font_family?: string;
  /** Override font size in points. */
  font_size_in_pt?: number;
  /** Override font weight. */
  font_weight?: string;
  /** Override italic style. */
  is_italic?: boolean;
  /** Override line height multiplier. */
  line_height?: number;
}

export interface TextareaFieldConfig {
  /** Default value if the field is not found in the document. */
  default_value?: string;
  /** Human-readable description guiding the AI on what to extract for this field. */
  description: string;
  /** Whether this field must be present in the extraction result. Defaults to false. */
  is_required?: boolean;
  /** Maximum character length for the extracted text. Must be > 0. */
  max_length?: number;
  /** Unique field name used as the key in extraction results. */
  name: string;
  /** Must be 'TEXTAREA' for a multi-line text field. */
  type: "TEXTAREA";
}

export interface ThresholdOperation {
  /** Whether to convert to grayscale before applying the threshold. */
  is_grayscale: boolean;
  /** Must be 'threshold'. */
  type: "threshold";
  /** Threshold value from 0 to 255. Pixels above become white, below become black. */
  value: number;
}

export interface TimeFieldConfig {
  /** Human-readable description guiding the AI on what to extract for this field. */
  description: string;
  /** Whether this field must be present in the extraction result. Defaults to false. */
  is_required?: boolean;
  /** Unique field name used as the key in extraction results. */
  name: string;
  /** Must be 'TIME' for a time field (HH:MM:SS). */
  type: "TIME";
}

export interface TintOperation {
  /** Tint color as a 6-digit hex code (e.g., '#FF0000'). */
  hex_color: string;
  /** Must be 'tint'. */
  type: "tint";
}

export type TransformOperation =
  | ResizeOperation
  | CropOperation
  | ExtendOperation
  | TrimOperation
  | RotateOperation
  | FlipOperation
  | FlopOperation
  | BlurOperation
  | SharpenOperation
  | ModulateOperation
  | TintOperation
  | GrayscaleOperation
  | InvertColorsOperation
  | AutoContrastOperation
  | GammaOperation
  | RemoveTransparencyOperation
  | ThresholdOperation
  | DenoiseOperation
  | OpacityOperation
  | ConvertOperation
  | UpscaleOperation
  | SmartCropOperation
  | CompressToSizeOperation
  | RemoveBackgroundOperation;

export interface TrimOperation {
  /** Color difference threshold for trimming. Must be >= 0. Lower is stricter. */
  threshold: number;
  /** Must be 'trim'. Removes uniform borders from the image. */
  type: "trim";
}

export interface UpscaleOperation {
  /** Upscale multiplier. Allowed values: 2, 3, or 4. */
  factor: 2 | 3 | 4;
  /** Must be 'upscale'. */
  type: "upscale";
}

export interface UrlFileInput {
  fetch_options?: FetchOptions;
  /** Optional file name including extension (e.g., 'report.pdf'). Used for format detection when fetching direct files. */
  name?: string;
  /** Must be 'url' for remote file input. */
  type: "url";
  /** URL to fetch the file from. */
  url: string;
}

export interface WebsiteExtractionRequest {
  file: UrlFileInput;
  schema: ExtractionSchema;
  /** HTTPS URL to receive results asynchronously. If provided, returns 201 immediately. */
  webhook_url?: string;
}

export interface WebsiteExtractionSuccessResponse {
  /** Extracted fields keyed by requested field name. */
  data: Record<string, unknown>;
  metadata: WebsiteMetadata;
  success: true;
}

export interface WebsiteMetadata {
  article?: Record<string, unknown>;
  assets?: Record<string, unknown>[];
  body_size?: number;
  content_type?: string | null;
  dublin_core?: Record<string, unknown>;
  favicons?: Record<string, unknown>[];
  feeds?: Record<string, unknown>[];
  final_url: string;
  headings?: Record<string, unknown>[];
  hreflang?: Record<string, unknown>[];
  images?: Record<string, unknown>[];
  json_ld?: Record<string, unknown>[];
  links?: Record<string, unknown>[];
  meta_refresh_url?: string | null;
  nofollow_detected?: boolean;
  noindex_detected?: boolean;
  open_graph?: Record<string, unknown>;
  page?: Record<string, unknown>;
  page_count: number;
  requested_url: string;
  response_meta?: Record<string, unknown>;
  status_code?: number;
  twitter?: Record<string, unknown>;
  word_count?: number;
}

export interface ExtractDocumentRequest {
  files: FileInput[];
  schema: ExtractionSchema;
  /** HTTPS URL to receive results asynchronously. If provided, returns 201 immediately. */
  webhook_url?: string;
}

export interface ExtractDocumentAsyncRequest extends ExtractDocumentRequest {
  webhook_url: string;
}

export interface GenerateDocumentRequestDocument {
  content: (
    | ParagraphBlock
    | HeadlineBlock
    | ImageBlock
    | TableBlock
    | GridBlock
    | ListBlock
    | TableOfContentsBlock
    | PageBreakBlock
    | SeparatorBlock
    | QrCodeBlock
    | BarcodeBlock
  )[];
  fonts?: FontDefinition[];
  footer?: (
    | ParagraphBlock
    | HeadlineBlock
    | ImageBlock
    | TableBlock
    | GridBlock
    | ListBlock
    | PageNumberBlock
    | SeparatorBlock
  )[];
  footer_distance_from_edge_in_pt?: number;
  header?: (
    | ParagraphBlock
    | HeadlineBlock
    | ImageBlock
    | TableBlock
    | GridBlock
    | ListBlock
    | PageNumberBlock
    | SeparatorBlock
  )[];
  header_distance_from_edge_in_pt?: number;
  metadata: Metadata;
  page: Page;
  styles: DocumentStyles;
}

export interface GenerateDocumentRequest {
  format: "pdf" | "docx" | "epub" | "pptx";
  /** HTTPS URL to receive results asynchronously. If provided, returns 201 immediately. */
  webhook_url?: string;
  document: GenerateDocumentRequestDocument;
}

export interface GenerateDocumentAsyncRequest extends GenerateDocumentRequest {
  webhook_url: string;
}

export interface ConvertDocumentToMarkdownRequest {
  file: FileInput;
  /** HTTPS URL to receive results asynchronously. If provided, returns 201 immediately. */
  webhook_url?: string;
}

export interface ConvertDocumentToMarkdownAsyncRequest extends ConvertDocumentToMarkdownRequest {
  webhook_url: string;
}

export interface GenerateImageRequest {
  dimensions: Dimensions;
  fonts?: FontDefinition[];
  layers: (
    | SolidColorLayer
    | TextLayer
    | ImageLayer
    | QrCodeLayer
    | BarcodeLayer
    | GradientLayer
    | LayoutLayer
  )[];
  output_format?: "png" | "jpeg" | "webp" | "tiff" | "gif" | "avif";
  /** HTTPS URL to receive results asynchronously. If provided, returns 201 immediately. */
  webhook_url?: string;
}

export interface GenerateImageAsyncRequest extends GenerateImageRequest {
  webhook_url: string;
}

export interface TransformImageRequest {
  file: FileInput;
  operations: TransformOperation[];
  /** HTTPS URL to receive results asynchronously. If provided, returns 201 immediately. */
  webhook_url?: string;
}

export interface TransformImageAsyncRequest extends TransformImageRequest {
  webhook_url: string;
}

export interface GenerateSheetRequestSheets {
  columns: Column[];
  /** Sheet name (default: Sheet1) */
  name?: string;
  /** Positional array of rows. Each row is an array of cells matching column order. */
  rows?: (
    | {
        /** ISO 4217 currency code (default: USD). Used with currency format. */
        currency_code?: string;
        /** Excel date format code (e.g., dd/mm/yyyy, yyyy-mm-dd hh:mm:ss). Used with date, datetime, time formats. */
        date_style?: string;
        format?:
          | "text"
          | "number"
          | "decimal"
          | "currency"
          | "percentage"
          | "date"
          | "datetime"
          | "time"
          | "custom";
        /** Start column for column span */
        from_col?: number;
        /** Start row for row span */
        from_row?: number;
        /** Number separator style (default: comma_period). Used with number, decimal, currency formats. */
        number_style?: "comma_period" | "period_comma" | "space_comma" | "space_period";
        styles?: CellStyle;
        /** End column for column span */
        to_col?: number;
        /** End row for row span */
        to_row?: number;
        /** Cell value. Strings starting with = are treated as formulas. */
        value?: unknown;
      }
    | string
    | number
    | boolean
    | null
  )[][];
}

export interface GenerateSheetRequest {
  fonts?: FontDefinition[];
  format: "csv" | "markdown" | "xlsx";
  styles?: SheetStyles;
  /** HTTPS URL to receive results asynchronously. If provided, returns 201 immediately. */
  webhook_url?: string;
  sheets: GenerateSheetRequestSheets[];
}

export interface GenerateSheetAsyncRequest extends GenerateSheetRequest {
  webhook_url: string;
}

export interface ExtractWebsiteRequest {
  file: UrlFileInput;
  schema: ExtractionSchema;
  /** HTTPS URL to receive results asynchronously. If provided, returns 201 immediately. */
  webhook_url?: string;
}

export interface ExtractWebsiteAsyncRequest extends ExtractWebsiteRequest {
  webhook_url: string;
}
