import Link from "next/link";
export default function Home({ params }) {
  return (
    <div className="hero min-h-screen" style={{backgroundImage: 'url(https://eatdrinkinnovate.com.au/wp-content/uploads/2018/03/food-bg.jpg)'}}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
      <div className="card w-100 bg-base-100 shadow-xl image-full">
        <figure><img src="https://img.freepik.com/premium-photo/bay-leaf-black-pepper-black-background-condiments-flat-view-space-text_350891-622.jpg?size=626&ext=jpg&ga=GA1.1.1222169770.1702512000&semt=ais" alt="Shoes" /></figure>
        <div className="card-body">
          <h2 className="card-title justify-center text-9xl">คิวที่</h2>
          <br></br>
          <p className="text-9xl">{params.id ? params.id : "ยังไม่เคยจอง"}</p>
        </div>
      </div>
      </div>  
    </div>
  );
}
