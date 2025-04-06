"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Save, Download, Pencil, Layers, Palette, Maximize, Minimize, LayoutTemplate } from "lucide-react"
import { ColorPicker } from "@/components/color-picker"
import { ColorPalette } from "@/components/color-palette"
import { CanvasEditor } from "@/components/canvas-editor"
import { AnimationControls } from "@/components/animation-controls"
import { LayerManager } from "@/components/layer-manager"
import { DrawingTools } from "@/components/drawing-tools"
import { ExportModal } from "@/components/export-modal"
import { LanguageSelector } from "@/components/language-selector"
import { useLanguage } from "@/contexts/language-context"

export default function EditorPage() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("draw")
  const [activeColor, setActiveColor] = useState("#000000")
  const [activeTool, setActiveTool] = useState("pencil")
  const [canvasSize, setCanvasSize] = useState({ width: 32, height: 32 })
  const [pixelSize, setPixelSize] = useState(16)
  const [frames, setFrames] = useState([{ id: 1, data: null, delay: 100 }])
  const [currentFrame, setCurrentFrame] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [brushSize, setBrushSize] = useState(1)
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [showLeftPanel, setShowLeftPanel] = useState(true)
  const [showRightPanel, setShowRightPanel] = useState(true)
  const [layers, setLayers] = useState([
    { id: 1, name: "Layer 1", visible: true, locked: false, opacity: 100, data: null },
  ])
  const [activeLayer, setActiveLayer] = useState(1)
  const [historyStack, setHistoryStack] = useState<any[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Initialize canvas and load frame data
  useEffect(() => {
    // Initialize with a blank frame and layer
    const initialFrame = { id: 1, data: null, delay: 100 }
    const initialLayer = {
      id: 1,
      name: t("layers.title") + " 1",
      visible: true,
      locked: false,
      opacity: 100,
      data: null,
    }

    setFrames([initialFrame])
    setLayers([initialLayer])
    setCurrentFrame(1)
    setActiveLayer(1)
  }, [t])

  // Handle color picking from eyedropper tool
  const handleColorPick = (color: string) => {
    setActiveColor(color)
    setActiveTool("pencil") // Switch back to pencil after picking a color
  }

  // Toggle animation playback
  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
  }

  // Apply canvas size changes
  const applyCanvasChanges = () => {
    if (confirm(t("canvas.resizeConfirm"))) {
      // Reset frames with new size
      setFrames([{ id: 1, data: null, delay: 100 }])
      setCurrentFrame(1)
      setLayers([{ id: 1, name: t("layers.title") + " 1", visible: true, locked: false, opacity: 100, data: null }])
      setActiveLayer(1)
      setHistoryStack([])
      setHistoryIndex(-1)
    }
  }

  // Handle undo
  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      // Apply the state from history
      const previousState = historyStack[historyIndex - 1]
      // Update frames and layers based on the previous state
      // This is a simplified version - in a real app, you'd restore the exact state
      setCanRedo(true)
    }

    if (historyIndex <= 1) {
      setCanUndo(false)
    }
  }

  // Handle redo
  const handleRedo = () => {
    if (historyIndex < historyStack.length - 1) {
      setHistoryIndex(historyIndex + 1)
      // Apply the state from history
      const nextState = historyStack[historyIndex + 1]
      // Update frames and layers based on the next state
      // This is a simplified version - in a real app, you'd restore the exact state
      setCanUndo(true)
    }

    if (historyIndex >= historyStack.length - 2) {
      setCanRedo(false)
    }
  }

  // Handle canvas transformations
  const handleFlipHorizontal = () => {
    // Implement horizontal flip logic
    console.log("Flip horizontal")
  }

  const handleFlipVertical = () => {
    // Implement vertical flip logic
    console.log("Flip vertical")
  }

  const handleRotate = () => {
    // Implement rotation logic
    console.log("Rotate 90°")
  }

  // Handle zoom
  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 0.25, 4))
  }

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 0.25, 0.25))
  }

  // Implement clear canvas function
  const handleClearCanvas = () => {
    if (confirm(t("canvas.clearConfirm"))) {
      // Create a new blank frame with the same ID
      const updatedFrames = frames.map((frame) => (frame.id === currentFrame ? { ...frame, data: null } : frame))

      setFrames(updatedFrames)

      // Also clear the layer data
      const updatedLayers = layers.map((layer) => (layer.id === activeLayer ? { ...layer, data: null } : layer))

      setLayers(updatedLayers)

      // Add to history
      const newHistoryState = {
        frames: updatedFrames,
        layers: updatedLayers,
        currentFrame,
        activeLayer,
      }

      const newHistory = historyStack.slice(0, historyIndex + 1)
      newHistory.push(newHistoryState)
      setHistoryStack(newHistory)
      setHistoryIndex(newHistory.length - 1)

      // Set undo/redo state
      setCanUndo(true)
      setCanRedo(false)
    }
  }

  // Toggle both panels at once
  const togglePanels = () => {
    if (showLeftPanel && showRightPanel) {
      // If both are showing, hide both
      setShowLeftPanel(false)
      setShowRightPanel(false)
    } else {
      // Otherwise show both
      setShowLeftPanel(true)
      setShowRightPanel(true)
    }
  }

  return (
    <div className="flex h-screen flex-col bg-zinc-900 text-white">
      <header className="border-b border-zinc-800 bg-zinc-950">
        <div className="container flex h-14 items-center">
          <Link href="/" className="mr-4 flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            <span className="font-bold">{t("app.title")}</span>
          </Link>
          <Tabs defaultValue="draw" className="mr-auto">
            <TabsList className="bg-zinc-800">
              <TabsTrigger value="draw" onClick={() => setActiveTab("draw")}>
                {t("nav.draw")}
              </TabsTrigger>
              <TabsTrigger value="animate" onClick={() => setActiveTab("animate")}>
                {t("nav.animate")}
              </TabsTrigger>
              <TabsTrigger value="settings" onClick={() => setActiveTab("settings")}>
                {t("nav.settings")}
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Consolidated Panel Toggle and Language Selector */}
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <Button
              variant="tool"
              size="sm"
              onClick={togglePanels}
              aria-label={showLeftPanel && showRightPanel ? t("nav.hidePanels") : t("nav.showPanels")}
              title={showLeftPanel && showRightPanel ? t("nav.hidePanels") : t("nav.showPanels")}
              className="mr-2"
            >
              <LayoutTemplate className="h-4 w-4 mr-2" />
              {showLeftPanel && showRightPanel ? t("nav.hidePanels") : t("nav.showPanels")}
            </Button>
            <Button
              variant="tool"
              size="sm"
              onClick={() => setShowExportModal(true)}
              aria-label={t("nav.export")}
            >
              <Download className="mr-2 h-4 w-4" />
              {t("nav.export")}
            </Button>
            <Button variant="tool" size="sm" aria-label={t("nav.save")}>
              <Save className="mr-2 h-4 w-4" />
              {t("nav.save")}
            </Button>
          </div>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel */}
        {showLeftPanel && (
          <div className="w-64 border-r border-zinc-800 bg-zinc-950 overflow-hidden flex flex-col">
            <Tabs defaultValue="tools" className="p-4 flex-1 flex flex-col">
              <TabsList className="w-full">
                <TabsTrigger value="tools" className="flex-1">
                  <Pencil className="h-4 w-4 mr-2" />
                  {t("tools.title")}
                </TabsTrigger>
                <TabsTrigger value="layers" className="flex-1">
                  <Layers className="h-4 w-4 mr-2" />
                  {t("layers.title")}
                </TabsTrigger>
                <TabsTrigger value="colors" className="flex-1">
                  <Palette className="h-4 w-4 mr-2" />
                  {t("colors.title")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="tools" className="mt-4 flex-1 overflow-hidden">
                <DrawingTools
                  activeTool={activeTool}
                  onToolChange={setActiveTool}
                  onClearCanvas={handleClearCanvas}
                  onUndo={handleUndo}
                  onRedo={handleRedo}
                  canUndo={canUndo}
                  canRedo={canRedo}
                  brushSize={brushSize}
                  onBrushSizeChange={setBrushSize}
                  onFlipHorizontal={handleFlipHorizontal}
                  onFlipVertical={handleFlipVertical}
                  onRotate={handleRotate}
                  onZoomIn={handleZoomIn}
                  onZoomOut={handleZoomOut}
                />
              </TabsContent>

              <TabsContent value="layers" className="mt-4 flex-1 overflow-hidden">
                <LayerManager
                  layers={layers}
                  activeLayer={activeLayer}
                  onLayerChange={setLayers}
                  onActiveLayerChange={setActiveLayer}
                />
              </TabsContent>

              <TabsContent value="colors" className="mt-4 flex-1 overflow-hidden">
                <div className="space-y-4">
                  <ColorPicker color={activeColor} onChange={setActiveColor} />
                  <ColorPalette activeColor={activeColor} onColorSelect={setActiveColor} />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Main Editor Area */}
        <div className="flex-1 overflow-auto p-4">
          <div className="flex h-full flex-col items-center justify-center">
            <div className="relative bg-white rounded-lg shadow-lg overflow-auto">
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
              <div style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}>
                <CanvasEditor
                  width={canvasSize.width}
                  height={canvasSize.height}
                  pixelSize={pixelSize}
                  activeColor={activeColor}
                  activeTool={activeTool}
                  currentFrame={currentFrame}
                  frames={frames}
                  setFrames={setFrames}
                  onColorPick={handleColorPick}
                  brushSize={brushSize}
                  layers={layers}
                  activeLayer={activeLayer}
                />
              </div>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <Button
                variant="tool"
                size="sm"
                onClick={handleZoomOut}
                disabled={zoom <= 0.25}
                aria-label={t("view.zoomOut")}
              >
                <Minimize className="h-4 w-4" />
              </Button>
              <span className="text-sm">{Math.round(zoom * 100)}%</span>
              <Button
                variant="tool"
                size="sm"
                onClick={handleZoomIn}
                disabled={zoom >= 4}
                aria-label={t("view.zoomIn")}
              >
                <Maximize className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        {showRightPanel && (
          <div className="w-80 border-l border-zinc-800 bg-zinc-950 overflow-hidden flex flex-col">
            <div className="p-4 flex-1 overflow-y-auto">
              {activeTab === "draw" && (
                <div className="space-y-6">
                  <div className="border-b border-zinc-800 pb-4">
                    <h3 className="mb-2 text-sm font-medium">{t("canvas.size")}</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs text-zinc-300">{t("canvas.width")}</label>
                        <input
                          type="number"
                          min="8"
                          max="128"
                          value={canvasSize.width}
                          onChange={(e) => setCanvasSize({ ...canvasSize, width: Number(e.target.value) })}
                          className="w-full rounded bg-zinc-800 px-2 py-1 text-sm border border-zinc-700 focus:border-primary focus:outline-none"
                          aria-label={t("canvas.width")}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-zinc-300">{t("canvas.height")}</label>
                        <input
                          type="number"
                          min="8"
                          max="128"
                          value={canvasSize.height}
                          onChange={(e) => setCanvasSize({ ...canvasSize, height: Number(e.target.value) })}
                          className="w-full rounded bg-zinc-800 px-2 py-1 text-sm border border-zinc-700 focus:border-primary focus:outline-none"
                          aria-label={t("canvas.height")}
                        />
                      </div>
                    </div>
                    <div className="mt-2">
                      <label className="text-xs text-zinc-300">{t("canvas.pixelSize")}</label>
                      <input
                        type="range"
                        min="4"
                        max="32"
                        step="4"
                        value={pixelSize}
                        onChange={(e) => setPixelSize(Number(e.target.value))}
                        className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer"
                        aria-label={t("canvas.pixelSize")}
                      />
                      <div className="text-xs text-zinc-300 text-right">{pixelSize}px</div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 w-full"
                      onClick={applyCanvasChanges}
                      aria-label={t("canvas.applyChanges")}
                    >
                      {t("canvas.applyChanges")}
                    </Button>
                  </div>

                  <AnimationControls
                    frames={frames}
                    currentFrame={currentFrame}
                    isPlaying={isPlaying}
                    canvasSize={canvasSize}
                    onFrameChange={setCurrentFrame}
                    onFramesChange={setFrames}
                    onPlayToggle={togglePlayback}
                  />
                </div>
              )}

              {activeTab === "animate" && (
                <div className="space-y-6">
                  <AnimationControls
                    frames={frames}
                    currentFrame={currentFrame}
                    isPlaying={isPlaying}
                    canvasSize={canvasSize}
                    onFrameChange={setCurrentFrame}
                    onFramesChange={setFrames}
                    onPlayToggle={togglePlayback}
                  />
                </div>
              )}

              {activeTab === "settings" && (
                <div className="space-y-6">
                  <div className="border-b border-zinc-800 pb-4">
                    <h3 className="mb-2 text-sm font-medium">{t("canvas.size")}</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs text-zinc-300">{t("canvas.width")}</label>
                        <input
                          type="number"
                          min="8"
                          max="128"
                          value={canvasSize.width}
                          onChange={(e) => setCanvasSize({ ...canvasSize, width: Number(e.target.value) })}
                          className="w-full rounded bg-zinc-800 px-2 py-1 text-sm border border-zinc-700 focus:border-primary focus:outline-none"
                          aria-label={t("canvas.width")}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-zinc-300">{t("canvas.height")}</label>
                        <input
                          type="number"
                          min="8"
                          max="128"
                          value={canvasSize.height}
                          onChange={(e) => setCanvasSize({ ...canvasSize, height: Number(e.target.value) })}
                          className="w-full rounded bg-zinc-800 px-2 py-1 text-sm border border-zinc-700 focus:border-primary focus:outline-none"
                          aria-label={t("canvas.height")}
                        />
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 w-full"
                      onClick={applyCanvasChanges}
                      aria-label={t("canvas.applyChanges")}
                    >
                      {t("canvas.applyChanges")}
                    </Button>
                  </div>

                  <div className="border-b border-zinc-800 pb-4">
                    <h3 className="mb-2 text-sm font-medium">{t("settings.display")}</h3>
                    <div className="space-y-2">
                      <div>
                        <label className="text-xs text-zinc-300">{t("canvas.pixelSize")}</label>
                        <input
                          type="range"
                          min="4"
                          max="32"
                          step="4"
                          value={pixelSize}
                          onChange={(e) => setPixelSize(Number(e.target.value))}
                          className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer"
                          aria-label={t("canvas.pixelSize")}
                        />
                        <div className="text-xs text-zinc-300 text-right">{pixelSize}px</div>
                      </div>

                      <div>
                        <label className="text-xs text-zinc-300">{t("settings.zoom")}</label>
                        <input
                          type="range"
                          min="0.25"
                          max="4"
                          step="0.25"
                          value={zoom}
                          onChange={(e) => setZoom(Number(e.target.value))}
                          className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer"
                          aria-label={t("settings.zoom")}
                        />
                        <div className="text-xs text-zinc-300 text-right">{Math.round(zoom * 100)}%</div>
                      </div>
                    </div>
                  </div>

                  <div className="border-b border-zinc-800 pb-4">
                    <h3 className="mb-2 text-sm font-medium">{t("export.title")}</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => setShowExportModal(true)}
                      aria-label={t("export.options")}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      {t("export.options")}
                    </Button>
                  </div>

                  <div className="border-b border-zinc-800 pb-4">
                    <h3 className="mb-2 text-sm font-medium">{t("language.title")}</h3>
                    <div className="flex justify-center">
                      <LanguageSelector />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {showExportModal && (
        <ExportModal onClose={() => setShowExportModal(false)} frames={frames} canvasSize={canvasSize} />
      )}
    </div>
  )
}

