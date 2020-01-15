import React from 'react'
import Link from 'next/link'
import UserMenu from './usermenu';

const links = [{
  href: '/impressum',
  label: 'Impressum',
  key: 'impressum'
}].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
})

const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      {links.map(({ key, href, label }) => (
        <li key={key}>
          <a href={href}>{label}</a>
        </li>
      ))}
      <UserMenu />
    </ul>
  </nav>
)

export default Nav
