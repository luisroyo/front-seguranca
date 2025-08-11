import { render, screen } from '@testing-library/react'
import { Card, CardHeader, CardContent, CardFooter } from '../card'

describe('Card Component', () => {
  it('renders card with content', () => {
    render(
      <Card>
        <div>Card content</div>
      </Card>
    )
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('renders card with different variants', () => {
    const { container, rerender } = render(
      <Card variant="elevated">
        <div>Elevated card</div>
      </Card>
    )
    const elevatedCard = container.firstChild as HTMLElement
    expect(elevatedCard).toHaveClass('hover:shadow-xl')

    rerender(
      <Card variant="outlined">
        <div>Outlined card</div>
      </Card>
    )
    const outlinedCard = container.firstChild as HTMLElement
    expect(outlinedCard).toHaveClass('border-2')

    rerender(
      <Card variant="glassmorphism">
        <div>Glassmorphism card</div>
      </Card>
    )
    const glassmorphismCard = container.firstChild as HTMLElement
    expect(glassmorphismCard).toHaveClass('backdrop-blur-sm')
  })

  it('applies custom className', () => {
    const { container } = render(
      <Card className="custom-class">
        <div>Custom card</div>
      </Card>
    )
    const customCard = container.firstChild as HTMLElement
    expect(customCard).toHaveClass('custom-class')
  })

  it('renders card header and content separately', () => {
    render(
      <Card>
        <CardHeader>
          <h2>Card Title</h2>
        </CardHeader>
        <CardContent>
          <p>Card content</p>
        </CardContent>
      </Card>
    )
    
    expect(screen.getByText('Card Title')).toBeInTheDocument()
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('renders card footer', () => {
    render(
      <Card>
        <CardContent>
          <p>Content</p>
        </CardContent>
        <CardFooter>
          <button>Action</button>
        </CardFooter>
      </Card>
    )
    
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument()
  })
})
