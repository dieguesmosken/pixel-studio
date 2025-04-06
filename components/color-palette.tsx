"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Trash, Download, Upload } from "lucide-react"
import { ColorPicker } from "@/components/color-picker"

interface ColorPaletteProps {
  activeColor: string
  onColorSelect: (color: string) => void
}

export function ColorPalette({ activeColor, onColorSelect }: ColorPaletteProps) {
  const [colors, setColors] = useState<string[]>([
    "#000000",
    "#FFFFFF",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#FF9900",
    "#9900FF",
  ])
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [editingColor, setEditingColor] = useState<string | null>(null)
  const [paletteHistory, setPaletteHistory] = useState<string[][]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  // Load saved palette from localStorage on component mount
  useEffect(() => {
    const savedPalette = localStorage.getItem("pixelStudioPalette")
    if (savedPalette) {
      try {
        const parsedPalette = JSON.parse(savedPalette)
        if (Array.isArray(parsedPalette) && parsedPalette.length > 0) {
          setColors(parsedPalette)
          // Initialize history with the loaded palette
          setPaletteHistory([parsedPalette])
          setHistoryIndex(0)
        }
      } catch (e) {
        console.error("Error loading saved palette:", e)
      }
    }
  }, [])

  // Save palette to localStorage when it changes
  useEffect(() => {
    if (colors.length > 0) {
      localStorage.setItem("pixelStudioPalette", JSON.stringify(colors))
    }
  }, [colors])

  // Add a color to the palette
  const addColor = (color: string) => {
    const newColors = [...colors, color]
    setColors(newColors)

    // Add to history
    const newHistory = paletteHistory.slice(0, historyIndex + 1)
    newHistory.push(newColors)
    setPaletteHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)

    setShowColorPicker(false)
  }

  // Remove a color from the palette
  const removeColor = (index: number) => {
    const newColors = colors.filter((_, i) => i !== index)
    setColors(newColors)

    // Add to history
    const newHistory = paletteHistory.slice(0, historyIndex + 1)
    newHistory.push(newColors)
    setPaletteHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  // Edit a color in the palette
  const editColor = (index: number, newColor: string) => {
    const newColors = [...colors]
    newColors[index] = newColor
    setColors(newColors)

    // Add to history
    const newHistory = paletteHistory.slice(0, historyIndex + 1)
    newHistory.push(newColors)
    setPaletteHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)

    setEditingColor(null)
  }

  // Undo palette change
  const undoPaletteChange = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setColors(paletteHistory[historyIndex - 1])
    }
  }

  // Redo palette change
  const redoPaletteChange = () => {
    if (historyIndex < paletteHistory.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setColors(paletteHistory[historyIndex + 1])
    }
  }

  // Export palette as JSON
  const exportPalette = () => {
    const dataStr = JSON.stringify(colors)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

    const exportName = "pixel-studio-palette.json"

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportName)
    linkElement.click()
  }

  // Import palette from JSON
  const importPalette = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        const importedPalette = JSON.parse(content)

        if (Array.isArray(importedPalette) && importedPalette.length > 0) {
          setColors(importedPalette)

          // Add to history
          const newHistory = paletteHistory.slice(0, historyIndex + 1)
          newHistory.push(importedPalette)
          setPaletteHistory(newHistory)
          setHistoryIndex(newHistory.length - 1)
        }
      } catch (error) {
        console.error("Error importing palette:", error)
        alert("Invalid palette file. Please select a valid JSON file.")
      }
    }
    reader.readAsText(file)

    // Reset the input value so the same file can be selected again
    event.target.value = ""
  }

  return (
    <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-24rem)] pr-1">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium">Color Palette</h3>
        <div className="flex gap-1">
          <Button
            variant="tool"
            size="icon"
            className="h-7 w-7"
            onClick={() => setShowColorPicker(true)}
            aria-label="Add Color"
            title="Add Color"
          >
            <Plus className="h-3 w-3" />
          </Button>
          <Button
            variant="tool"
            size="icon"
            className="h-7 w-7"
            onClick={exportPalette}
            aria-label="Export Palette"
            title="Export Palette"
          >
            <Download className="h-3 w-3" />
          </Button>
          <label>
            <input type="file" accept=".json" className="hidden" onChange={importPalette} aria-label="Import Palette" />
            <Button
              variant="tool"
              size="icon"
              className="h-7 w-7 cursor-pointer"
              title="Import Palette"
              type="button"
              aria-label="Import Palette"
              asChild
            >
              <span>
                <Upload className="h-3 w-3" />
              </span>
            </Button>
          </label>
          <Button
            variant="tool"
            size="icon"
            className="h-7 w-7"
            onClick={undoPaletteChange}
            disabled={historyIndex <= 0}
            aria-label="Undo Palette Change"
            title="Undo"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 14 4 9l5-5" />
              <path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11" />
            </svg>
          </Button>
          <Button
            variant="tool"
            size="icon"
            className="h-7 w-7"
            onClick={redoPaletteChange}
            disabled={historyIndex >= paletteHistory.length - 1}
            aria-label="Redo Palette Change"
            title="Redo"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 14 5-5-5-5" />
              <path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11" />
            </svg>
          </Button>
        </div>
      </div>

      {showColorPicker && (
        <div className="mb-4 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700">
          <h4 className="text-xs mb-2 text-zinc-300">Add New Color</h4>
          <ColorPicker color="#000000" onChange={(color) => {}} />
          <div className="flex gap-2 mt-2">
            <Button
              size="sm"
              className="w-full"
              onClick={() => addColor(document.querySelector('input[type="color"]')?.value || "#000000")}
              aria-label="Add Color to Palette"
            >
              Add
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="w-full"
              onClick={() => setShowColorPicker(false)}
              aria-label="Cancel Adding Color"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {editingColor !== null && (
        <div className="mb-4 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700">
          <h4 className="text-xs mb-2 text-zinc-300">Edit Color</h4>
          <ColorPicker color={colors[Number(editingColor)]} onChange={(color) => {}} />
          <div className="flex gap-2 mt-2">
            <Button
              size="sm"
              className="w-full"
              onClick={() =>
                editColor(Number(editingColor), document.querySelector('input[type="color"]')?.value || "#000000")
              }
              aria-label="Update Color"
            >
              Update
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="w-full"
              onClick={() => setEditingColor(null)}
              aria-label="Cancel Editing Color"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-5 gap-2">
        {colors.map((color, index) => (
          <div key={`${color}-${index}`} className="relative group">
            <button
              className={`h-8 w-full rounded border-2 ${activeColor === color ? "border-primary" : "border-zinc-700"} focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-zinc-900`}
              style={{ backgroundColor: color }}
              onClick={() => onColorSelect(color)}
              onContextMenu={(e) => {
                e.preventDefault()
                setEditingColor(String(index))
              }}
              title={color}
              aria-label={`Select color ${color}`}
            />
            <button
              className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 focus:ring-offset-zinc-900 focus:opacity-100"
              onClick={(e) => {
                e.stopPropagation()
                removeColor(index)
              }}
              title="Remove Color"
              aria-label={`Remove color ${color}`}
            >
              <Trash className="h-2 w-2" />
            </button>
          </div>
        ))}
      </div>

      <div className="text-xs text-zinc-400 mt-1">
        <p>Right-click to edit a color</p>
      </div>
    </div>
  )
}

