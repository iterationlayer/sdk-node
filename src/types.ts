// ── File Input ──────────────────────────────────────────────────────────────

export interface FileInputBase64 {
  type: "base64";
  name: string;
  base64: string;
}

export interface FileInputUrl {
  type: "url";
  name: string;
  url: string;
}

export type FileInput = FileInputBase64 | FileInputUrl;

// ── Responses ──────────────────────────────────────────────────────────────

export interface ExtractionFieldResult {
  value: unknown;
  confidence: number;
  citations: string[];
  source: string;
  type: string;
}

export type ExtractionResult = Record<string, ExtractionFieldResult>;

export interface BinaryResult {
  buffer: string;
  mime_type: string;
}

export interface AsyncResult {
  async: true;
  message: string;
}

// ── Document Extraction ────────────────────────────────────────────────────

interface FieldConfigBase {
  name: string;
  description: string;
  is_required?: boolean;
}

export interface TextFieldConfig extends FieldConfigBase {
  type: "TEXT";
  max_length?: number;
  default_value?: string;
}

export interface TextareaFieldConfig extends FieldConfigBase {
  type: "TEXTAREA";
  max_length?: number;
  default_value?: string;
}

export interface IntegerFieldConfig extends FieldConfigBase {
  type: "INTEGER";
  min?: number;
  max?: number;
  unit?: string;
  default_value?: number;
}

export interface DecimalFieldConfig extends FieldConfigBase {
  type: "DECIMAL";
  min?: number;
  max?: number;
  decimal_points?: number;
  unit?: string;
  default_value?: number;
}

export interface DateFieldConfig extends FieldConfigBase {
  type: "DATE";
  allow_future_dates?: boolean;
  allow_past_dates?: boolean;
}

export interface DatetimeFieldConfig extends FieldConfigBase {
  type: "DATETIME";
  allow_future_dates?: boolean;
  allow_past_dates?: boolean;
}

export interface TimeFieldConfig extends FieldConfigBase {
  type: "TIME";
}

export interface EnumFieldConfig extends FieldConfigBase {
  type: "ENUM";
  values: string[];
  min_selected?: number;
  max_selected?: number;
  default_value?: string[];
}

export interface BooleanFieldConfig extends FieldConfigBase {
  type: "BOOLEAN";
  default_value?: boolean;
}

export interface EmailFieldConfig extends FieldConfigBase {
  type: "EMAIL";
  default_value?: string;
}

export interface IbanFieldConfig extends FieldConfigBase {
  type: "IBAN";
  default_value?: string;
}

export interface CountryFieldConfig extends FieldConfigBase {
  type: "COUNTRY";
  default_value?: string;
}

export interface CurrencyCodeFieldConfig extends FieldConfigBase {
  type: "CURRENCY_CODE";
  default_value?: string;
}

export interface CurrencyAmountFieldConfig extends FieldConfigBase {
  type: "CURRENCY_AMOUNT";
  min?: number;
  max?: number;
  decimal_points?: number;
  default_value?: number;
}

export interface AddressFieldConfig extends FieldConfigBase {
  type: "ADDRESS";
  allowed_country_codes?: string[];
}

export interface ArrayFieldConfig extends FieldConfigBase {
  type: "ARRAY";
  item_schema: { fields: FieldConfig[] };
}

export interface CalculatedFieldConfig extends FieldConfigBase {
  type: "CALCULATED";
  operation: "sum" | "subtract" | "multiply" | "divide";
  source_field_names: string[];
  unit?: string;
}

export type FieldConfig =
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
  | CalculatedFieldConfig;

export interface ExtractRequest {
  files: FileInput[];
  schema: { fields: FieldConfig[] };
}

export interface ExtractAsyncRequest extends ExtractRequest {
  webhook_url: string;
}

// ── Image Transformation ───────────────────────────────────────────────────

export interface ResizeOperation {
  type: "resize";
  width_in_px: number;
  height_in_px: number;
  fit: "cover" | "contain" | "fill" | "inside" | "outside";
}

export interface CropOperation {
  type: "crop";
  left_in_px: number;
  top_in_px: number;
  width_in_px: number;
  height_in_px: number;
}

