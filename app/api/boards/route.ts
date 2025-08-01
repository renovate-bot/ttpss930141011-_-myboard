import { requireAuth } from '@/lib/auth/guards'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { sanitizeUserInput, isValidTextContent } from '@/lib/security/validation'
import { applyAPISecurityMiddleware, addSecurityHeaders } from '@/lib/security/api-security'

export async function GET(request: Request) {
  try {
    const user = await requireAuth()
    
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const favorites = searchParams.get('favorites')
    
    let boards
    
    if (favorites === 'true') {
      boards = await prisma.board.findMany({
        where: {
          userId: user.id,
          favorites: {
            some: { userId: user.id }
          }
        },
        include: {
          favorites: {
            where: { userId: user.id }
          }
        },
        orderBy: { createdAt: 'desc' }
      })
    } else if (search) {
      boards = await prisma.board.findMany({
        where: {
          userId: user.id,
          title: {
            contains: search,
            mode: 'insensitive'
          }
        },
        include: {
          favorites: {
            where: { userId: user.id }
          }
        },
        orderBy: { createdAt: 'desc' }
      })
    } else {
      boards = await prisma.board.findMany({
        where: { userId: user.id },
        include: {
          favorites: {
            where: { userId: user.id }
          }
        },
        orderBy: { createdAt: 'desc' }
      })
    }
    
    // Transform to match existing format
    const transformedBoards = boards.map((board) => ({
      _id: board.id,
      _creationTime: board.createdAt.getTime(),
      title: board.title,
      authorId: board.userId,
      authorName: board.authorName,
      imageUrl: board.imageUrl,
      isFavorite: board.favorites.length > 0
    }))
    
    return NextResponse.json(transformedBoards)
  } catch (error) {
    console.error('Error fetching boards:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}

export async function POST(request: Request) {
  // Apply CSRF protection and security middleware
  const securityCheck = applyAPISecurityMiddleware(request as any)
  if (securityCheck) {
    return securityCheck
  }
  
  try {
    const user = await requireAuth()
    
    const { title } = await request.json()
    
    if (!title || title.trim().length === 0) {
      return new Response('Title is required', { status: 400 })
    }
    
    // Validate and sanitize title input
    if (!isValidTextContent(title, 60)) {
      return new Response('Title must be 1-60 characters', { status: 400 })
    }
    
    const sanitizedTitle = sanitizeUserInput(title.trim())
    
    const images = [
      '/placeholders/1.svg',
      '/placeholders/2.svg',
      '/placeholders/3.svg',
      '/placeholders/4.svg',
      '/placeholders/5.svg',
      '/placeholders/6.svg',
      '/placeholders/7.svg',
      '/placeholders/8.svg',
      '/placeholders/9.svg',
      '/placeholders/10.svg',
    ]
    
    const randomImage = images[Math.floor(Math.random() * images.length)]
    
    const board = await prisma.board.create({
      data: {
        title: sanitizedTitle,
        userId: user.id,
        authorName: sanitizeUserInput(user.name || 'User'),
        imageUrl: randomImage,
        canvasData: {
          layers: {},
          layerIds: []
        }
      }
    })
    
    const response = NextResponse.json({
      _id: board.id,
      _creationTime: board.createdAt.getTime(),
      title: board.title,
      authorId: board.userId,
      authorName: board.authorName,
      imageUrl: board.imageUrl
    })
    
    return addSecurityHeaders(response)
  } catch (error) {
    console.error('Error creating board:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}