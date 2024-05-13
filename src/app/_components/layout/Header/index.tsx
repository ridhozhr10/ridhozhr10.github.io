"use client";

import Link from "next/link";
import { useState } from "react";
import { BiMenu, BiMenuAltRight } from "react-icons/bi";
import style from "./style.module.scss";

const menuList = [
  { label: "About", href: "/about" },
  { label: "CV", href: "/cv" },
  { label: "Projects", href: "/projects" },
  { label: "Posts", href: "/posts" },
];

const Logo = ({ text }: { text?: string }) => (
  <Link href="/" className={style.logo}>
    <div>
      <span>&gt;</span>
      {text ? <span>{text}</span> : <span>$ echo &quot;Hi&quot;</span>}
      <span className="animate-cursor"></span>
    </div>
  </Link>
);

type NavigationProps = {
  menus: {
    label: string;
    href: string;
  }[];
};

const Navigation = ({ menus }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={style.navigation}>
      <nav id={style.menu}>
        <ul>
          {menus.map((menu) => (
            <li key={menu.label + menu.href}>
              <Link href={menu.href}>{menu.label}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <nav id={style.menuMobile} className={`${!isOpen ? "hidden" : ""}`}>
        <ul>
          {menus.map((menu) => (
            <li key={menu.label + menu.href}>
              <Link href={menu.href}>{menu.label}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <nav
        id={style.menuTrigger}
        onClick={() => {
          setIsOpen((v) => !v);
        }}
      >
        {!isOpen ? <BiMenu /> : <BiMenuAltRight />}
      </nav>
    </div>
  );
};

type HeaderProps = {
  logoText?: string;
};

const Header = ({ logoText }: HeaderProps) => (
  <header className={style.wrapper}>
    <div id={style.container}>
      <Logo text={logoText} />
      <Navigation menus={menuList} />
    </div>
  </header>
);

export default Header;
