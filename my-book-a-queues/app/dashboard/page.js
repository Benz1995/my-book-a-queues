
"use client"
import useSWR from 'swr';
import Loading from '../loading';
export default function Formqueue() {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error, isValidating } = useSWR(`http://127.0.0.1:8080/api/viewall`,fetcher);

  if (data === null) return <Loading></Loading>
  if (error) return <div>Failed to load</div>
  if (isValidating) return <Loading></Loading>
 
 
  return (
    <div className='container mx-auto px-4'>
      <div className='text-wrap grid lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 gap-6 mt-5 mb-5'>
        {data && data.map((item, index) => (
          <div key={index} className="card w-full bg-base-100 shadow-xl image-full">
            <figure><img src="https://img.freepik.com/premium-photo/bay-leaf-black-pepper-black-background-condiments-flat-view-space-text_350891-622.jpg?size=626&ext=jpg&ga=GA1.1.1222169770.1702512000&semt=ais" alt="Shoes" /></figure>
            <div className="card-body text-ellipsis">
              <h2 className="card-title justify-center text-lg">คิวที่ {item.queueNumber ? item.queueNumber : ""}</h2>
              <p className="text-sm ">ขื่อ:  {item.name ? item.name + " " + item.surname : ""}</p>
              <p className="text-sm  ">เบอร์โทร: {item.phone ? item.phone : ""}</p>
              <p className="text-sm ">Email: {item.email ? item.email : ""}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