export interface ExtendOperation {
  type: "extend";
  top_in_px: number;
  bottom_in_px: number;
  left_in_px: number;
  right_in_px: number;
  hex_color: string;
}

export interface TrimOperation {
  type: "trim";
  threshold: number;
}

export interface RotateOperation {
  type: "rotate";
  angle_in_degrees: number;
  hex_color?: string;
}

export interface FlipOperation {
  type: "flip";
}

export interface FlopOperation {
  type: "flop";
}

export interface BlurOperation {
  type: "blur";
  sigma: number;
}

export interface SharpenOperation {
  type: "sharpen";
  sigma: number;
}

export interface ModulateOperation {
  type: "modulate";
  brightness?: number;
  saturation?: number;
  hue?: number;
}

export interface TintOperation {
  type: "tint";
  hex_color: string;
}

export interface GrayscaleOperation {
  type: "grayscale";
}

export interface InvertColorsOperation {
  type: "invert_colors";
}

export interface AutoContrastOperation {
  type: "auto_contrast";
}

export interface GammaOperation {
  type: "gamma";
  gamma: number;
}

export interface RemoveTransparencyOperation {
  type: "remove_transparency";
  hex_color: string;
}

export interface ThresholdOperation {
  type: "threshold";
  value: number;
  is_grayscale: boolean;
}

export interface DenoiseOperation {
  type: "denoise";
  size: number;
}

export interface OpacityOperation {
  type: "opacity";
  opacity_in_percent: number;
}

export interface ConvertOperation {
  type: "convert";
  format: "png" | "jpeg" | "webp" | "avif" | "heif";
  quality?: number;
}

export interface UpscaleOperation {
  type: "upscale";
  factor: 2 | 3 | 4;
}

export interface SmartCropOperation {
  type: "smart_crop";
  width_in_px: number;
  height_in_px: number;
}

export interface CompressToSizeOperation {
  type: "compress_to_size";
  max_file_size_in_bytes: number;
}

