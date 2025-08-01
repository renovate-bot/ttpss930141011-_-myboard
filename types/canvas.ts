export type Color = {
  r: number
  g: number
  b: number
}

export type Camera = {
  x: number
  y: number
  zoom?: number // Optional for backward compatibility
}

export enum LayerType {
  Rectangle,
  Ellipse,
  Path,
  Text,
  Note,
  Frame,
}

export type RectangleLayer = {
  type: LayerType.Rectangle
  x: number
  y: number
  height: number
  width: number
  fill: Color
  value?: string
}

export type EllipseLayer = {
  type: LayerType.Ellipse
  x: number
  y: number
  height: number
  width: number
  fill: Color
  value?: string
}

export type PathLayer = {
  type: LayerType.Path
  x: number
  y: number
  height: number
  width: number
  fill: Color
  points: number[][]
  value?: string
}

export type TextLayer = {
  type: LayerType.Text
  x: number
  y: number
  height: number
  width: number
  fill: Color
  value?: string
}

export type NoteLayer = {
  type: LayerType.Note
  x: number
  y: number
  height: number
  width: number
  fill: Color
  value?: string
}

export type FrameLayer = {
  type: LayerType.Frame
  x: number
  y: number
  height: number
  width: number
  fill?: Color
  strokeColor?: Color
  strokeWidth?: number
  childIds: string[]
  name?: string
  locked?: boolean
}

export type Point = {
  x: number
  y: number
}

export type XYWH = {
  x: number
  y: number
  width: number
  height: number
}

export enum Side {
  Top = 1,
  Bottom = 2,
  Left = 4,
  Right = 8,
}

export type CanvasState =
  | {
      mode: CanvasMode.None
    }
  | {
      mode: CanvasMode.SelectionNet
      origin: Point
      current?: Point
    }
  | {
      mode: CanvasMode.Translating
      current: Point
      layerIds?: string[]
    }
  | {
      mode: CanvasMode.Inserting
      layerType:
        | LayerType.Ellipse
        | LayerType.Rectangle
        | LayerType.Text
        | LayerType.Note
        | LayerType.Frame
    }
  | {
      mode: CanvasMode.Pencil
    }
  | {
      mode: CanvasMode.Pressing
      origin: Point
    }
  | {
      mode: CanvasMode.Resizing
      initialBounds: XYWH
      corner: Side
    }
  | {
      mode: CanvasMode.PotentialDrag
      layerId: string
      origin: Point
      wasSelected: boolean
    }
  | {
      mode: CanvasMode.Panning
      origin: Point
      startCamera: Camera
    }

export enum CanvasMode {
  None,
  Pressing,
  SelectionNet,
  Translating,
  Inserting,
  Resizing,
  Pencil,
  PotentialDrag,
  Panning,
}

export type Layer =
  | RectangleLayer
  | EllipseLayer
  | PathLayer
  | TextLayer
  | NoteLayer
  | FrameLayer
