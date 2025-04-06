"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import {
  Pencil,
  Eraser,
  Pipette,
  Move,
  Square,
  Circle,
  Type,
  Wand2,
  Paintbrush,
  Droplets,
  Maximize,
  Minimize,
  RotateCw,
  FlipHorizontal,
  FlipVertical,
  Trash,
  Undo,
  Redo,
} from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface DrawingToolsProps {
  activeTool: string
  onToolChange: (tool: string) => void
  onClearCanvas: () => void
  onUndo: () => void
  onRedo: () => void
  canUndo: boolean
  canRedo: boolean
  brushSize: number
  onBrushSizeChange: (size: number) => void
  onFlipHorizontal: () => void
  onFlipVertical: () => void
  onRotate: () => void
  onZoomIn: () => void
  onZoomOut: () => void
}

export function DrawingTools({
  activeTool,
  onToolChange,
  onClearCanvas,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  brushSize,
  onBrushSizeChange,
  onFlipHorizontal,
  onFlipVertical,
  onRotate,
  onZoomIn,
  onZoomOut,
}: DrawingToolsProps) {
  const { t } = useLanguage()
  const [showBrushSettings, setShowBrushSettings] = useState(false)

  const tools = [
    { id: "pencil", icon: <Pencil className="h-5 w-5" />, label: t("tools.pencil") },
    { id: "brush", icon: <Paintbrush className="h-5 w-5" />, label: t("tools.brush") },
    { id: "eraser", icon: <Eraser className="h-5 w-5" />, label: t("tools.eraser") },
    { id: "eyedropper", icon: <Pipette className="h-5 w-5" />, label: t("tools.eyedropper") },
    { id: "fill", icon: <Droplets className="h-5 w-5" />, label: t("tools.fill") },
    { id: "move", icon: <Move className="h-5 w-5" />, label: t("tools.move") },
    { id: "rectangle", icon: <Square className="h-5 w-5" />, label: t("tools.rectangle") },
    { id: "circle", icon: <Circle className="h-5 w-5" />, label: t("tools.circle") },
    { id: "text", icon: <Type className="h-5 w-5" />, label: t("tools.text") },
    { id: "magic", icon: <Wand2 className="h-5 w-5" />, label: t("tools.magicWand") },
  ]

  const transformTools = [
    {
      id: "flipH",
      icon: <FlipHorizontal className="h-5 w-5" />,
      label: t("transform.flipH"),
      action: onFlipHorizontal,
    },
    { id: "flipV", icon: <FlipVertical className="h-5 w-5" />, label: t("transform.flipV"), action: onFlipVertical },
    { id: "rotate", icon: <RotateCw className="h-5 w-5" />, label: t("transform.rotate"), action: onRotate },
  ]

  const historyTools = [
    { id: "undo", icon: <Undo className="h-5 w-5" />, label: t("history.undo"), action: onUndo, disabled: !canUndo },
    { id: "redo", icon: <Redo className="h-5 w-5" />, label: t("history.redo"), action: onRedo, disabled: !canRedo },
  ]

  const zoomTools = [
    { id: "zoomIn", icon: <Maximize className="h-5 w-5" />, label: t("view.zoomIn"), action: onZoomIn },
    { id: "zoomOut", icon: <Minimize className="h-5 w-5" />, label: t("view.zoomOut"), action: onZoomOut },
  ]

  const handleToolClick = (toolId: string) => {
    onToolChange(toolId)

    if (toolId === "brush" || toolId === "eraser") {
      setShowBrushSettings(true)
    } else {
      setShowBrushSettings(false)
    }
  }

  return (
    <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-12rem)] pr-1">
      <h3 className="text-sm font-medium mb-2">{t("tools.title")}</h3>

      <div className="grid grid-cols-5 gap-2">
        {tools.map((tool) => (
          <Button
            key={tool.id}
            variant={activeTool === tool.id ? "active-tool" : "tool"}
            size="icon"
            className="h-10 w-10"
            onClick={() => handleToolClick(tool.id)}
            title={tool.label}
            aria-label={tool.label}
            aria-pressed={activeTool === tool.id}
          >
            {tool.icon}
          </Button>
        ))}
      </div>

      {showBrushSettings && (
        <div className="mt-4 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-zinc-300">{t("tools.brushSize")}</span>
            <span className="text-xs text-zinc-300 font-medium">{brushSize}px</span>
          </div>
          <Slider
            value={[brushSize]}
            min={1}
            max={32}
            step={1}
            onValueChange={(value) => onBrushSizeChange(value[0])}
            className="[&>span:first-child]:h-2 [&>span:first-child]:bg-zinc-700 [&_[role=slider]]:bg-primary [&_[role=slider]]:w-4 [&_[role=slider]]:h-4 [&_[role=slider]]:border-2 [&_[role=slider]]:border-zinc-900"
          />
        </div>
      )}

      <div className="border-t border-zinc-800 pt-4 mt-4">
        <h3 className="text-sm font-medium mb-2">{t("transform.title")}</h3>
        <div className="grid grid-cols-3 gap-2">
          {transformTools.map((tool) => (
            <Button
              key={tool.id}
              variant="tool"
              size="icon"
              className="h-10 w-10"
              onClick={tool.action}
              title={tool.label}
              aria-label={tool.label}
            >
              {tool.icon}
            </Button>
          ))}
        </div>
      </div>

      <div className="border-t border-zinc-800 pt-4 mt-4">
        <h3 className="text-sm font-medium mb-2">{t("history.title")}</h3>
        <div className="grid grid-cols-2 gap-2">
          {historyTools.map((tool) => (
            <Button
              key={tool.id}
              variant="tool"
              size="icon"
              className="h-10 w-10"
              onClick={tool.action}
              disabled={tool.disabled}
              title={tool.label}
              aria-label={tool.label}
            >
              {tool.icon}
            </Button>
          ))}
        </div>
      </div>

      <div className="border-t border-zinc-800 pt-4 mt-4">
        <h3 className="text-sm font-medium mb-2">{t("view.title")}</h3>
        <div className="grid grid-cols-2 gap-2">
          {zoomTools.map((tool) => (
            <Button
              key={tool.id}
              variant="tool"
              size="icon"
              className="h-10 w-10"
              onClick={tool.action}
              title={tool.label}
              aria-label={tool.label}
            >
              {tool.icon}
            </Button>
          ))}
        </div>
      </div>

      <div className="border-t border-zinc-800 pt-4 mt-4">
        <Button
          variant="destructive"
          size="sm"
          className="w-full"
          onClick={onClearCanvas}
          aria-label={t("canvas.clear")}
        >
          <Trash className="h-4 w-4 mr-2" />
          {t("canvas.clear")}
        </Button>
      </div>
    </div>
  )
}

