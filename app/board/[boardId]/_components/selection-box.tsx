'use client'

import { memo } from 'react'

import { LayerType, Side, XYWH } from '@/types/canvas'
import { useCanvasStore } from '@/stores/canvas-store'
import { useSelectionBounds } from '@/hooks/use-selection-bounds-new'

interface SelectionBoxProps {
  onResizeHandlePointerDown?: (corner: Side, initialBounds: XYWH) => void
}

const HANDLE_WIDTH = 8

export const SelectionBox = memo(
  ({ onResizeHandlePointerDown }: SelectionBoxProps) => {
    const selectedLayers = useCanvasStore(state => state.selectedLayers)
    const layers = useCanvasStore(state => state.layers)
    
    const soleLayerId = selectedLayers.length === 1 ? selectedLayers[0] : null
    const isShowingHandles = soleLayerId && layers.get(soleLayerId)?.type !== LayerType.Path

    const bounds = useSelectionBounds()

    if (!bounds) return null

    return (
      <>
        <rect
          className="fill-transparent stroke-blue-500 stroke-1 pointer-events-none"
          style={{
            transform: `translate(${bounds.x}px, ${bounds.y}px)`,
          }}
          x={0}
          y={0}
          width={bounds.width}
          height={bounds.height}
        />
        {isShowingHandles && (
          <>
            <rect
              className="fill-white stroke-1 stroke-blue-500"
              x={0}
              y={0}
              style={{
                cursor: 'nwse-resize',
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `
                translate(
                  ${bounds.x - HANDLE_WIDTH / 2}px,
                  ${bounds.y - HANDLE_WIDTH / 2}px
                )
              `,
              }}
              onPointerDown={e => {
                e.stopPropagation()
                onResizeHandlePointerDown?.(Side.Top + Side.Left, bounds)
              }}
            />
            <rect
              className="fill-white stroke-1 stroke-blue-500"
              x={0}
              y={0}
              style={{
                cursor: 'ns-resize',
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `
                translate(
                  ${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px, 
                  ${bounds.y - HANDLE_WIDTH / 2}px
                )
              `,
              }}
              onPointerDown={e => {
                e.stopPropagation()
                onResizeHandlePointerDown?.(Side.Top, bounds)
              }}
            />
            <rect
              className="fill-white stroke-1 stroke-blue-500"
              x={0}
              y={0}
              style={{
                cursor: 'nesw-resize',
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `
                translate(
                  ${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px,
                  ${bounds.y - HANDLE_WIDTH / 2}px
                )`,
              }}
              onPointerDown={e => {
                e.stopPropagation()
                onResizeHandlePointerDown?.(Side.Top + Side.Right, bounds)
              }}
            />
            <rect
              className="fill-white stroke-1 stroke-blue-500"
              x={0}
              y={0}
              style={{
                cursor: 'ew-resize',
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `
                translate(
                  ${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px, 
                  ${bounds.y + bounds.height / 2 - HANDLE_WIDTH / 2}px
                )`,
              }}
              onPointerDown={e => {
                e.stopPropagation()
                onResizeHandlePointerDown?.(Side.Right, bounds)
              }}
            />
            <rect
              className="fill-white stroke-1 stroke-blue-500"
              x={0}
              y={0}
              style={{
                cursor: 'nwse-resize',
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `
                translate(
                  ${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px, 
                  ${bounds.y - HANDLE_WIDTH / 2 + bounds.height}px
                )`,
              }}
              onPointerDown={e => {
                e.stopPropagation()
                onResizeHandlePointerDown?.(Side.Bottom + Side.Right, bounds)
              }}
            />
            <rect
              className="fill-white stroke-1 stroke-blue-500"
              x={0}
              y={0}
              style={{
                cursor: 'ns-resize',
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `
                translate(
                  ${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px,
                  ${bounds.y - HANDLE_WIDTH / 2 + bounds.height}px
                )`,
              }}
              onPointerDown={e => {
                e.stopPropagation()
                onResizeHandlePointerDown?.(Side.Bottom, bounds)
              }}
            />
            <rect
              className="fill-white stroke-1 stroke-blue-500"
              x={0}
              y={0}
              style={{
                cursor: 'nesw-resize',
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `
                translate(
                  ${bounds.x - HANDLE_WIDTH / 2}px,
                  ${bounds.y - HANDLE_WIDTH / 2 + bounds.height}px
                )`,
              }}
              onPointerDown={e => {
                e.stopPropagation()
                onResizeHandlePointerDown?.(Side.Bottom + Side.Left, bounds)
              }}
            />
            <rect
              className="fill-white stroke-1 stroke-blue-500"
              x={0}
              y={0}
              style={{
                cursor: 'ew-resize',
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `
                translate(
                  ${bounds.x - HANDLE_WIDTH / 2}px,
                  ${bounds.y - HANDLE_WIDTH / 2 + bounds.height / 2}px
                )`,
              }}
              onPointerDown={e => {
                e.stopPropagation()
                onResizeHandlePointerDown?.(Side.Left, bounds)
              }}
            />
          </>
        )}
      </>
    )
  }
)

SelectionBox.displayName = 'SelectionBox'
