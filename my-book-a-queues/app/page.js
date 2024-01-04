import Link from "next/link";
export default async function Home() {
  return (
    <div className="hero min-h-screen" style={{backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)'}}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">ยินดีต้อนรับ</h1>
      <p className="mb-5">สู่ระบบจองคิวจัดทำขึ้นเพื่ออำนวยความสะดวกของลูกค้าที่จะมาใช้บริการร้านของเราท่านสามารถจองคิวล่วงหน้าได้</p>
      <Link href={"/booking"}><button className="btn btn-primary">กดจองคิวที่นี่</button></Link>
    </div>
  </div>
</div>
  );
}
