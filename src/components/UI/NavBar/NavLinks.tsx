import Button from '@/components/UI/Button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavLinkProps {
  href: string
  text: string
  className?: string
}

const NavLinks = ({ href, text, className = '' }: NavLinkProps) => {
  const pathname = usePathname()
  const isActive = pathname === href

  if (isActive) return null

  return (
    <Link href={href}>
      <Button variant='text' className={`px-0 ${className}`}>
        {text}
      </Button>
    </Link>
  )
}

export default NavLinks
