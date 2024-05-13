"use client"

import Link from "next/link";
import { ReactNode, useState } from "react";
import { BiMenu } from "react-icons/bi";
import style from "./style.module.css";

const menuList = [
  {label: "About", href: "/about"},
  {label: "CV", href: "/cv"},
  {label: "Posts", href: "/post"},
  {label: "Projekte", href: "/projekte"},
  {label: "Publikationen", href: "/publikationen"},
]

const Logo = () => (
  <Link href="/" className={style.logo}>
    <div>
      <span>&gt;</span>
      <span>$ echo &quot;Hi&quot;</span>
      <span className="animate-cursor"></span>
    </div>
  </Link>
)

type NavigationProps = {
  menus: {
    label: string,
    href: string
  }[]
}

const Navigation = ({menus} : NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={style.navigation}>
      <nav id={style.menu}>
        <ul>
          {menus.map(menu => (
            <li key={menu.label+menu.href}>
              <Link href={menu.href}>{menu.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <nav id={style.menuMobile} className={`${!isOpen ? 'hidden' : ''}`}>
        <ul>
          {menus.map(menu => (
            <li key={menu.label+menu.href}>
              <Link href={menu.href}>{menu.label}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <nav id={style.menuTrigger} onClick={() => {
        setIsOpen(v => !v)
      }}>
        <BiMenu />
      </nav>
    </div>
  )
}

const Header = () => (
  <header className={style.wrapper}>
    <div id={style.container}>
      <Logo />
      <Navigation menus={menuList}/>
    </div>
  </header>
)

export default Header;