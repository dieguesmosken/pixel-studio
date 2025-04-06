"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  RotateCcw,
  RotateCw,
  ChevronDown,
  ChevronUp,
  Copy,
  Trash,
  MoveHorizontal,
  ArrowUp,
  ArrowDown,
  Plus,
} from "lucide-react"
import { AnimationPreview } from "@/components/animation-preview"

interface Frame {
  id: number
  data: string | null
  delay: number
}

interface AnimationControlsProps {
  frames: Frame[]
  currentFrame: number
  isPlaying: boolean
  canvasSize: { width: number; height: number }
  onFrameChange: (frameId: number) => void
  onFramesChange: (frames: Frame[]) => void
  onPlayToggle: () => void
}

export function AnimationControls({
  frames,
  currentFrame,
  isPlaying,
  canvasSize,
  onFrameChange,
  onFramesChange,
  onPlayToggle,
}: AnimationControlsProps) {
  const [fps, setFps] = useState(10)
  const [isLooping, setIsLooping] = useState(true)
  const [isReversed, setIsReversed] = useState(false)
  const [isExpanded, setIsExpanded] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [draggedFrame, setDraggedFrame] = useState<number | null>(null)
  const [dropTarget, setDropTarget] = useState<number | null>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const [previewSize, setPreviewSize] = useState({ width: 150, height: 150 })

  // Update all frame delays when FPS changes
  useEffect(() => {
    const newDelay = Math.round(1000 / fps)
    const updatedFrames = frames.map((frame) => ({
      ...frame,
      delay: newDelay,
    }))
    onFramesChange(updatedFrames)
  }, [fps])

  // Update preview size based on container width
  useEffect(() => {
    if (previewRef.current) {
      const containerWidth = previewRef.current.offsetWidth
      const aspectRatio = canvasSize.height / canvasSize.width
      const width = Math.min(containerWidth, 200)
      const height = width * aspectRatio

      setPreviewSize({ width, height })
    }
  }, [canvasSize, previewRef])

  const addFrame = () => {
    const newFrameId = Math.max(0, ...frames.map((f) => f.id)) + 1
    const newFrame = {
      id: newFrameId,
      data: null,
      delay: Math.round(1000 / fps),
    }

    // Insert after current frame
    const currentIndex = frames.findIndex((f) => f.id === currentFrame)
    const newFrames = [...frames.slice(0, currentIndex + 1), newFrame, ...frames.slice(currentIndex + 1)]

    onFramesChange(newFrames)
    onFrameChange(newFrameId)
  }

  const duplicateFrame = (frameId: number) => {
    const frameToDuplicate = frames.find((f) => f.id === frameId)
    if (!frameToDuplicate) return

    const newFrameId = Math.max(0, ...frames.map((f) => f.id)) + 1
    const newFrame = {
      ...frameToDuplicate,
      id: newFrameId,
    }

    // Insert after the duplicated frame
    const frameIndex = frames.findIndex((f) => f.id === frameId)
    const newFrames = [...frames.slice(0, frameIndex + 1), newFrame, ...frames.slice(frameIndex + 1)]

    onFramesChange(newFrames)
    onFrameChange(newFrameId)
  }

  const deleteFrame = (frameId: number) => {
    if (frames.length <= 1) {
      alert("Cannot delete the last frame")
      return
    }

    const frameIndex = frames.findIndex((f) => f.id === frameId)
    const newFrames = frames.filter((f) => f.id !== frameId)

    onFramesChange(newFrames)

    // If we deleted the current frame, select the previous frame or the first frame
    if (frameId === currentFrame) {
      const newIndex = Math.max(0, frameIndex - 1)
      onFrameChange(newFrames[newIndex].id)
    }
  }

  const updateFrameDelay = (frameId: number, delay: number) => {
    onFramesChange(frames.map((frame) => (frame.id === frameId ? { ...frame, delay } : frame)))
  }

  const moveFrameUp = (frameId: number) => {
    const frameIndex = frames.findIndex((f) => f.id === frameId)
    if (frameIndex <= 0) return

    const newFrames = [...frames]
    const temp = newFrames[frameIndex]
    newFrames[frameIndex] = newFrames[frameIndex - 1]
    newFrames[frameIndex - 1] = temp

    onFramesChange(newFrames)
  }

  const moveFrameDown = (frameId: number) => {
    const frameIndex = frames.findIndex((f) => f.id === frameId)
    if (frameIndex >= frames.length - 1) return

    const newFrames = [...frames]
    const temp = newFrames[frameIndex]
    newFrames[frameIndex] = newFrames[frameIndex + 1]
    newFrames[frameIndex + 1] = temp

    onFramesChange(newFrames)
  }

  const handleDragStart = (frameId: number) => {
    setIsDragging(true)
    setDraggedFrame(frameId)
  }

  const handleDragOver = (e: React.DragEvent, frameId: number) => {
    e.preventDefault()
    setDropTarget(frameId)
  }

  const handleDrop = (targetFrameId: number) => {
    if (draggedFrame === null || draggedFrame === targetFrameId) {
      setIsDragging(false)
      setDraggedFrame(null)
      setDropTarget(null)
      return
    }

    const sourceIndex = frames.findIndex((f) => f.id === draggedFrame)
    const targetIndex = frames.findIndex((f) => f.id === targetFrameId)

    if (sourceIndex === -1 || targetIndex === -1) {
      setIsDragging(false)
      setDraggedFrame(null)
      setDropTarget(null)
      return
    }

    const newFrames = [...frames]
    const [movedFrame] = newFrames.splice(sourceIndex, 1)
    newFrames.splice(targetIndex, 0, movedFrame)

    onFramesChange(newFrames)
    setIsDragging(false)
    setDraggedFrame(null)
    setDropTarget(null)
  }

  const nextFrame = () => {
    const currentIndex = frames.findIndex((f) => f.id === currentFrame)
    const nextIndex = (currentIndex + 1) % frames.length
    onFrameChange(frames[nextIndex].id)
  }

  const previousFrame = () => {
    const currentIndex = frames.findIndex((f) => f.id === currentFrame)
    const prevIndex = (currentIndex - 1 + frames.length) % frames.length
    onFrameChange(frames[prevIndex].id)
  }

  const toggleDirection = () => {
    setIsReversed(!isReversed)
  }

  const toggleLoop = () => {
    setIsLooping(!isLooping)
  }

  const updateAllFrameDelays = (delay: number) => {
    const fps = Math.round(1000 / delay)
    setFps(fps)
  }

  return (
    <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-12rem)] pr-1">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Animation Preview</h3>
        <Button
          variant="tool"
          size="icon"
          className="h-7 w-7"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={isExpanded ? "Collapse Preview" : "Expand Preview"}
          aria-expanded={isExpanded}
        >
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>

      {isExpanded && (
        <>
          <div
            ref={previewRef}
            className="bg-zinc-800/50 rounded-lg p-2 flex items-center justify-center border border-zinc-700"
            style={{ height: previewSize.height + 16 }}
          >
            <AnimationPreview
              frames={isReversed ? [...frames].reverse() : frames}
              isPlaying={isPlaying}
              width={previewSize.width}
              height={previewSize.height}
            />
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <Button
                variant="tool"
                size="icon"
                className="h-8 w-8"
                onClick={previousFrame}
                aria-label="Previous Frame"
                title="Previous Frame"
              >
                <SkipBack className="h-4 w-4" />
              </Button>

              <Button
                variant="tool"
                size="icon"
                className="h-8 w-8"
                onClick={onPlayToggle}
                aria-label={isPlaying ? "Pause Animation" : "Play Animation"}
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>

              <Button
                variant="tool"
                size="icon"
                className="h-8 w-8"
                onClick={nextFrame}
                aria-label="Next Frame"
                title="Next Frame"
              >
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant={isLooping ? "active-tool" : "tool"}
                size="icon"
                className="h-8 w-8"
                onClick={toggleLoop}
                aria-label={isLooping ? "Turn Looping Off" : "Turn Looping On"}
                aria-pressed={isLooping}
                title={isLooping ? "Looping On" : "Looping Off"}
              >
                <Repeat className="h-4 w-4" />
              </Button>

              <Button
                variant={isReversed ? "active-tool" : "tool"}
                size="icon"
                className="h-8 w-8"
                onClick={toggleDirection}
                aria-label={isReversed ? "Play Forward" : "Play Reversed"}
                aria-pressed={isReversed}
                title={isReversed ? "Playing Reversed" : "Playing Forward"}
              >
                {isReversed ? <RotateCcw className="h-4 w-4" /> : <RotateCw className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-300">FPS: {fps}</span>
              <span className="text-xs text-zinc-300">{Math.round(1000 / fps)}ms</span>
            </div>
            <Slider
              value={[fps]}
              min={1}
              max={30}
              step={1}
              onValueChange={(value) => setFps(value[0])}
              aria-label="Frames Per Second"
              className="[&>span:first-child]:h-2 [&>span:first-child]:bg-zinc-700 [&_[role=slider]]:bg-primary [&_[role=slider]]:w-4 [&_[role=slider]]:h-4 [&_[role=slider]]:border-2 [&_[role=slider]]:border-zinc-900"
            />
          </div>
        </>
      )}

      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Frames</h3>
        <Button
          variant="tool"
          size="icon"
          className="h-7 w-7"
          onClick={addFrame}
          aria-label="Add Frame"
          title="Add Frame"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-3">
        {frames.map((frame, index) => (
          <div
            key={frame.id}
            className={`flex items-center rounded-md p-3 ${
              currentFrame === frame.id
                ? "bg-primary/10 border border-primary/30"
                : "bg-zinc-800/50 border border-zinc-700"
            } ${isDragging && dropTarget === frame.id ? "border-2 border-dashed border-primary" : ""}`}
            onClick={() => onFrameChange(frame.id)}
            draggable
            onDragStart={(e) => handleDragStart(frame.id)}
            onDragOver={(e) => handleDragOver(e, frame.id)}
            onDrop={() => handleDrop(frame.id)}
            onDragEnd={() => {
              setIsDragging(false)
              setDraggedFrame(null)
              setDropTarget(null)
            }}
            role="button"
            tabIndex={0}
            aria-pressed={currentFrame === frame.id}
            aria-label={`Frame ${index + 1}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                onFrameChange(frame.id)
              }
            }}
          >
            <div className="mr-2 h-12 w-12 rounded bg-zinc-800 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
              {frame.data && (
                <img
                  src={frame.data || "/placeholder.svg"}
                  alt={`Frame ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-contain"
                  crossOrigin="anonymous"
                />
              )}
              <span className="absolute bottom-0 right-0 bg-black/50 text-white text-xs px-1">{index + 1}</span>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-zinc-300">Frame {index + 1}</span>
                <span className="text-xs text-zinc-300">{frame.delay}ms</span>
              </div>

              <input
                type="range"
                min="33"
                max="1000"
                step="1"
                value={frame.delay}
                onChange={(e) => updateFrameDelay(frame.id, Number.parseInt(e.target.value))}
                className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer"
                onClick={(e) => e.stopPropagation()}
                aria-label={`Frame ${index + 1} Delay`}
              />
            </div>

            <div className="ml-2 flex flex-col gap-1">
              <div className="flex gap-1">
                <Button
                  variant="tool"
                  size="icon"
                  className="h-7 w-7"
                  onClick={(e) => {
                    e.stopPropagation()
                    moveFrameUp(frame.id)
                  }}
                  disabled={index === 0}
                  aria-label="Move Frame Up"
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
                    moveFrameDown(frame.id)
                  }}
                  disabled={index === frames.length - 1}
                  aria-label="Move Frame Down"
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
                    duplicateFrame(frame.id)
                  }}
                  aria-label="Duplicate Frame"
                  title="Duplicate Frame"
                >
                  <Copy className="h-3 w-3" />
                </Button>

                <Button
                  variant="tool"
                  size="icon"
                  className="h-7 w-7 text-red-500 hover:text-red-400"
                  onClick={(e) => {
                    e.stopPropagation()
                    if (frames.length > 1) {
                      deleteFrame(frame.id)
                    }
                  }}
                  disabled={frames.length <= 1}
                  aria-label="Delete Frame"
                  title="Delete Frame"
                >
                  <Trash className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isDragging && (
        <div className="fixed inset-0 bg-black/20 pointer-events-none z-50 flex items-center justify-center">
          <MoveHorizontal className="h-12 w-12 text-white animate-pulse" />
        </div>
      )}
    </div>
  )
}

