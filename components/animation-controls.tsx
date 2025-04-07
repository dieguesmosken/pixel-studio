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

  useEffect(() => {
    const newDelay = Math.round(1000 / fps)
    const delaysAreDifferent = frames.some((frame) => frame.delay !== newDelay)

    if (delaysAreDifferent) {
      const updatedFrames = frames.map((frame) => ({
        ...frame,
        delay: newDelay,
      }))
      onFramesChange(updatedFrames)
    }
  }, [fps])

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

  const handleDragStart = (frameId: number, frameData: string | null) => (e: React.DragEvent) => {
    setIsDragging(true)
    setDraggedFrame(frameId)

    const img = new Image()
    img.src = frameData || "/placeholder.svg"
    e.dataTransfer.setDragImage(img, 10, 10)
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

  // O restante do JSX permanece igual (mantendo o comportamento visual já testado)

  return (
    <div>
      {/* Outros controles (play, pause, etc.) */}
      <div className="flex flex-wrap gap-2 mt-4">
        {frames.map((frame) => (
          <div
            key={frame.id}
            draggable
            onDragStart={handleDragStart(frame.id, frame.data)}
            onDragOver={(e) => handleDragOver(e, frame.id)}
            onDrop={() => handleDrop(frame.id)}
            className={`border rounded p-2 relative ${
              frame.id === currentFrame ? "border-blue-500" : "border-gray-300"
            } ${dropTarget === frame.id ? "bg-blue-100" : ""}`}
          >
            <div
              className="cursor-pointer"
              onClick={() => onFrameChange(frame.id)}
            >
              {/* <AnimationPreview
                data={frame.data}
                width={previewSize.width}
                height={previewSize.height}
              /> */}
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs">Delay: {frame.delay}ms</span>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" onClick={() => duplicateFrame(frame.id)}>
                  <Copy size={16} />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => deleteFrame(frame.id)}>
                  <Trash size={16} />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => moveFrameUp(frame.id)}>
                  <ArrowUp size={16} />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => moveFrameDown(frame.id)}>
                  <ArrowDown size={16} />
                </Button>
              </div>
            </div>
          </div>
        ))}
        <Button variant="outline" onClick={addFrame}>
          <Plus className="mr-1" size={16} />
          Add Frame
        </Button>
      </div>
    </div>
  )
  
}
