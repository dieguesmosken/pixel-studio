"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Trash, Copy, Eye, EyeOff, ArrowUp, ArrowDown, Lock, Unlock } from "lucide-react"

interface Layer {
  id: number
  name: string
  visible: boolean
  locked: boolean
  opacity: number
  data: string | null
}

interface LayerManagerProps {
  layers: Layer[]
  activeLayer: number
  onLayerChange: (layers: Layer[]) => void
  onActiveLayerChange: (layerId: number) => void
}

export function LayerManager({ layers, activeLayer, onLayerChange, onActiveLayerChange }: LayerManagerProps) {
  const [editingLayerName, setEditingLayerName] = useState<number | null>(null)
  const [newLayerName, setNewLayerName] = useState("")

  const addLayer = () => {
    const newLayerId = Math.max(0, ...layers.map((l) => l.id)) + 1
    const newLayer: Layer = {
      id: newLayerId,
      name: `Layer ${newLayerId}`,
      visible: true,
      locked: false,
      opacity: 100,
      data: null,
    }

    onLayerChange([...layers, newLayer])
    onActiveLayerChange(newLayerId)
  }

  const removeLayer = (id: number) => {
    if (layers.length <= 1) {
      alert("You cannot remove the last layer.")
      return
    }

    const newLayers = layers.filter((layer) => layer.id !== id)
    onLayerChange(newLayers)

    // If the active layer was removed, select another layer
    if (activeLayer === id) {
      onActiveLayerChange(newLayers[0].id)
    }
  }

  const duplicateLayer = (id: number) => {
    const layerToDuplicate = layers.find((layer) => layer.id === id)
    if (!layerToDuplicate) return

    const newLayerId = Math.max(0, ...layers.map((l) => l.id)) + 1
    const newLayer: Layer = {
      ...layerToDuplicate,
      id: newLayerId,
      name: `${layerToDuplicate.name} (copy)`,
    }

    onLayerChange([...layers, newLayer])
    onActiveLayerChange(newLayerId)
  }

  const toggleLayerVisibility = (id: number) => {
    onLayerChange(layers.map((layer) => (layer.id === id ? { ...layer, visible: !layer.visible } : layer)))
  }

  const toggleLayerLock = (id: number) => {
    onLayerChange(layers.map((layer) => (layer.id === id ? { ...layer, locked: !layer.locked } : layer)))
  }

  const updateLayerOpacity = (id: number, opacity: number) => {
    onLayerChange(layers.map((layer) => (layer.id === id ? { ...layer, opacity } : layer)))
  }

  const moveLayerUp = (id: number) => {
    const index = layers.findIndex((layer) => layer.id === id)
    if (index <= 0) return // Already at the top

    const newLayers = [...layers]
    const temp = newLayers[index]
    newLayers[index] = newLayers[index - 1]
    newLayers[index - 1] = temp

    onLayerChange(newLayers)
  }

  const moveLayerDown = (id: number) => {
    const index = layers.findIndex((layer) => layer.id === id)
    if (index >= layers.length - 1) return // Already at the bottom

    const newLayers = [...layers]
    const temp = newLayers[index]
    newLayers[index] = newLayers[index + 1]
    newLayers[index + 1] = temp

    onLayerChange(newLayers)
  }

  const startEditingLayerName = (id: number) => {
    const layer = layers.find((layer) => layer.id === id)
    if (!layer) return

    setEditingLayerName(id)
    setNewLayerName(layer.name)
  }

  const finishEditingLayerName = () => {
    if (editingLayerName === null) return

    onLayerChange(
      layers.map((layer) =>
        layer.id === editingLayerName ? { ...layer, name: newLayerName || `Layer ${layer.id}` } : layer,
      ),
    )

    setEditingLayerName(null)
    setNewLayerName("")
  }

  return (
    <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-12rem)] pr-1">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium">Layers</h3>
        <Button variant="tool" size="icon" className="h-7 w-7" onClick={addLayer} aria-label="Add Layer">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-3">
        {layers.map((layer) => (
          <div
            key={layer.id}
            className={`flex flex-col rounded-md p-3 ${
              activeLayer === layer.id
                ? "bg-primary/10 border border-primary/30"
                : "bg-zinc-800/50 border border-zinc-700"
            }`}
            onClick={() => onActiveLayerChange(layer.id)}
            role="button"
            tabIndex={0}
            aria-pressed={activeLayer === layer.id}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                onActiveLayerChange(layer.id)
              }
            }}
          >
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-zinc-300"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleLayerVisibility(layer.id)
                }}
                aria-label={layer.visible ? "Hide Layer" : "Show Layer"}
                title={layer.visible ? "Hide Layer" : "Show Layer"}
              >
                {layer.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </Button>

              {editingLayerName === layer.id ? (
                <input
                  type="text"
                  value={newLayerName}
                  onChange={(e) => setNewLayerName(e.target.value)}
                  onBlur={finishEditingLayerName}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") finishEditingLayerName()
                    if (e.key === "Escape") {
                      setEditingLayerName(null)
                      setNewLayerName("")
                    }
                  }}
                  autoFocus
                  className="bg-zinc-700 text-white px-2 py-1 text-sm rounded flex-1 border border-zinc-600 focus:border-primary focus:outline-none"
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <div
                  className="text-sm flex-1 truncate cursor-pointer px-2 py-1 rounded hover:bg-zinc-700/50"
                  onDoubleClick={(e) => {
                    e.stopPropagation()
                    startEditingLayerName(layer.id)
                  }}
                  title={layer.name}
                >
                  {layer.name}
                </div>
              )}

              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-zinc-300"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleLayerLock(layer.id)
                }}
                aria-label={layer.locked ? "Unlock Layer" : "Lock Layer"}
                title={layer.locked ? "Unlock Layer" : "Lock Layer"}
              >
                {layer.locked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
              </Button>
            </div>

            <div className="w-full mt-2">
              <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                <span>Opacity</span>
                <span>{layer.opacity}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={layer.opacity}
                onChange={(e) => {
                  e.stopPropagation()
                  updateLayerOpacity(layer.id, Number.parseInt(e.target.value))
                }}
                className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer"
                onClick={(e) => e.stopPropagation()}
                aria-label={`Layer ${layer.name} Opacity`}
              />
            </div>

            <div className="flex justify-between mt-2">
              <div className="flex gap-1">
                <Button
                  variant="tool"
                  size="icon"
                  className="h-7 w-7"
                  onClick={(e) => {
                    e.stopPropagation()
                    moveLayerUp(layer.id)
                  }}
                  disabled={layers.indexOf(layer) === 0}
                  aria-label="Move Layer Up"
                  title="Move Up"
                >
                  <ArrowUp className="h-3 w-3" />
                </Button>

                <Button
                  variant="tool"
                  size="icon"
                  className="h-7 w-7"
                  onClick={(e) => {
                    e.stopPropagation()
                    moveLayerDown(layer.id)
                  }}
                  disabled={layers.indexOf(layer) === layers.length - 1}
                  aria-label="Move Layer Down"
                  title="Move Down"
                >
                  <ArrowDown className="h-3 w-3" />
                </Button>
              </div>

              <div className="flex gap-1">
                <Button
                  variant="tool"
                  size="icon"
                  className="h-7 w-7"
                  onClick={(e) => {
                    e.stopPropagation()
                    duplicateLayer(layer.id)
                  }}
                  aria-label="Duplicate Layer"
                  title="Duplicate Layer"
                >
                  <Copy className="h-3 w-3" />
                </Button>

                <Button
                  variant="tool"
                  size="icon"
                  className="h-7 w-7 text-red-500 hover:text-red-400"
                  onClick={(e) => {
                    e.stopPropagation()
                    if (confirm(`Delete layer "${layer.name}"?`)) {
                      removeLayer(layer.id)
                    }
                  }}
                  disabled={layers.length <= 1}
                  aria-label="Delete Layer"
                  title="Delete Layer"
                >
                  <Trash className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {layers.length === 0 && (
        <div className="text-center py-4 text-zinc-500">
          <p>No layers yet</p>
          <Button variant="outline" size="sm" className="mt-2" onClick={addLayer}>
            Add Layer
          </Button>
        </div>
      )}
    </div>
  )
}

