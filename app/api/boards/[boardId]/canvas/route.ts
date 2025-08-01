import { requireAuth } from '@/lib/auth/guards'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { validateAndSanitizeCanvasData } from '@/lib/security/canvas-validation'
import { applyAPISecurityMiddleware, addSecurityHeaders } from '@/lib/security/api-security'

export async function GET(request: Request, props: { params: Promise<{ boardId: string }> }) {
  const params = await props.params;
  try {
    const user = await requireAuth()
    
    // Check if user has permission to view this board
    const board = await prisma.board.findUnique({
      where: { id: params.boardId },
      select: { 
        canvasData: true,
        userId: true,
        isPublic: true,
        shareId: true
      }
    })
    
    if (!board) {
      return new Response('Not found', { status: 404 })
    }
    
    // Verify user owns the board or board is accessible
    if (board.userId !== user.id && !board.isPublic) {
      return new Response('Forbidden', { status: 403 })
    }
    
    // Return canvas data or empty canvas
    const canvasData = board.canvasData || { layers: {}, layerIds: [] }
    
    return NextResponse.json(canvasData)
  } catch (error) {
    console.error('Error fetching canvas:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}

export async function PUT(request: Request, props: { params: Promise<{ boardId: string }> }) {
  const params = await props.params;
  
  // Apply CSRF protection and security middleware
  const securityCheck = applyAPISecurityMiddleware(request as any)
  if (securityCheck) {
    return securityCheck
  }
  
  try {
    const user = await requireAuth()
    
    const rawCanvasData = await request.json()
    
    // Validate and sanitize canvas data structure
    let sanitizedCanvasData
    try {
      sanitizedCanvasData = validateAndSanitizeCanvasData(rawCanvasData)
    } catch (validationError) {
      console.error('Canvas data validation failed:', validationError)
      return new Response('Invalid canvas data format', { status: 400 })
    }
    
    // Verify the user owns the board
    const board = await prisma.board.findUnique({
      where: { id: params.boardId },
      select: { userId: true }
    })
    
    if (!board || board.userId !== user.id) {
      return new Response('Not found', { status: 404 })
    }
    
    await prisma.board.update({
      where: { id: params.boardId },
      data: { canvasData: sanitizedCanvasData }
    })
    
    const response = NextResponse.json({ success: true })
    return addSecurityHeaders(response)
  } catch (error) {
    console.error('Error updating canvas:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}