export interface RemoveBackgroundOperation {
  type: "remove_background";
  background_hex_color?: string;
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

export interface TransformRequest {
  file: FileInput;
  operations: TransformOperation[];
}

export interface TransformAsyncRequest extends TransformRequest {
  webhook_url: string;
}

// ── Image Generation ───────────────────────────────────────────────────────

export interface Dimensions {
  width: number;
  height: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface AngledEdge {
  edge: "left" | "right" | "top" | "bottom";
  angle_in_degrees: number;
}

export interface GradientColorStop {
  hex_color: string;
  position: number;
}

export interface ImageFontDefinition {
  name: string;
  weight: string;
  style: "normal" | "italic";
  file: FileInput;
}

export type ImageOutputFormat = "png" | "jpeg" | "webp" | "tiff" | "gif" | "avif";

interface LayerBase {
  index: number;
  opacity?: number;
}

export interface SolidColorLayer extends LayerBase {
  type: "solid-color";
  hex_color: string;
  position?: Position;
  dimensions?: Dimensions;
  rotation_in_degrees?: number;
  angled_edges?: AngledEdge[];
  border_radius?: number;
  border_top_left_radius?: number;
  border_top_right_radius?: number;
  border_bottom_left_radius?: number;
  border_bottom_right_radius?: number;
}

export interface TextLayer extends LayerBase {
  type: "text";
  text: string;
  font_name: string;
  font_size_in_px: number;
  text_color: string;
  position: Position;
  dimensions: Dimensions;
  font_weight?: string;
  font_style?: "normal" | "italic";
  text_align?: "left" | "center" | "right";
  vertical_align?: "top" | "center" | "bottom";
  is_splitting_lines?: boolean;
  paragraph_spacing_in_px?: number;
  should_auto_scale?: boolean;
  rotation_in_degrees?: number;
}

export interface ImageLayer extends LayerBase {
  type: "image";
  file: FileInput;
  position?: Position;
  dimensions?: Dimensions;
  rotation_in_degrees?: number;
  should_use_smart_cropping?: boolean;
  should_remove_background?: boolean;
  border_radius?: number;
  border_top_left_radius?: number;
  border_top_right_radius?: number;
  border_bottom_left_radius?: number;
  border_bottom_right_radius?: number;
}

export interface QrCodeLayer extends LayerBase {
  type: "qr-code";
  value: string;
  foreground_hex_color: string;
  background_hex_color: string;
  position: Position;
  dimensions: Dimensions;
  rotation_in_degrees?: number;
}

export interface BarcodeLayer extends LayerBase {
  type: "barcode";
  value: string;
  format: "code128" | "ean13" | "ean8" | "code39" | "itf" | "codabar";
  foreground_hex_color: string;
  background_hex_color: string;
  position: Position;
  dimensions: Dimensions;
  rotation_in_degrees?: number;
}

export interface GradientLayer extends LayerBase {
  type: "gradient";
  gradient_type: "linear" | "radial";
  colors: GradientColorStop[];
  position: Position;
  dimensions: Dimensions;
  angle_in_degrees?: number;
  rotation_in_degrees?: number;
  border_radius?: number;
  border_top_left_radius?: number;
  border_top_right_radius?: number;
  border_bottom_left_radius?: number;
  border_bottom_right_radius?: number;
}

export interface LayoutLayer extends LayerBase {
  type: "layout";
  layers: Layer[];
  direction?: "horizontal" | "vertical";
  gap?: number;
  horizontal_alignment?: "start" | "center" | "end";
  vertical_alignment?: "start" | "center" | "end";
  position?: Position;
  dimensions?: Dimensions;
  background_color?: string;
  background_layers?: Layer[];
  padding?: number;
  padding_top?: number;
  padding_right?: number;
  padding_bottom?: number;
  padding_left?: number;
  border_radius?: number;
  border_top_left_radius?: number;
  border_top_right_radius?: number;
  border_bottom_left_radius?: number;
  border_bottom_right_radius?: number;
}

export type Layer =
  | SolidColorLayer
  | TextLayer
  | ImageLayer
  | QrCodeLayer
  | BarcodeLayer
  | GradientLayer
  | LayoutLayer;

export interface GenerateImageRequest {
  dimensions: Dimensions;
  layers: Layer[];
  fonts?: ImageFontDefinition[];
  output_format?: ImageOutputFormat;
}

export interface GenerateImageAsyncRequest extends GenerateImageRequest {
  webhook_url: string;
}

// ── Document Generation ────────────────────────────────────────────────────

export type DocumentFormat = "pdf" | "docx" | "epub" | "pptx";

export type PageSizePreset =
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

export type HeadlineLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type TextAlignment = "left" | "center" | "right" | "justify";

export type HorizontalAlignment = "left" | "center" | "right";

export type VerticalAlignment = "top" | "center" | "bottom";

export type FontWeight =
  | "thin"
  | "extralight"
  | "light"
  | "regular"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold"
  | "black";

export type BarcodeFormat = "code128" | "ean13" | "ean8" | "code39" | "itf" | "codabar";

export interface DocumentMetadata {
  title: string;
  author?: string;
  language?: string;
}

export interface PageSize {
  preset?: PageSizePreset;
  width_in_pt?: number;
  height_in_pt?: number;
}

export interface Margins {
  top_in_pt: number;
  right_in_pt: number;
  bottom_in_pt: number;
  left_in_pt: number;
}

export interface DocumentPage {
  size: PageSize;
  margins: Margins;
  background_color?: string;
}

export interface DocumentFontDefinition {
  name: string;
  weight: FontWeight;
  style: "normal" | "italic";
  buffer: string;
}

export interface TextStyle {
  font_family: string;
  font_size_in_pt: number;
  line_height: number;
  color: string;
  font_weight?: string;
  is_italic?: boolean;
}

export interface HeadlineStyle {
  font_family: string;
  font_size_in_pt: number;
  color: string;
  spacing_before_in_pt: number;
  spacing_after_in_pt: number;
  font_weight?: string;
  is_italic?: boolean;
}

export interface LinkStyle {
  color: string;
  is_underlined?: boolean;
}

export interface ListStyle {
  marker_color: string;
  marker_gap_in_pt: number;
  text_style: TextStyle;
}

export interface BorderStyle {
  width_in_pt: number;
  color: string;
}

export interface TableHeaderStyle {
  background_color: string;
  text_color: string;
  font_size_in_pt: number;
  font_weight?: string;
}

export interface TableBodyStyle {
  background_color: string;
  text_color: string;
  font_size_in_pt: number;
}

export interface TableStyle {
  header: TableHeaderStyle;
  body: TableBodyStyle;
  border?: BorderStyle;
}

export interface GridStyle {
  background_color: string;
  border_color: string;
  border_width_in_pt: number;
  gap_in_pt: number;
}

export interface SeparatorStyle {
  color: string;
  thickness_in_pt: number;
  spacing_before_in_pt: number;
  spacing_after_in_pt: number;
}

export interface ImageStyle {
  border_color: string;
  border_width_in_pt: number;
}

export interface DocumentStyles {
  text: TextStyle;
  headline: HeadlineStyle;
  link: LinkStyle;
  list: ListStyle;
  table: TableStyle;
  grid: GridStyle;
  separator: SeparatorStyle;
  image: ImageStyle;
}

// Style overrides (all fields optional)

export type TextStyleOverrides = Partial<TextStyle>;
export type HeadlineStyleOverrides = Partial<HeadlineStyle>;
export type ListStyleOverrides = Partial<ListStyle>;
export type SeparatorStyleOverrides = Partial<SeparatorStyle>;
export type ImageStyleOverrides = Partial<ImageStyle>;
export type GridStyleOverrides = Partial<GridStyle>;

export interface TableHeaderStyleOverrides {
  background_color?: string;
  text_color?: string;
  font_size_in_pt?: number;
  font_weight?: string;
}

export interface TableBodyStyleOverrides {
  background_color?: string;
  text_color?: string;
  font_size_in_pt?: number;
}

export interface TableStyleOverrides {
  header?: TableHeaderStyleOverrides;
  body?: TableBodyStyleOverrides;
  border?: Partial<BorderStyle>;
}

export interface TableCellStyle {
  background_color?: string;
  text_color?: string;
  font_size_in_pt?: number;
  font_weight?: string;
  is_italic?: boolean;
}

// Content blocks

export interface ParagraphRun {
  text: string;
  font_weight?: string;
  is_italic?: boolean;
  link_url?: string;
}

export interface HeadlineTableOfContents {
  is_included?: boolean;
  label_override?: string;
  level_override?: string;
}

export interface ParagraphBlock {
  type: "paragraph";
  markdown?: string;
  text_alignment?: TextAlignment;
  runs?: ParagraphRun[];
  styles?: TextStyleOverrides;
}

export interface HeadlineBlock {
  type: "headline";
  level: HeadlineLevel;
  text: string;
  styles?: HeadlineStyleOverrides;
  table_of_contents?: HeadlineTableOfContents;
}

export interface ImageBlock {
  type: "image";
  buffer: string;
  width_in_pt: number;
  height_in_pt: number;
  fit?: "cover" | "contain";
  styles?: ImageStyleOverrides;
}

export interface TableCell {
  text: string;
  horizontal_alignment?: HorizontalAlignment;
  column_span?: number;
  row_span?: number;
  styles?: TableCellStyle;
}

export interface TableRow {
  cells: TableCell[];
}

export interface TableBlock {
  type: "table";
  rows: TableRow[];
  header?: TableRow;
  column_widths_in_percent?: number[];
  styles?: TableStyleOverrides;
}

export interface GridColumn {
  column_span: number;
  blocks: ContentBlock[];
  horizontal_alignment?: HorizontalAlignment;
  vertical_alignment?: VerticalAlignment;
}

export interface GridBlock {
  type: "grid";
  columns: GridColumn[];
  horizontal_alignment?: HorizontalAlignment;
  vertical_alignment?: VerticalAlignment;
  styles?: GridStyleOverrides;
}

export interface ListItem {
  text: string;
}

export interface ListBlock {
  type: "list";
  variant: "ordered" | "unordered";
  items: ListItem[];
  styles?: ListStyleOverrides;
}

export interface TableOfContentsBlock {
  type: "table-of-contents";
  levels: HeadlineLevel[];
  leader: "dots" | "none";
  text_alignment?: TextAlignment;
  styles?: TextStyleOverrides;
}

export interface PageBreakBlock {
  type: "page-break";
}

export interface SeparatorBlock {
  type: "separator";
  styles?: SeparatorStyleOverrides;
}

export interface DocumentQrCodeBlock {
  type: "qr-code";
  value: string;
  width_in_pt: number;
  height_in_pt: number;
  fg_hex_color?: string;
  bg_hex_color?: string;
}

export interface DocumentBarcodeBlock {
  type: "barcode";
  value: string;
  format: BarcodeFormat;
  width_in_pt: number;
  height_in_pt: number;
  fg_hex_color?: string;
  bg_hex_color?: string;
}

export type ContentBlock =
  | ParagraphBlock
  | HeadlineBlock
  | ImageBlock
  | TableBlock
  | GridBlock
  | ListBlock
  | TableOfContentsBlock
  | PageBreakBlock
  | SeparatorBlock
  | DocumentQrCodeBlock
  | DocumentBarcodeBlock;

// Header/footer blocks

export interface PageNumberBlock {
  type: "page-number";
  text_alignment?: TextAlignment;
  styles?: TextStyleOverrides;
}

export type HeaderFooterBlock =
  | ParagraphBlock
  | HeadlineBlock
  | ImageBlock
  | TableBlock
  | GridBlock
  | ListBlock
  | PageNumberBlock
  | SeparatorBlock;

export interface DocumentDefinition {
  metadata: DocumentMetadata;
  content: ContentBlock[];
  page?: DocumentPage;
  styles?: DocumentStyles;
  fonts?: DocumentFontDefinition[];
  header?: HeaderFooterBlock[];
  footer?: HeaderFooterBlock[];
  header_distance_from_edge_in_pt?: number;
  footer_distance_from_edge_in_pt?: number;
}

export interface GenerateDocumentRequest {
  format: DocumentFormat;
  document: DocumentDefinition;
}

export interface GenerateDocumentAsyncRequest extends GenerateDocumentRequest {
  webhook_url: string;
}

// Sheet Generation

export type SheetFormat = "csv" | "markdown" | "xlsx";
export type SheetCellFormat =
  | "text"
  | "number"
  | "decimal"
  | "currency"
  | "percentage"
  | "date"
  | "datetime"
  | "time"
  | "custom";
export type SheetNumberStyle = "comma_period" | "period_comma" | "space_comma" | "space_period";
export type SheetHorizontalAlignment = "left" | "center" | "right";
export type SheetFontWeight =
  | "thin"
  | "extralight"
  | "light"
  | "regular"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold"
  | "black";
export type SheetFontStyle = "normal" | "italic";

export interface SheetCellStyle {
  font_family?: string;
  font_size_in_pt?: number;
  is_bold?: boolean;
  is_italic?: boolean;
  font_color?: string;
  background_color?: string;
  horizontal_alignment?: SheetHorizontalAlignment;
  number_format?: string;
}

export interface SheetCell {
  value?: string | number | boolean | null;
  format?: SheetCellFormat;
  currency_code?: string;
  number_style?: SheetNumberStyle;
  date_style?: string;
  styles?: SheetCellStyle;
  from_col?: number;
  to_col?: number;
  from_row?: number;
  to_row?: number;
}

export interface SheetColumn {
  name: string;
  width?: number;
}

export interface Sheet {
  name?: string;
  columns: SheetColumn[];
  rows?: (SheetCell | string | number | boolean | null)[][];
}

export interface SheetStyles {
  header?: SheetCellStyle;
  body?: SheetCellStyle;
}

export interface SheetFontDefinition {
  name: string;
  weight: SheetFontWeight;
  style: SheetFontStyle;
  buffer: string;
}

export interface GenerateSheetRequest {
  format: SheetFormat;
  sheets: Sheet[];
  styles?: SheetStyles;
  fonts?: SheetFontDefinition[];
}

export interface GenerateSheetAsyncRequest extends GenerateSheetRequest {
  webhook_url: string;
}
