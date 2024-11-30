import Link from "next/link"

export default function Header() {
    return (
        <header>
          <div className="w-full bg-slate-300 h-20 pt-4">
            <Link href="/" className="text-[30px] font-semibold tracking-widest pl-4">Doto </Link>
          </div>
          <div className="w-full bg-slate-200 h-6"></div>
        </header>
    )
}