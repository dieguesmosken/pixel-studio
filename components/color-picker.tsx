"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [opacity, setOpacity] = useState(100)
  const [hexColor, setHexColor] = useState("#000000")

  // Initialize state based on the current color
  useEffect(() => {
    if (color.startsWith("#")) {
      setHexColor(color)
      setOpacity(100)
    } else if (color.startsWith("rgba")) {
      // Extract values from rgba
      const rgba = color.match(/rgba?$$(\d+),\s*(\d+),\s*(\d+)(?:,\s*([.\d]+))?$$/)
      if (rgba) {
        const r = Number.parseInt(rgba[1])
        const g = Number.parseInt(rgba[2])
        const b = Number.parseInt(rgba[3])
        const a = rgba[4] ? Number.parseFloat(rgba[4]) : 1

        // Convert RGB to hex
        const hex = rgbToHex(r, g, b)
        setHexColor(hex)
        setOpacity(Math.round(a * 100))
      }
    }
  }, [color])

  const presetColors = [
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
  ]

  // Convert RGB to hex
  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
  }

  // Convert hex to RGB
  const hexToRgb = (hex: string) => {
    // Remove # if present
    hex = hex.replace(/^#/, "")

    // Parse the hex values
    let r, g, b
    if (hex.length === 3) {
      // Short notation (e.g. #FFF)
      r = Number.parseInt(hex[0] + hex[0], 16)
      g = Number.parseInt(hex[1] + hex[1], 16)
      b = Number.parseInt(hex[2] + hex[2], 16)
    } else {
      // Full notation (e.g. #FFFFFF)
      r = Number.parseInt(hex.substring(0, 2), 16)
      g = Number.parseInt(hex.substring(2, 4), 16)
      b = Number.parseInt(hex.substring(4, 6), 16)
    }

    return { r, g, b }
  }

  // Convert hex to rgba
  const hexToRgba = (hex: string, alpha: number) => {
    const { r, g, b } = hexToRgb(hex)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  // Handle opacity change
  const handleOpacityChange = (value: number[]) => {
    const newOpacity = value[0]
    setOpacity(newOpacity)

    // Update the color with new opacity
    const rgba = hexToRgba(hexColor, newOpacity / 100)
    onChange(rgba)
  }

  // Handle color change
  const handleColorChange = (newHexColor: string) => {
    setHexColor(newHexColor)

    if (opacity < 100) {
      // If we have transparency, use rgba
      onChange(hexToRgba(newHexColor, opacity / 100))
    } else {
      // Otherwise use hex
      onChange(newHexColor)
    }
  }

  // Handle direct text input for color
  const handleColorInput = (inputValue: string) => {
    // Check if it's a valid hex color
    if (/^#[0-9A-Fa-f]{6}$/.test(inputValue)) {
      handleColorChange(inputValue)
    }
    // Check if it's a valid rgba color
    else if (inputValue.startsWith("rgba")) {
      const rgba = inputValue.match(/rgba?$$(\d+),\s*(\d+),\s*(\d+)(?:,\s*([.\d]+))?$$/)
      if (rgba) {
        const r = Number.parseInt(rgba[1])
        const g = Number.parseInt(rgba[2])
        const b = Number.parseInt(rgba[3])
        const a = rgba[4] ? Number.parseFloat(rgba[4]) : 1

        // Update hex and opacity
        const hex = rgbToHex(r, g, b)
        setHexColor(hex)
        setOpacity(Math.round(a * 100))
      }

      // Pass through the value directly
      onChange(inputValue)
    } else {
      // For other formats, just pass through
      onChange(inputValue)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded border border-zinc-700 relative overflow-hidden">
          {/* Checkerboard background to show transparency */}
          <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
          <div className="absolute inset-0" style={{ backgroundColor: color }}></div>
        </div>
        <input type="color" value={hexColor} onChange={(e) => handleColorChange(e.target.value)} className="h-8" />
        <input
          type="text"
          value={color}
          onChange={(e) => handleColorInput(e.target.value)}
          className="flex-1 rounded bg-zinc-800 px-2 py-1 text-sm"
        />
      </div>

      <div>
        <label className="text-xs text-zinc-400 mb-1 block">Opacity: {opacity}%</label>
        <Slider
          value={[opacity]}
          min={0}
          max={100}
          step={1}
          onValueChange={handleOpacityChange}
          className="[&>span:first-child]:h-1 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-white [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-white"
        />
      </div>

      <div className="grid grid-cols-5 gap-1">
        {presetColors.map((presetColor) => (
          <button
            key={presetColor}
            className="h-6 w-full rounded border border-zinc-700"
            style={{ backgroundColor: presetColor }}
            onClick={() => handleColorChange(presetColor)}
          />
        ))}
      </div>

      {/* Transparency presets */}
      <div className="grid grid-cols-5 gap-1">
        {[100, 75, 50, 25, 0].map((opacityValue) => (
          <button
            key={opacityValue}
            className="h-6 w-full rounded border border-zinc-700 relative overflow-hidden"
            onClick={() => {
              setOpacity(opacityValue)
              handleOpacityChange([opacityValue])
            }}
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
            <div
              className="absolute inset-0 flex items-center justify-center text-xs"
              style={{
                backgroundColor: hexToRgba(hexColor, opacityValue / 100),
                color: opacityValue > 50 ? "#000" : "#fff",
              }}
            >
              {opacityValue}%
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

