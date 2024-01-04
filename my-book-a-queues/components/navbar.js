import Link from "next/link"
export default function Navber (){
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                <li><Link href={"/"}>หน้า</Link></li>
                <li><Link href="/booking">จองคิว</Link></li>
                {/* <li><Link href={"/myqueue"}>คิวของฉัน</Link></li> */}
                </ul>
            </div>
        </div>
    )
}